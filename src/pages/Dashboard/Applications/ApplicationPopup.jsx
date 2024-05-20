import React from "react";
import { FaFilePdf } from "react-icons/fa";
import lessthan from "../../../../assets/svg/lessThan.svg";
import styles from "./Application.module.scss";

function ApplicationPopup({ data, onClose }) {
	console.log(data);
	return (
		<div className={styles.applicationDetailCon}>
			<div className={styles.main}>
				<div className={styles.back} onClick={onClose}>
					<img src={lessthan} alt="" />
				</div>
				<div className={styles.topSection}>
					<h2>Admission detail of Applicant</h2>
				</div>
				<div className={styles.data}>
					<p>Name: {data.name}</p>
					<p>Email Id: {data.email}</p>
					<p>Phone: {data.phone}</p>
					<p>Application Date: {data.createdAt.split("T")[0]}</p>
					<p>Gender: {data.gender}</p>
					<p>Job Type: {data.jobType}</p>
					<p>description : {data.description}</p>
					<p>
						Resume: <FaFilePdf size={20} onClick={() => window.open(data.cv, "_blank")} />{" "}
					</p>
				</div>
			</div>
		</div>
	);
}

export default ApplicationPopup;
