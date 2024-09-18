import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { VscOpenPreview } from "react-icons/vsc";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FooterBG from "../../assets/images/FooterBG.webp";
import Loading from "../../components/Hooks/Loading";
import axios from "../../components/Hooks/axios";
import styles from "./AddBlog.module.scss";
import "./AddBlogs.scss";
import ImageBox from "./ImageBox";
import PreviewBlog from "./PreviewBlog";
import TagSelector from "./TagSelector";
import TextBox from "./TextBox";

const AddBlog = () => {
	const navigate = useNavigate();
	const [bg, setBg] = useState("#ff621f");
	const [color, setColor] = useState("#ffffff");
	const [imageFile, setImageFile] = useState(null);
	const inputRef = useRef();
	const authRef = useRef();
	const [title, setTitle] = useState("");
	const [blogData, setBlogData] = useState([]);
	const [smallText, setSmallText] = useState("");
	const [authData, setAuthData] = useState([]);
	const [activeAuthId, setActiveAuthId] = useState("");
	const [contentText, setContentText] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { language } = useSelector((state) => state.auth);
	const [selected, setSelected] = useState([]);

	const [openPreview, setOpenPreview] = useState(false);

	const handlePreview = () => {
		if (!title) return toast.error("Plz add Title and necessary Fields To show Preview...");
		if (!smallText) return toast.error("Plz add Small Text and necessary Fields To show Preview... !!");

		let notUpdated = false;

		if (blogData.length === 0) {
			toast.warn("Please add at least One textBox or Image Box");
			return;
		}
		blogData.forEach((item) => {
			if (item.data === null || item.data === "") {
				toast.warn("Please Remove Unfilled Text Boxes or Check All image box images Are uploaded ...");

				notUpdated(true);
			}
		});
		if (notUpdated) {
			return;
		}

		setOpenPreview(true);
	};

	// Helper function to generate a unique ID
	const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

	useEffect(() => {
		axios
			.get(`/blog/allAuth`)
			.then(({ data }) => {
				setAuthData(data.data);
			})
			.catch(({ response }) => {
				console.log("Error => ", response);
			});
	}, []);

	const updateBoxData = (id, data) => {
		setBlogData((prevData) => {
			const newData = [...prevData];
			const index = newData.findIndex((item) => item.id === id);
			if (index > -1) {
				newData[index].data = data;
			} else {
				newData.push({ id, data });
			}
			return newData;
		});
	};

	const removeTextBox = (id) => {
		setContentText((prevContentText) => prevContentText.filter((item) => item.id !== id));
		setBlogData((prevBlogData) => prevBlogData.filter((item) => item.id !== id));
	};

	const removeImageBox = (id) => {
		setContentText((prevContentText) => prevContentText.filter((item) => item.id !== id));
		setBlogData((prevBlogData) => prevBlogData.filter((item) => item.id !== id));
	};

	const handelAddTextBox = () => {
		const id = generateId();
		setContentText((prevContentText) => [
			...prevContentText,
			{ id, comp: <TextBox key={id} id={id} updateBoxData={updateBoxData} removeBox={removeTextBox} /> },
		]);
	};

	const handelAddImageBox = () => {
		const id = generateId();
		setContentText((prevContentText) => [
			...prevContentText,
			{ id, comp: <ImageBox key={id} id={id} updateBoxData={updateBoxData} removeBox={removeImageBox} /> },
		]);
	};

	const handelSubmit = () => {
		if (!title) return toast.error("Title is required...");
		if (!smallText) return toast.error("Small Text is required !!");
		if (!imageFile) return toast.error("Blog Image required !!");

		if (activeAuthId === "") return toast.error("Please select author");
		console.log(blogData);

		if (blogData.length === 0) {
			toast.warn("Please add at least One textBox or Image Box");
			return;
		}

		blogData.forEach((item) => {
			if (item.data === null || item.data === "") {
				return toast.warn("Please Remove Unfilled Text Boxes or Check All image box images Are uploaded ...");
			}
		});

		// console.log(blogData);

		setIsLoading(true);

		console.log(blogData);
		const formData = new FormData();
		formData.append("title", title);
		formData.append("image", imageFile);
		formData.append("bgColor", bg);
		formData.append("textColor", color);
		formData.append("smallText", smallText);
		formData.append("content", blogData.map((item) => item.data).join("\n"));
		// const content = blogData.map((item) => item.data).join("\r\n");
		// formData.append("content", content);
		formData.append("tags", JSON.stringify(selected));
		formData.append("language", language);

		if (activeAuthId) formData.append("authorId", activeAuthId);

		console.log(formData);
		// return

		axios
			.post(`/blog/create`, formData)
			.then(({ data }) => {
				toast.success("Blog uploaded successfully !!");
				setBg("#ff621f");
				setColor("#fff");
				setImageFile(null);
				setTitle("");
				setBlogData([]);
				setSmallText("");
				// setAuthData([]);
				setActiveAuthId("");
				setContentText([]);
				setSelected([]);
				navigate("/blogs");
			})
			.catch(({ response }) => {
				console.log("Error => ", response);
			})
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		console.log(contentText);
		console.log(blogData);
	}, [contentText, blogData]);

	// for tags

	// This function will receive the updated tags from the TagSelector component
	const handleTagsChange = (tags) => {
		setSelected(tags);
	};

	return (
		<>
			{openPreview && <PreviewBlog {...{ setOpenPreview, title, smallText, selected, blogData, color, bg, imageFile }} />}
			<div className={styles.AddBlog}>
				<div className={styles.Top}>
					<h1>Add Blog</h1>
					<p onClick={handlePreview}>
						Preview <VscOpenPreview />
					</p>
				</div>

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
							<img src={imageFile ? URL.createObjectURL(imageFile) : FooterBG} alt="" />
							<input type="file" ref={inputRef} onChange={(e) => setImageFile(e.target.files[0])} />
							<button onClick={() => inputRef.current.click()}>
								<FaCamera />
							</button>
						</div>
					</div>

					<div className={styles.TagAuthor}>
						<div className={styles.TagWrapper}>
							<TagSelector onTagsChange={handleTagsChange} />
						</div>

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
					</div>

					<div className={styles.ContentWrapper}>
						<div className={styles.HeaderSection}>
							<button onClick={handelAddTextBox}>Add Text Box</button>
							<button onClick={handelAddImageBox}>Add Image Box</button>
						</div>

						<div className={styles.BodySection}>{contentText.map((data, index) => data.comp)}</div>
					</div>

					<div className={styles.Submit}>
						<button onClick={handelSubmit}>{isLoading ? <Loading color="#fff" /> : "Submit"}</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddBlog;
