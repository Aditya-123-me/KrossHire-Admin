import React, { useEffect, useRef, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import FooterBG from "../../assets/images/FooterBG.webp";
import axios from "../../components/Hooks/axios";
import Loading from "../../components/Hooks/Loading";
import styles from "./AddBlog.module.scss";

const ImageBox = ({ id, initialData, updateBoxData, removeBox }) => {
	const inputRef = useRef();
	const [altText, setAltText] = useState("");
	const [imageFile, setImageFile] = useState(null);

	const [imageUrl, setImageUrl] = useState(null);

	const handleFileChange = (data) => {
		setImageFile(data);
	};

	const [uploading, setUploading] = useState(false);
	const handleUpload = () => {
		console.log(id, imageFile);

		const formData = new FormData();

		formData.append("image", imageFile);
		formData.append("name", `${id}.${imageFile?.name}`);

		setUploading(true);
		axios
			.post(`/getImageUrl`, formData)
			.then(({ data }) => {
				console.log(data);
				setImageUrl(data);
				setImageFile(null);

				// Set the content and update the data once the image is uploaded
				const imageData = `<img src="${data}" alt="${altText}" />`;
				setContent(imageData);
				updateBoxData(id, imageData);
			})
			.catch((err) => console.log(err))
			.finally(() => setUploading(false));
	};

	const [content, setContent] = useState(null);
	useEffect(() => {
		if (initialData) {
			setContent(initialData);
			setImageUrl(initialData.imageUrl || null);
		}
		updateBoxData(id, content);
	}, [content, id, updateBoxData, initialData]);

	return (
		<div className={styles.ImageBox}>
			<div className={styles.Remove} onClick={() => removeBox(id)}>
				<RxCross2 size={"2rem"} color="#fff" />
			</div>

			{imageFile && (
				<button className={styles.UploadImage} onClick={handleUpload}>
					{uploading ? <Loading /> : <BiUpload size={"2rem"} />}
				</button>
			)}

			<div className={styles.Image}>
				<img src={imageUrl ? imageUrl : imageFile ? URL.createObjectURL(imageFile) : FooterBG} alt={altText} />
				<input
					type="file"
					ref={inputRef}
					style={{ display: "none" }}
					accept="image/*"
					onChange={(e) => handleFileChange(e.target.files[0])}
				/>
				<button onClick={() => inputRef?.current?.click()}>Add Or Change Image</button>
			</div>

			<div className={styles.ImageText}>
				<label>Alt Text:</label>
				<input type="text" placeholder="ALT Text" value={altText} onChange={(e) => setAltText(e.target.value)} />
			</div>
		</div>
	);
};

export default ImageBox;
