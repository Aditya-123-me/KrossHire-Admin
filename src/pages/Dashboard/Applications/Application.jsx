import React, { useEffect, useState } from "react";
import leftArrow from "../../../../assets/svg/leftArrow.svg";
import rightArrow from "../../../../assets/svg/rightArrow.svg";
import axios from "../../../../components/Hooks/axios";
import styles from "./Application.module.scss";
import ApplicationCard from "./ApplicationCard";
import ApplicationPopup from "./ApplicationPopup";
import Loading from "../../../../components/Hooks/Loading";

function Application() {
	const [showDetailPopup, setShowDetailPopup] = useState(false);
	const [activeCardData, setActiveCardData] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [applications, setApplications] = useState([]);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState({ totalCount: 0, totalPages: 1 });
	const [reload, setReload] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`/carrier/list?itemPerPage=10&page=${page}`)
			.then(({ data }) => {
				setApplications(data.data);
				setTotal({ totalCount: data.totalCount, totalPages: data.totalPages });
				setLoading(false);
			})
			.catch((e) => console.log(e));
	}, [page, reload]);

	const filterApplications = () => {
		if (selectedCategory === "all") {
			return applications;
		} else {
			return applications.filter((item) => item.gender === selectedCategory);
		}
	};

	const handlePopup = (data) => {
		setActiveCardData({ ...data });
		setShowDetailPopup(true);
	};

	const handleClosePopup = () => {
		setShowDetailPopup(false);
	};

	return (
		<div className={styles.AdmissionForms}>
			<h1>Applications</h1>

			<div className={styles.paymentHistory}>
				<div className={styles.heading}>
					<button
						className={selectedCategory === "all" ? styles.active : ""}
						onClick={() => setSelectedCategory("all")}>
						All
					</button>
					<button
						className={selectedCategory === "normal" ? styles.active : ""}
						onClick={() => setSelectedCategory("normal")}>
						Normal
					</button>
					<button
						className={selectedCategory === "transgender" ? styles.active : ""}
						onClick={() => setSelectedCategory("transgender")}>
						TransGender
					</button>
					<button className={styles.refresh} onClick={() => setReload(Math.random())}>
						Refresh
					</button>
				</div>

				<div className={styles.subHeading}>
					<div className={styles.userId}>Sl.No</div>
					<div className={styles.reportDate}>Name</div>
					<div className={styles.emailAddress}>Email Address</div>
					<div className={styles.category}>Phone</div>
					<div className={styles.type}>Gender</div>
					<div className={styles.type}>Job Type</div>
					<div className={styles.cv}>cv</div>
					<div className={styles.type}>Apply Date</div>
				</div>

				<div className={styles.supportCards}>
					{loading ? (
						<Loading height="20rem" width="20rem"/>
					) : (
						filterApplications().map((item, index) => (
							<ApplicationCard data={item} index={index} handlePopup={handlePopup} key={index} />
						))
					)}
				</div>

				<div className={styles.pagination}>
					<div className={styles.records}>{`Showing 10 of ${total.totalCount} users in ${page} page`}</div>
					<div className={styles.pageButtons}>
						<button
							className={styles.leftArrow}
							disabled={page === 1}
							onClick={() => {
								setSelectedCategory("all");
								setPage(page - 1);
							}}>
							{page > 1 && <img src={leftArrow} alt="" />}
						</button>

						<div className={styles.pages}>
							<div className={`${styles.buttons} ${styles.active}`}>{page}</div>
						</div>

						<button
							className={styles.rightArrow}
							disabled={page === total.totalPages}
							onClick={() => {
								setSelectedCategory("all");
								setPage(page + 1);
							}}>
							{total.totalPages === page ? "" : <img src={rightArrow} alt="" />}
						</button>
					</div>
				</div>
			</div>

			{showDetailPopup && (
				<div className={styles.applicationPopup}>
					<ApplicationPopup data={activeCardData} onClose={handleClosePopup} />
				</div>
			)}
		</div>
	);
}

export default Application;
