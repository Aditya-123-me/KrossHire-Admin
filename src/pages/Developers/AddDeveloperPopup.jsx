import React from "react";
import { FaCamera } from "react-icons/fa";
import styles from "./Developers.module.scss";

const AddDeveloperPopup = ({ setAddPopup }) => {
	const handelSubmit = () => {
		setAddPopup(false);
	};
	return (
		<div className={styles.AddDeveloperPopup} onClick={() => setAddPopup(false)}>
			<div className={styles.WrapperContainer} onClick={(e) => e.stopPropagation()}>
				<h2>Add Developer</h2>

				<div className={styles.ImageWrapper}>
					<img src="https://picsum.photos/500/500" alt="" />
					<input type="file" />
					<button>
						<FaCamera />
					</button>
				</div>

				<div className={styles.InputWrapper}>
					<label>Name</label>
					<input type="text" placeholder="Add Name" />
				</div>

				<div className={styles.InputWrapper}>
					<label>Profession</label>
					<input type="text" placeholder="Add Profession" />
				</div>

				<div className={styles.InputWrapper}>
					<label>Description</label>
					<textarea placeholder="Add Description"></textarea>
				</div>

				<button className={styles.Submit} onClick={handelSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default AddDeveloperPopup;
