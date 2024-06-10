import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { TagsInput } from "react-tag-input-component";
import { toast } from "react-toastify";
import user from "../../assets/images/user.png";
import Loading from "../../components/Hooks/Loading";
import axios from "../../components/Hooks/axios";
import styles from "./Developers.module.scss";

const EditDeveloperPopup = ({ activeData, setActiveData, setReload }) => {
	const inputRef = useRef();
	const [fileInput, setFileInput] = useState(null);
	const [name, setName] = useState(activeData.name || "");
	const [profession, setProfession] = useState(activeData.profession || "");
	const [description, setDescription] = useState(activeData.description || "");
	const [location, setLocation] = useState(activeData.location || "");
	const [exp, setExp] = useState(activeData.exp || "");
	const [skills, setSkills] = useState(activeData.skills || []);
	const [isLoading, setIsLoading] = useState(false);

	const handelSubmit = () => {
		// if (!fileInput) return toast.error("Please select a image !!");
		if (!name || !profession || !description || !location || !exp || !skills) return toast.error("Please all data !!");
		setIsLoading(true);

		const formData = new FormData();
		formData.append("id", activeData._id);
		formData.append("name", name);
		formData.append("image", fileInput);
		formData.append("description", description);
		formData.append("profession", profession);
		formData.append("location", location);
		formData.append("exp", exp);
		formData.append("skills", JSON.stringify(skills));

		
		axios
		.put(`/developerProfile/update`, formData)
		.then(({ data }) => {
			toast.success(data.msg);
			setIsLoading(false);
			setReload(Math.random());
			setActiveData(null);
			})
			.catch(({ response }) => {
				console.log("Error => ", response);
			});
	};

	return (
		<div className={styles.AddDeveloperPopup} onClick={() => setActiveData(null)}>
			<div className={styles.WrapperContainer} onClick={(e) => e.stopPropagation()}>
				<h2>Edit Developer</h2>

				<div className={styles.ImageWrapper}>
					<img src={fileInput ? URL.createObjectURL(fileInput) : user} alt="" />
					<input type="file" ref={inputRef} onChange={(e) => setFileInput(e.target.files[0])} />
					<button onClick={() => inputRef.current.click()}>
						<FaCamera />
					</button>
				</div>

				<div className={styles.InputWrapper}>
					<label>Name</label>
					<input type="text" placeholder="Add Name" value={name} onChange={(e) => setName(e.target.value)} />
				</div>

				<div className={styles.Row}>
					<div className={styles.InputWrapper}>
						<label>Profession</label>
						<input
							type="text"
							placeholder="Add Profession"
							value={profession}
							onChange={(e) => setProfession(e.target.value)}
						/>
					</div>

					<div className={styles.InputWrapper}>
						<label>Experience</label>
						<input
							type="number"
							placeholder="Add Experience [only add year]"
							value={exp}
							onChange={(e) => setExp(e.target.value)}
						/>
					</div>
				</div>

				<div className={styles.InputWrapper}>
					<label>Skills</label>
					<TagsInput value={skills} onChange={setSkills} name="skills" placeHolder="Add Skills" />
					<em>press enter or comma to add new skills</em>
				</div>

				<div className={styles.InputWrapper}>
					<label>Description</label>
					<textarea
						placeholder="Add Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}></textarea>
				</div>

				<div className={styles.InputWrapper}>
					<label>Location</label>
					<input
						type="text"
						placeholder="Add Location"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
				</div>

				<button className={styles.Submit} onClick={handelSubmit}>
					{isLoading ? <Loading color="#fff" /> : "Update"}
				</button>
			</div>
		</div>
	);
};

export default EditDeveloperPopup;
