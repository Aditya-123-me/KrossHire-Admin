import React, { useEffect, useState } from "react";
import leftArrow from "../../assets/svg/leftArrow.svg";
import rightArrow from "../../assets/svg/rightArrow.svg";
import Loading from "../../components/Hooks/Loading";
import axios from "../../components/Hooks/axios";
import AddDeveloperPopup from "./AddDeveloperPopup";
import styles from "./Developers.module.scss";

function Developers() {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [applications, setApplications] = useState([]);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState({ totalCount: 0, totalPages: 1 });
	const [reload, setReload] = useState(0);
	const [loading, setLoading] = useState(true);
	const [addPopup, setAddPopup] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`developerProfile/allDeveloperProfile`)
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

	return (
		<div className={styles.AdmissionForms}>
			{addPopup && <AddDeveloperPopup {...{ setAddPopup, setReload }} />}

			<h1>Developers</h1>
			<div className={styles.paymentHistory}>
				<div className={styles.heading}>
					<div className={styles.ButtonWrapper}>
						{/* <button
							className={selectedCategory === "all" ? styles.active : ""}
							onClick={() => setSelectedCategory("all")}>
							All
						</button>

						<button
							className={selectedCategory === "filter 1" ? styles.active : ""}
							onClick={() => setSelectedCategory("filter 1")}>
							Filter 1
						</button>

						<button
							className={selectedCategory === "filter 2" ? styles.active : ""}
							onClick={() => setSelectedCategory("filter 2")}>
							Filter 2
						</button> */}

						<button className={styles.refresh} onClick={() => setReload(Math.random())}>
							Refresh
						</button>
					</div>

					<button className={styles.AddDeveloper} onClick={() => setAddPopup(true)}>
						Add Developer
					</button>
				</div>

				<div className={styles.subHeading}>
					<div className={styles.userId}>Sl.No</div>
					<div className={styles.Name}>Name</div>
					<div className={styles.Profession}>Profession</div>
					<div className={styles.Description}>Description</div>
					<div className={styles.Skills}>Skills</div>
					<div className={styles.Exp}>Exp</div>
					<div className={styles.Location}>Location</div>
				</div>

				<div className={styles.supportCards}>
					{loading ? (
						<Loading height="10rem" width="10rem" />
					) : (
						filterApplications().map((item, index) => (
							<div className={styles.ApplicationCard} key={index}>
								<div className={styles.userId}>
									<p>{index + 1}</p>
								</div>

								<div className={styles.Name}>
									<img src={item?.image} alt="" />
									<p>{item?.name}</p>
								</div>

								<div className={styles.Profession}>
									<p>{item?.profession}</p>
								</div>

								<div className={styles.Description}>{item?.description}</div>

								<div className={styles.Skills}>
									<p>{item?.skills.join(", ")}</p>
								</div>

								<div className={styles.Exp}>
									<p>{item?.exp} years</p>
								</div>

								<div className={styles.Location}>
									<p>{item?.location}</p>
								</div>
							</div>
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
		</div>
	);
}

export default Developers;
