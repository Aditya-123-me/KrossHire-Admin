import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import FooterBG from "../../assets/images/FooterBG.webp";
import user from "../../assets/images/user.png";
import Loading from "../../components/Hooks/Loading";
import axios from "../../components/Hooks/axios";
import styles from "./AddBlog.module.scss";
import ImageBox from "./ImageBox";
import TextBox from "./TextBox";

const AddBlog = () => {
	const [bg, setBg] = useState("#ff621f");
	const [color, setColor] = useState("#fff");
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

	const updateBoxData = (index, data) => {
		const tempData = [...blogData];
		tempData[index] = data;
		setBlogData(tempData);
	};

	const handelAddTextBox = () => {
		const index = contentText.length;
		const temp = [...contentText];
		temp.push({ index, comp: <TextBox key={index} index={index} updateBoxData={updateBoxData} /> });
		setContentText(temp);
	};

	const handelAddImageBox = () => {
		const index = contentText.length;
		const temp = [...contentText];
		temp.push({ index, comp: <ImageBox key={index} index={index} updateBoxData={updateBoxData} /> });
		setContentText(temp);
	};

	const handelSubmit = () => {
		if (!title || !smallText || !blogData) return toast.error("Please fill data !!");

		if (activeAuthId === "") return toast.error("Please select author");

		setIsLoading(true);
		const formData = new FormData();
		formData.append("title", title);
		formData.append("image", imageFile);
		formData.append("bgColor", bg);
		formData.append("textColor", color);
		formData.append("smallText", smallText);
		formData.append("content", blogData.join("\n"));
		if (activeAuthId) formData.append("authorId", activeAuthId);
		else {
			formData.append("authorName", authorName);
			formData.append("authorImage", authFile);
			formData.append("authorDesignation", authorDesignation);
		}

		axios
			.post(`/blog/create`, formData)
			.then(({ data }) => {
				toast.success("Blog uploaded successfully !!");
				setIsLoading(false);
				setBg("#ff621f");
				setColor("#fff");
				setImageFile(null);
				setTitle("");
				setBlogData([]);
				setSmallText("");
				setAuthFile(null);
				setAuthorName("");
				setAuthorDesignation("");
				setAuthData([]);
				setActiveAuthId("");
				setContentText([]);
			})
			.catch(({ response }) => {
				console.log("Error => ", response);
			});
	};

	return (
		<div className={styles.AddBlog} onClick={() => setAddPopup(false)}>
			<h1>Add Blog</h1>

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
								<input
									type="color"
									name="Background-Color"
									value={color}
									onChange={(e) => setColor(e.target.value)}
								/>
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

				<div className={styles.ContentWrapper}>
					<div className={styles.HeaderSection}>
						<button onClick={handelAddTextBox}>Add Text Box</button>
						<button onClick={handelAddImageBox}>Add Image Box</button>
					</div>

					<div className={styles.BodySection}>{contentText.map((data, index) => data.comp)}</div>
				</div>

				<div className={styles.AuthSection}>
					<div className={styles.AuthSectionLeft}>
						<img
							src={authFile ? URL.createObjectURL(authFile) : user}
							alt=""
							onClick={() => authRef.current.click()}
						/>

						<input
							type="file"
							ref={authRef}
							onChange={(e) => {
								setAuthFile(e.target.files[0]);
								e.target.value = null
							}}
							style={{ display: "none" }}
						/>
						<input
							type="text"
							placeholder="Author Name"
							value={authorName}
							onChange={(e) => setAuthorName(e.target.value)}
						/>
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
				</div>

				<div className={styles.Submit}>
					<button onClick={handelSubmit}>{isLoading ? <Loading color="#fff" /> : "Submit"}</button>
				</div>
			</div>
		</div>
	);
};

export default AddBlog;
