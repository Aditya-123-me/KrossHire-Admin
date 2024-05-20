import React from "react";
import { FaFilePdf } from "react-icons/fa";
import style from "./Application.module.scss";

function ApplicationCard({ data, index, handlePopup }) {
	return (
		<div className={style.ApplicationCard} onClick={() => handlePopup(data)}>
			<div className={style.userName}>
				<p>{index + 1}</p>
			</div>
			<div className={style.reportedDate}>
				<p>{data.name}</p>
			</div>
			<div className={style.emailAddress}>
				<p>{data.email}</p>
			</div>
			<div className={style.category}>
				<p>{data.phone}</p>
			</div>
			<div className={style.type}>
				<p> {data.gender}</p>
			</div>
			<div className={style.type}>
				<p> {data.jobType}</p>
			</div>
			<div className={style.cv} onClick={(e) => e.stopPropagation()}>
				<p>
					<FaFilePdf size={20} onClick={() => window.open(data.cv, "_blank")} />
				</p>
			</div>
			<div className={style.type}>
				<p> {data.createdAt.split("T")[0]}</p>
			</div>
		</div>
	);
}

export default ApplicationCard;
