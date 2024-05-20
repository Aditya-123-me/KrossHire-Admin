import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../../../components/Hooks/axios";
import styles from "./ApplicationList.module.scss";

function JobCard({ data, index, ActiveData, setReload, setActiveData, setEditPopupShow }) {
	const [showPopup, setShowPopup] = useState(false);
	const [activeId, setActiveId] = useState("");

	const handelActiveSwitch = (e, id) => {
		e.stopPropagation();
		axios
			.put(`/vacancy/toggleStatus/${id}`)
			.then(({ data }) => {
				console.log(data);
				toast.success("Vacancy status change successfully !");
				setReload(Math.random());
			})
			.catch((e) => console.log(e));
	};

	return (
		<>
			<div className={styles.galleryCard} onClick={() => ActiveData(data)}>
				<div className={styles.index}>{index}</div>
				<div className={styles.jobTitle}>{data.position}</div>
				<div className={styles.workType}>{data.jobType}</div>
				<div className={styles.jobType}>{data.workType}</div>
				<div className={styles.salary}>{data.salary}</div>
				<div className={styles.profileImage}>
					<div className={styles.nonEditableImage}>
						<img className={index % 2 === 0 ? styles.even : styles.odd} src={data.poster} alt="poster" />
					</div>
				</div>

				<div className={styles.buttons}>
					<div
						className={styles.edit}
						onClick={(e) => {
							e.stopPropagation();
							setActiveData(data);
							setEditPopupShow(true);
						}}>
						<button>Edit</button>
					</div>

					<div
						className={styles.delete}
						onClick={(e) => {
							e.stopPropagation();
							setShowPopup(true);
							setActiveId(data._id);
						}}>
						<button className={styles.delete}>Delete</button>
					</div>

					<div className={styles.toggleButton} onClick={(e) => handelActiveSwitch(e, data._id)}>
						<button className={data.active ? styles.inActiveButton : styles.activeButton}>
							{data.active ? "Inactive this vacancy" : "Active this vacancy"}
						</button>
					</div>
				</div>

				{showPopup && <Popup {...{ deleteId: activeId, setDeleteId: setActiveId, setReload, setShowPopup }} />}
			</div>
		</>
	);
}

export default JobCard;

const Popup = ({ setReload, setShowPopup, deleteId, setDeleteId }) => {
	const handleConfirm = () => {
		axios
			.delete(`/vacancy/delete/${deleteId}`)
			.then(({ data }) => {
				toast.success("One vacancy delete successfully !");
				setDeleteId("");
				setShowPopup(false);
				setReload(Math.random());
			})
			.catch((e) => console.log(e));
	};

	return (
		<div
			className={styles.popup}
			onClick={(e) => {
				e.stopPropagation();
			}}>
			<div className={styles.popupContent}>
				<p>Are you sure you want to delete this Vacancies ?</p>
				<div className={styles.actions}>
					<button onClick={handleConfirm}>Confirm</button>
					<button onClick={() => setShowPopup(false)}>Cancel</button>
				</div>
			</div>
		</div>
	);
};
