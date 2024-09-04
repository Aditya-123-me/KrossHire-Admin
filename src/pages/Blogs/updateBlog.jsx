import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import { toast } from "react-toastify";
import FooterBG from "../../assets/images/FooterBG.webp";
import user from "../../assets/images/user.png";
import Loading from "../../components/Hooks/Loading";
import axios from "../../components/Hooks/axios";
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
	const authRef = useRef();
	const [title, setTitle] = useState("");
	const [blogData, setBlogData] = useState([]);
	const [smallText, setSmallText] = useState("");
	const [authFile, setAuthFile] = useState(null);
	const [authorName, setAuthorName] = useState("");
	const [authorDesignation, setAuthorDesignation] = useState("");
	const [authData, setAuthData] = useState([]);
	const [activeAuthId, setActiveAuthId] = useState("");
	const [contentText, setContentText] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { language } = useSelector((state) => state.auth);
	const [selected, setSelected] = useState([]);

    const [previewImageFile, setPreviewImageFile] = useState(null);
    const [blogId,setBlogId]=useState(null)
    // const []

	// Helper function to generate a unique ID
	const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

	useEffect(() => {
		axios
			.get(`/blog/oneBlog/${id}`)
			.then(({ data }) => {
                const blog = data.data;
                setBlogId(blog._id)
				console.log(blog);
				setTitle(blog.title || "");
				setBg(blog.bgColor || "#ffffff");
				setColor(blog.textColor || "#000000");
				setSmallText(blog.smallText || "");
				setSelected(blog.tags || []);
				setPreviewImageFile(blog.image);

				// Parse the content into separate boxes
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

				// Handle author data
				if (blog.authorId) {
					setActiveAuthId(blog.authorId);
				} else {
					setAuthorName(blog.authorName || "");
					setAuthorDesignation(blog.authorDesignation || "");
					setAuthFile(blog.authorImage || null);
				}
			})
			.catch((error) => {
				console.error("Error fetching blog data:", error);
			});
	}, [id]);


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

	// Separate function to remove TextBox
	const removeTextBox = (id) => {
		const tempContent = contentText.filter((item) => item.id !== id || item.comp.type !== TextBox);
		setContentText(tempContent);

		const tempBlogData = blogData.filter((item) => item.id !== id);
		setBlogData(tempBlogData);
	};

	// Separate function to remove ImageBox
	const removeImageBox = (id) => {
		const tempContent = contentText.filter((item) => item.id !== id || item.comp.type !== ImageBox);
		setContentText(tempContent);

		const tempBlogData = blogData.filter((item) => item.id !== id);
		setBlogData(tempBlogData);
	};

	const handelAddTextBox = () => {
		const id = generateId();
		const temp = [...contentText];
		temp.push({ id, comp: <TextBox key={id} id={id} updateBoxData={updateBoxData} removeBox={removeTextBox} /> });
		setContentText(temp);
	};

	const handelAddImageBox = () => {
		const id = generateId();
		const temp = [...contentText];
		temp.push({ id, comp: <ImageBox key={id} id={id} updateBoxData={updateBoxData} removeBox={removeImageBox} /> });
		setContentText(temp);
	};

	const handelSubmit = () => {
		if (!title || !smallText || !blogData) return toast.error("Please fill data !!");

		if (activeAuthId === "" && authorName === "") return toast.error("Please select author");

		if (blogData.length === 0) {
			toast.warn("Please add at least One textBox or Image Box");
			return;
		}

		setIsLoading(true);
		const formData = new FormData();
		formData.append("title", title);
		if (imageFile) formData.append("image", imageFile); 
		formData.append("bgColor", bg);
		formData.append("textColor", color);
		formData.append("smallText", smallText);
		formData.append("content", blogData.map((item) => item.data).join("\n"));
		formData.append("tags", JSON.stringify(selected));
		formData.append("language", language);
		formData.append("id", blogId);

		// if (activeAuthId) formData.append("authorId", activeAuthId);
		// else {
		// 	formData.append("authorName", authorName);
		// 	formData.append("authorImage", authFile);
		// 	formData.append("authorDesignation", authorDesignation);
		// }

		axios
			.put(`/blog/update`, formData)
			.then(({ data }) => {
				toast.success("Blog updated successfully !!");
				navigate("/blogs");
			})
			.catch(({ response }) => {
				console.log("Error => ", response);
			})
			.finally(() => setIsLoading(false));
	};

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
							onChange={(e) => setTitle(e.target.value)}></textarea>

						<textarea
							placeholder="Add Small text"
							style={{ color: color }}
							value={smallText}
							className={styles.smallText}
							onChange={(e) => setSmallText(e.target.value)}></textarea>

						<div className={styles.Section}>
							<div>
								<label htmlFor="Background-Color">Background Color : </label>
								<input type="color" name="Background-Color" value={bg} onChange={(e) => setBg(e.target.value)} />
							</div>

							<div>
								<label htmlFor="Background-Color">Text Color : </label>
								<input type="color" name="Background-Color" value={color} onChange={(e) => setColor(e.target.value)} />
							</div>
						</div>
					</div>

					<div className={styles.Right}>
						<img src={imageFile ? URL.createObjectURL(imageFile) : previewImageFile} alt="" />
						<input type="file" ref={inputRef} onChange={(e) => setImageFile(e.target.files[0])} />
						<button onClick={() => inputRef.current.click()}>
							<FaCamera />
						</button>
					</div>
				</div>

				<div className={styles.TagWrapper}>
					<h1>Add Tags</h1>
					<TagsInput value={selected} onChange={setSelected} name="tags" placeHolder="enter tags" id="tag-input" />
					<em>press enter to add new tag</em>
				</div>

				<div className={styles.ContentWrapper}>
					<div className={styles.HeaderSection}>
						<button onClick={handelAddTextBox}>Add Text Box</button>
						<button onClick={handelAddImageBox}>Add Image Box</button>
					</div>

					<div className={styles.BodySection}>
						{contentText.map((data, index) => (
							<div key={index}>{data.comp}</div>
						))}
					</div>
				</div>



				{/* <div className={styles.AuthSection}>
					<div className={styles.AuthSectionLeft}>
						<img src={authFile ? URL.createObjectURL(authFile) : user} alt="" onClick={() => authRef.current.click()} />

						<input
							type="file"
							ref={authRef}
							onChange={(e) => {
								setAuthFile(e.target.files[0]);
								e.target.value = null;
							}}
							style={{ display: "none" }}
						/>
						<input type="text" placeholder="Author Name" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
						<input
							type="text"
							placeholder="Author Designation"
							value={authorDesignation}
							onChange={(e) => setAuthorDesignation(e.target.value)}
						/>
					</div>

					<div className={styles.AuthSectionMid}>OR</div>

					<div className={styles.AuthSectionRight}>
						<h3>Select Author</h3>

						<select value={activeAuthId} onChange={(e) => setActiveAuthId(e.target.value)}>
							<option value="" disabled>
								Select one author
							</option>

							{authData?.map((data, index) => (
								<option value={data._id} key={index}>
									{data?.authorName}
								</option>
							))}
						</select>
					</div>
				</div> */}

				<div className={styles.ButtonWrapper}>
					<button onClick={handelSubmit}>{isLoading ? <Loading /> : "Update Blog"}</button>
				</div>
			</div>
		</div>
	);
};

export default UpdateBlog;
