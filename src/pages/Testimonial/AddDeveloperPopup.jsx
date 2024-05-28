import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import user from "../../assets/images/user.png";
import Loading from "../../components/Hooks/Loading";
import axios from "../../components/Hooks/axios";
import styles from "./Testimonial.module.scss";

const AddTestimonialPopup = ({ setAddPopup, setReload }) => {
	const inputRef = useRef();
	const [imageFile, setImageFile] = useState(null);
	const [name, setName] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [description, setDescription] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handelSubmit = () => {
		if (!name || !imageFile || !companyName || !description) return toast.error("Please fill all !!");
		setIsLoading(true);

		const formData = new FormData();
		formData.append("name", name);
		formData.append("image", imageFile);
		formData.append("description", description);
		formData.append("title", companyName);

		axios
			.post(`testimonial/create`, formData)
			.then(({ data }) => {
				console.log(data);
				setAddPopup(false);
				setIsLoading(false);
				setReload(Math.random());
			})
			.catch(({ response }) => {
				console.log("Error => ", response);
			});
	};
	return (
		<div className={styles.AddDeveloperPopup} onClick={() => setAddPopup(false)}>
			<div className={styles.WrapperContainer} onClick={(e) => e.stopPropagation()}>
				<h2>Add Testimonial</h2>

				<div className={styles.ImageWrapper}>
					<img src={imageFile ? URL.createObjectURL(imageFile) : user} alt="" />
					<input type="file" ref={inputRef} onChange={(e) => setImageFile(e.target.files[0])} />

					<button onClick={() => inputRef.current.click()}>
						<FaCamera />
					</button>
				</div>

				<div className={styles.InputWrapper}>
					<label>Name</label>
					<input type="text" placeholder="Add Name" value={name} onChange={(e) => setName(e.target.value)} />
				</div>

				<div className={styles.InputWrapper}>
					<label>Company Name</label>
					<input
						type="text"
						placeholder="Add Company Name"
						value={companyName}
						onChange={(e) => setCompanyName(e.target.value)}
					/>
				</div>

				<div className={styles.InputWrapper}>
					<label>Description</label>
					<textarea
						placeholder="Add Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}></textarea>
				</div>

				<button className={styles.Submit} onClick={handelSubmit}>
					{isLoading ? <Loading color="#fff" /> : "Submit"}
				</button>
			</div>
		</div>
	);
};

export default AddTestimonialPopup;
