import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import leftArrow from "../../assets/svg/leftArrow.svg";
import rightArrow from "../../assets/svg/rightArrow.svg";
import { dateFormat } from "../../components/Functions/Date";
import Loading from "../../components/Hooks/Loading";
import axios from "../../components/Hooks/axios";
import { useDeleteAlert } from "../../components/Hooks/useDeleteAlert";
import AddTestimonialPopup from "./AddDeveloperPopup";
import EditTestimonialPopup from "./EditTestimonialPopup";
import styles from "./Testimonial.module.scss";
import { useSelector } from "react-redux";

function Testimonial() {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [applications, setApplications] = useState([]);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState({ totalCount: 0, totalPages: 1 });
	const [reload, setReload] = useState(0);
	const [loading, setLoading] = useState(true);
	const [addPopup, setAddPopup] = useState(false);
	const [activeData, setActiveData] = useState(null);

	const { language } = useSelector((state) => state.auth);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`/testimonial/allTestimonial?type=${language}`)
			.then(({ data }) => {
				setApplications(data.data);
				setTotal({ totalCount: data.totalCount, totalPages: data.totalPages });
				setLoading(false);
			})
			.catch((e) => console.log(e));
	}, [page, reload, language]);

	const filterTestimonial = () => {
		if (selectedCategory === "all") {
			return applications;
		} else {
			return applications.filter((item) => item.gender === selectedCategory);
		}
	};

	const handelDelete = async (id) => {
		const confirmed = await useDeleteAlert();
		if (!confirmed) return;

		axios
			.delete(`/testimonial/delete/${id}`)
			.then(({ data }) => {
				toast.success("Successfully Deleted !");
				setReload(Math.random());
			})
			.catch((e) => console.log(e));
	};

	return (
		<div className={styles.AdmissionForms}>
			{addPopup && <AddTestimonialPopup {...{ setAddPopup, setReload }} />}
			{activeData && <EditTestimonialPopup {...{ activeData, setActiveData, setReload }} />}

			<h1>Testimonial</h1>

			<div className={styles.ContentWrapper}>
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
						</button>

						<button className={styles.refresh} onClick={() => setReload(Math.random())}>
							Refresh
						</button> */}
					</div>

					<button className={styles.AddDeveloper} onClick={() => setAddPopup(true)}>
						Add Testimonial
					</button>
				</div>

				<div className={styles.subHeading}>
					<div className={styles.userId}>Sl.No</div>
					<div className={styles.Name}>Name</div>
					<div className={styles.Profession}>Company Name</div>
					<div className={styles.Description}>Description</div>
					<div className={styles.Date}>Date</div>
					<div className={styles.Actions}>Actions</div>
				</div>

				<div className={styles.supportCards}>
					{loading ? (
						<Loading height="10rem" width="10rem" />
					) : (
						filterTestimonial().map((item, index) => (
							<div className={styles.ApplicationCard} key={index}>
								<div className={styles.userName}>
									<p>{index + 1}</p>
								</div>

								<div className={styles.Name}>
									<img src={item?.image} alt="" />
									<p>{item?.name}</p>
								</div>

								<div className={styles.Profession}>
									<p>{item?.title}</p>
								</div>

								<div className={styles.Description}>{item?.description}</div>

								<div className={styles.Date}>
									<p>{dateFormat(item?.createdAt)}</p>
								</div>

								<div className={styles.Actions}>
									<p onClick={() => setActiveData(item)}>
										<FaEdit />
									</p>
									<p onClick={() => handelDelete(item._id)}>
										<FaTrashAlt />
									</p>
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

export default Testimonial;
