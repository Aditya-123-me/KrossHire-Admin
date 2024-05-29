import React, { useEffect, useRef, useState } from "react";
import FooterBG from "../../assets/images/FooterBG.webp";
import styles from "./AddBlog.module.scss";

const ImageBox = ({ index, updateBoxData }) => {
	const inputRef = useRef();
	const [altText, setAltText] = useState("");
	const [imageFile, setImageFile] = useState(null);
	const [base64Image, setBase64Image] = useState("");

	useEffect(() => {
		const imageData = `<img src="${base64Image}" alt="${altText}" />`;
		updateBoxData(index, imageData);
	}, [imageFile, base64Image, altText, index, updateBoxData]);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = reader.result;
				setBase64Image(base64String);
			};
			reader.readAsDataURL(file);
		}

	};

	return (
		<div className={styles.ImageBox}>
			<div className={styles.Image}>
				<img src={imageFile ? URL.createObjectURL(imageFile) : FooterBG} alt={altText} />
				<input type="file" ref={inputRef} style={{ display: "none" }} onChange={handleFileChange} />
				<button onClick={() => inputRef?.current?.click()}>Add Or change Image</button>
			</div>

			<div className={styles.ImageText}>
				<label>Alt Text:</label>
				<input type="text" placeholder="ALT Text" value={altText} onChange={(e) => setAltText(e.target.value)} />
			</div>
		</div>
	);
};

export default ImageBox;
