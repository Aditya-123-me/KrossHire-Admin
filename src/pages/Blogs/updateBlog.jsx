import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import { toast } from "react-toastify";
import axios from "../../components/Hooks/axios";
import Loading from "../../components/Hooks/Loading";
import styles from "./AddBlog.module.scss";
import "./AddBlogs.scss";
import ImageBox from "./ImageBox";
import TextBox from "./TextBox";

const UpdateBlog = () => {
	const { id } = useParams(); // Blog ID from the route
	const navigate = useNavigate();
	const [bg, setBg] = useState("#ff621f");
	const [color, setColor] = useState("#ffffff");
	const [imageFile, setImageFile] = useState(null);
	const inputRef = useRef();
	const [title, setTitle] = useState("");
	const [blogData, setBlogData] = useState([]);
	const [smallText, setSmallText] = useState("");
	const [previewImageFile, setPreviewImageFile] = useState(null);
	const [contentText, setContentText] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { language } = useSelector((state) => state.auth);
	const [selected, setSelected] = useState([]);
	const [blogId, setBlogId] = useState(null);

	const generateId = () => "_" + Math.random().toString(36).substr(2, 9); // Generate unique IDs

	useEffect(() => {
		// Fetch blog data based on the provided ID
		axios
			.get(`/blog/oneBlog/${id}`)
			.then(({ data }) => {
				const blog = data.data;
				setBlogId(blog._id);
				setTitle(blog.title || "");
				setBg(blog.bgColor || "#ffffff");
				setColor(blog.textColor || "#000000");
				setSmallText(blog.smallText || "");
				setSelected(blog.tags || []);
				setPreviewImageFile(blog.image);

				// Process blog content into TextBox or ImageBox components
				const contentParts = blog.content.split("\r\n").map((item, index) => {
					const trimmedItem = item.trim();
					const isText = trimmedItem.startsWith("<p>");
					const isImage = trimmedItem.startsWith("<img");

					return {
						id: generateId(),
						comp: isText ? (
							<TextBox
								key={index}
								id={generateId()}
								initialData={trimmedItem}
								updateBoxData={updateBoxData}
								removeBox={removeTextBox}
							/>
						) : isImage ? (
							<ImageBox
								key={index}
								id={generateId()}
								initialData={trimmedItem}
								updateBoxData={updateBoxData}
								removeBox={removeImageBox}
							/>
						) : null,
					};
				});

				setContentText(contentParts);
				setBlogData(contentParts.map((item) => ({ id: item.id, data: item.comp.props.initialData })));
			})
			.catch((error) => {
				console.error("Error fetching blog data:", error);
			});
	}, [id]);

	// Function to update the box data
	const updateBoxData = (id, data) => {
		const tempData = [...blogData];
		const index = tempData.findIndex((item) => item.id === id);
		if (index > -1) {
			tempData[index].data = data;
		} else {
			tempData.push({ id, data });
		}
		setBlogData(tempData);
	};

	// Function to remove a TextBox
	const removeTextBox = (id) => {
		setContentText((prev) => prev.filter((item) => item.id !== id || item.comp.type !== TextBox));
		setBlogData((prev) => prev.filter((item) => item.id !== id));
	};

	// Function to remove an ImageBox
	const removeImageBox = (id) => {
		setContentText((prev) => prev.filter((item) => item.id !== id || item.comp.type !== ImageBox));
		setBlogData((prev) => prev.filter((item) => item.id !== id));
	};

	// Add TextBox component
	const handleAddTextBox = () => {
		const id = generateId();
		setContentText((prev) => [
			...prev,
			{ id, comp: <TextBox key={id} id={id} updateBoxData={updateBoxData} removeBox={removeTextBox} /> },
		]);
	};

	// Add ImageBox component
	const handleAddImageBox = () => {
		const id = generateId();
		setContentText((prev) => [
			...prev,
			{ id, comp: <ImageBox key={id} id={id} updateBoxData={updateBoxData} removeBox={removeImageBox} /> },
		]);
	};

	// Submit updated blog
	const handleSubmit = () => {
		if (!title || !smallText || !blogData.length) return toast.error("Please fill all required fields!");

		setIsLoading(true);
		const formData = new FormData();
		formData.append("title", title);
		formData.append("bgColor", bg);
		formData.append("textColor", color);
		formData.append("smallText", smallText);
		formData.append("content", blogData.map((item) => item.data).join("\n"));
		formData.append("tags", JSON.stringify(selected));
		formData.append("language", language);
		formData.append("id", blogId);
		if (imageFile) formData.append("image", imageFile);

		axios
			.put(`/blog/update`, formData)
			.then(({ data }) => {
				toast.success("Blog updated successfully!");
				navigate("/blogs");
			})
			.catch((error) => {
				console.error("Error updating blog:", error);
				toast.error("Error updating the blog");
			})
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		console.log(blogData);
	}, [blogData]);

	return (
		<div className={styles.AddBlog}>
			<h1>Update Blog</h1>

			<div className={styles.WrapperContainer} onClick={(e) => e.stopPropagation()}>
				<div className={styles.ImageWrapper} style={{ background: bg }}>
					<div className={styles.Left}>
						<textarea
							placeholder="Add your title"
							style={{ color: color }}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>

						<textarea
							placeholder="Add small text"
							style={{ color: color }}
							value={smallText}
							className={styles.smallText}
							onChange={(e) => setSmallText(e.target.value)}
						/>

						<div className={styles.Section}>
							<div>
								<label>Background Color:</label>
								<input type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
							</div>
							<div>
								<label>Text Color:</label>
								<input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
							</div>
						</div>
					</div>

					<div className={styles.Right}>
						<img src={imageFile ? URL.createObjectURL(imageFile) : previewImageFile} alt="Blog" />
						<input type="file" ref={inputRef} onChange={(e) => setImageFile(e.target.files[0])} style={{ display: "none" }} />
						<button onClick={() => inputRef.current.click()}>
							<FaCamera />
						</button>
					</div>
				</div>

				<div className={styles.TagWrapper}>
					<h1>Add Tags</h1>
					<TagsInput value={selected} onChange={setSelected} name="tags" placeholder="Enter tags" />
					<em>Press enter to add new tag</em>
				</div>

				<div className={styles.ContentWrapper}>
					<div className={styles.HeaderSection}>
						<button onClick={handleAddTextBox}>Add Text Box</button>
						<button onClick={handleAddImageBox}>Add Image Box</button>
					</div>

					<div className={styles.BodySection}>
						{contentText.map((data, index) => (
							<div key={index}>{data.comp}</div>
						))}
					</div>
				</div>

				<div className={styles.ButtonWrapper}>
					<button onClick={handleSubmit}>{isLoading ? <Loading /> : "Update Blog"}</button>
				</div>
			</div>
		</div>
	);
};

export default UpdateBlog;
