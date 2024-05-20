import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import styles from "./AddBlog.module.scss";

const AddBlog = ({ setAddPopup }) => {
	const [bg, setBg] = useState("#ff621f");
	const [color, setColor] = useState("#fff");
	const [imageFile, setImageFile] = useState(null);
	const inputRef = useRef();

	const handelSubmit = () => {
		setAddPopup(false);
	};
	return (
		<div className={styles.AddBlog} onClick={() => setAddPopup(false)}>
			<h1>Add Blog</h1>

			<div className={styles.WrapperContainer} onClick={(e) => e.stopPropagation()}>
				<div className={styles.ImageWrapper} style={{ background: bg }}>
					<div className={styles.Left}>
						<textarea placeholder="Add your title" style={{ color: color }}></textarea>

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
						<img src={imageFile ? URL.createObjectURL(imageFile) : "https://picsum.photos/500/500"} alt="" />
						<input type="file" ref={inputRef} onChange={(e) => setImageFile(e.target.files[0])} />
						<button onClick={() => inputRef.current.click()}>
							<FaCamera />
						</button>
					</div>
				</div>

				<div className={styles.InputWrapper}>
					<label>Description</label>
					<textarea placeholder="Add Description"></textarea>
				</div>

				<div className={styles.Submit}>
					<button onClick={handelSubmit}>Submit</button>
				</div>
			</div>
		</div>
	);
};

export default AddBlog;
