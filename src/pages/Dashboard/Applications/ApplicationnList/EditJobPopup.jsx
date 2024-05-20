import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../../../components/Hooks/axios";
import styles from "./AddJobPopup.module.scss";

function EditJobPopup({ setEditPopupShow, setReload, activeData, setActiveData }) {
	const [position, setPosition] = useState(activeData.position);
	const [salary, setSalary] = useState(activeData.salary);
	const [jobDesc, setJobDesc] = useState(activeData.description);
	const [jobType, setJobType] = useState(activeData.jobType);
	const [workType, setWorkType] = useState(activeData.workType);
	const [image, setImage] = useState(null);
	const [imgUrl, setImgUrl] = useState(activeData.poster);
	const [isLoading, setIsLoading] = useState(false);

	const handleSave = () => {
		setIsLoading(true);
		const formData = new FormData();
		formData.append("position", position);
		formData.append("salary", salary);
		formData.append("workType", workType);
		formData.append("jobType", jobType);
		formData.append("description", jobDesc);
		if (image) formData.append("poster", image);

		const id = toast.loading("Loading...");

		axios
			.post(`/vacancy/update/${activeData._id}`, formData)
			.then(({ data }) => {
				setIsLoading(false);
				toast.update(id, { render: data.message, type: "success", isLoading: false, autoClose: 2000 });
				setReload(Math.random());
				setEditPopupShow(false);
				setActiveData(null);
			})
			.catch((e) => console.log(e));
	};

	return (
		<div
			className={styles.addJobPopup}
			onClick={() => {
				setEditPopupShow(false);
				setActiveData(null);
			}}>
			<div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
				<h2>Edit Job Post</h2>
				<div className={styles.formGroup}>
					<label htmlFor="position">Job Title:</label>
					<input
						type="text"
						id="position"
						name="position"
						value={position}
						onChange={(e) => setPosition(e.target.value)}
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="jobType">Job Type:</label>

					<select id="jobType" name="jobType" value={jobType} onChange={(e) => setJobType(e.target.value)}>
						<option value="Internship">Internship</option>
						<option value="Full Time">Full Time</option>
						<option value="Part Time">Part Time</option>
						<option value="Hourly Basis">Hourly Basis</option>
					</select>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="workType">Work Type:</label>

					<select id="workType" name="workType" value={workType} onChange={(e) => setWorkType(e.target.value)}>
						<option value="Remote">Remote</option>
						<option value="Work from Office">Work from Office</option>
						<option value="Hybrid">Hybrid</option>
					</select>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="salary">Salary:</label>

					<input type="text" id="salary" name="salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="imgUrl">Banner Image:</label>

					<div>
						<img src={imgUrl} alt="" />

						<input
							type="file"
							id="imgUrl"
							name="imgUrl"
							accept="image/*"
							onChange={(e) => {
								const file = e.target.files[0];
								if (file) {
									setImage(file);
									setImgUrl(URL.createObjectURL(file));
								}
							}}
						/>
					</div>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="jobDesc">Job Description:</label>

					<textarea id="jobDesc" name="jobDesc" value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} />
				</div>

				<div className={styles.buttonGroup}>
					<button
						onClick={() => {
							setEditPopupShow(false);
							setActiveData(null);
						}}>
						Cancel
					</button>

					<button onClick={handleSave} disabled={isLoading}>
						{isLoading ? "Loading..." : "Update"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default EditJobPopup;
