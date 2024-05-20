import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../../../components/Hooks/axios";
import styles from "./AddJobPopup.module.scss";

function AddJobPopup({ setShowAddJobPopup, setReload }) {
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState("");
	const [jobDesc, setJobDesc] = useState("");
	const [jobType, setJobType] = useState("Internship");
	const [workType, setWorkType] = useState("Remote");
	const [image, setImage] = useState(null);

	const handleSave = () => {
		const formData = new FormData();
		formData.append("position", position);
		formData.append("salary", salary);
		formData.append("workType", workType);
		formData.append("jobType", jobType);
		formData.append("description", jobDesc);
		formData.append("poster", image);

		const id = toast.loading("Loading...");

		axios
			.post(`/vacancy/create`, formData)
			.then(({ data }) => {
				toast.update(id, { render: data.message, type: "success", isLoading: false, autoClose: 2000 });
				setReload(Math.random());
				setShowAddJobPopup(false);
			})
			.catch((e) => console.log(e));
	};

	return (
		<div className={styles.addJobPopup} onClick={() => setShowAddJobPopup(false)}>
			<div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
				<h2>Add New Job Post</h2>
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

					<input
						type="file"
						id="imgUrl"
						name="imgUrl"
						accept="image/*"
						onChange={(e) => {
							const file = e.target.files[0];
							if (file) {
								setImage(file);
							}
						}}
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="jobDesc">Job Description:</label>

					<textarea id="jobDesc" name="jobDesc" value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} />
				</div>

				<div className={styles.buttonGroup}>
					<button onClick={() => setShowAddJobPopup(false)}>Cancel</button>

					<button onClick={handleSave}>Save</button>
				</div>
			</div>
		</div>
	);
}

export default AddJobPopup;
