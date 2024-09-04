import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import leftArrow from "../../assets/svg/leftArrow.svg";
import rightArrow from "../../assets/svg/rightArrow.svg";
import Loading from "../../components/Hooks/Loading";
import axios from "../../components/Hooks/axios";
import { useDeleteAlert } from "../../components/Hooks/useDeleteAlert";
import styles from "./Styles.module.scss";

function Blogs() {
	const navigate = useNavigate();
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [applications, setApplications] = useState([]);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState({ totalCount: 0, totalPages: 1 });
	const [reload, setReload] = useState(0);
	const [loading, setLoading] = useState(true);
	const { language } = useSelector((state) => state.auth);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`/blog/allBlog?page=1&limit=25&language=${language}`)
			.then(({ data }) => {
				setApplications(data.data);
				setTotal({ totalCount: data.totalCount, totalPages: data.totalPages });
				setLoading(false);
			})
			.catch((e) => console.log(e));
	}, [page, reload, language]);

	const handelDelete = async (id) => {
		const confirmed = await useDeleteAlert();
		if (!confirmed) return;

		axios
			.delete(`/blog/delete/${id}`)
			.then(({ data }) => {
				toast.success("Successfully Deleted !");
				setReload(Math.random());
			})
			.catch((e) => console.log(e));
	};

	return (
		<div className={styles.AdmissionForms}>
			<h1>Blogs</h1>
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

					<button className={styles.AddDeveloper} onClick={() => navigate("/add-blog")}>
						Add Blogs
					</button>
				</div>

				{loading ? (
					<Loading height="10rem" width="10rem" />
				) : (
					<div className={styles.supportCards}>
						{applications.map((data, index) => (
							<div className={styles.ApplicationCardOuter} key={index}>
								<div
									className={styles.ApplicationCard}
									style={{ background: data?.bgColor }}
									// onClick={() => navigate(`/edit-blog/${data?._id}`)}
									onClick={()=>navigate(`/update-blog/${data.title}`)}
								>
									<img src={data?.image} alt="" />
									<h2 style={{ color: data?.textColor }}>{data?.title}</h2>
									<p onClick={() => handelDelete(data._id)}>
										<FaTrashAlt />
									</p>
								</div>
							</div>
						))}
					</div>
				)}

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

export default Blogs;
