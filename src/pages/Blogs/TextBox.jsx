import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import styles from "./AddBlog.module.scss";
import { RxCross2 } from "react-icons/rx";

const TextBox = ({ id, updateBoxData, removeBox }) => {
	const [content, setContent] = useState("");

	useEffect(() => {
		updateBoxData(id, content);
	}, [content, id, updateBoxData]);

	return (
		<div className={styles.TextBox}>
			<div className={styles.Remove} onClick={() => removeBox(id)}>
				<RxCross2 size={"2rem"} color="#fff" />
			</div>
			<ReactQuill theme="snow" value={content} onChange={setContent} />
		</div>
	);
};

export default TextBox;
