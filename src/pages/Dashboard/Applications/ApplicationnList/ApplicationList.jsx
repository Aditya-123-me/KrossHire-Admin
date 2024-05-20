import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import Loading from "../../../../../components/Hooks/Loading";
import axios from "../../../../../components/Hooks/axios";
import AddJobPopup from "./AddJobPopup";
import styles from "./ApplicationList.module.scss";
import EditJobPopup from "./EditJobPopup";
import JobCard from "./JobCard";

function ApplicationList() {
	const [showAddJobPopup, setShowAddJobPopup] = useState(false);
	const [openDetailPage, setOpenDetailPage] = useState(false);
	const [activeCardData, setActiveCardData] = useState(null);
	const [vacancies, setVacancies] = useState([]);
	const [count, setCount] = useState({ totalCount: 0, totalPages: 0 });
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [reload, setReload] = useState(0);
	const [editPopupShow, setEditPopupShow] = useState(false);
	const [activeData, setActiveData] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`/vacancy/list?page=${currentPage}&itemPerPage=4`)
			.then(({ data }) => {
				setVacancies(data.data);
				setCount({ totalCount: data.totalCount, totalPages: data.totalPages });
				setIsLoading(false);
			})
			.catch((e) => console.log(e));
	}, [currentPage, reload]);

	const ActiveData = (data) => {
		setActiveCardData(data);
		setOpenDetailPage(true);
	};

	return (
		<>
			{openDetailPage ? (
				<AllApplications data={activeCardData} setOpenDetailPage={setOpenDetailPage} />
			) : (
				<div className={styles.GalleryCon}>
					<h2>Vacancies</h2>

					<div className={styles.addButton} onClick={() => setShowAddJobPopup(true)}>
						Add New Job Post
					</div>

					<div className={styles.gallery}>
						<div className={styles.cards}>
							<div className={styles.upperSection}>
								<div className={styles.index}>Index</div>
								<div className={styles.jobTitle}>JobTitle</div>
								<div className={styles.jobType}>JobType</div>
								<div className={styles.workType}>WorkType</div>
								<div className={styles.salary}>Salary</div>
								<div className={styles.banner}>Banner</div>
								<div className={styles.actions}>Actions</div>
							</div>

							{isLoading ? (
								<Loading height="15rem" width="15rem" />
							) : (
								vacancies.map((member, index) => (
									<JobCard
										key={index}
										data={member}
										index={index + 1}
										setReload={setReload}
										ActiveData={ActiveData}
										setActiveData={setActiveData}
										setEditPopupShow={setEditPopupShow}
									/>
								))
							)}
						</div>

						<div className={styles.pagination}>
							<button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
								Previous
							</button>
							<span>
								Page {currentPage} of {count.totalPages}
							</span>
							<button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === count.totalPages}>
								Next
							</button>
						</div>

						{showAddJobPopup && <AddJobPopup {...{ setShowAddJobPopup, setReload }} />}
						{editPopupShow && <EditJobPopup {...{ setEditPopupShow, setReload, activeData, setActiveData }} />}
					</div>
				</div>
			)}
		</>
	);
}

export default ApplicationList;

const AllApplications = ({ data, setOpenDetailPage }) => {
	const [usersData, setUsersData] = useState([]);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState({ totalCount: 0, totalPages: 0 });

	useEffect(() => {
		axios
			.get(`/vacancy/getApplicationList/${data._id}?itemPerPage=20&page=${page}`)
			.then(({ data }) => {
				setUsersData(data.data);
				setCount({ totalCount: data.totalCount, totalPages: data.totalPages });
			})
			.catch((e) => console.log(e));
	}, [page]);

	return (
		<div className={styles.DetailsPage}>
			<div className={styles.TopContainer}>
				<h1>All Users who applied for {data?.position} job</h1>
				<div onClick={() => setOpenDetailPage(false)}>{"<"}</div>
			</div>
			<div className={styles.Header}>
				<p>Name</p>
				<p>Email</p>
				<p>Phone</p>
				<p>Applied Time</p>
				<p>Resume</p>
			</div>

			<div className={styles.UserContainer}>
				{usersData.length == 0 ? (
					<h1>No Applicant</h1>
				) : (
					usersData.map((data, index) => {
						return (
							<div key={index} className={styles.Box}>
								<p>{data.name}</p>
								<p>{data.email}</p>
								<p>{data.phone}</p>
								<p>{data.createdAt.split("T")[0]}</p>
								<p style={{ cursor: "pointer", fontSize: "2rem" }}>
									<FaFilePdf onClick={() => window.open(data.cv, "_blank")} />
								</p>
							</div>
						);
					})
				)}
			</div>

			<div className={styles.Footer}>
				<button onClick={() => setPage(page - 1)} disabled={page === 1 ? true : false}>
					pre
				</button>
				<p>{page}</p>
				<button onClick={() => setPage(page + 1)} disabled={page === count.totalPages ? true : false}>
					next
				</button>
			</div>
		</div>
	);
};
