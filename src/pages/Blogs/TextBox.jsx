import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import styles from "./AddBlog.module.scss";

const TextBox = ({ index, updateBoxData }) => {
	const [content, setContent] = useState("");

	useEffect(() => {
		updateBoxData(index, content);
	}, [content, index, updateBoxData]);

	return (
		<div className={styles.TextBox}>
			<ReactQuill theme="snow" value={content} onChange={setContent} />
		</div>
	);
};

export default TextBox;
