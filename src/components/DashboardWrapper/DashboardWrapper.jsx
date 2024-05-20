import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { MdDashboard, MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { removeUser } from "../../redux/slice/authSlice";
import styles from "./DashboardWrapper.module.scss";

const DashboardWrapper = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	useEffect(() => {
		if (!sessionStorage.getItem("HV_token")) navigate("/", { replace: true });
	}, []);

	if (sessionStorage.getItem("HV_token"))
		return (
			<div className={styles.dashboardContainer}>
				<div className={styles.sidebar}>
					<div className={styles.Logo} onClick={() => navigate("/dashboard")}>
						<img src={Logo} alt="Logo" />
					</div>

					<div className={styles.menu}>
						<div
							className={`${styles.items} ${pathname === "/dashboard" ? styles.activeItem : ""}`}
							onClick={() => navigate("/dashboard")}>
							<MdDashboard />
							<p>Dashboard</p>
						</div>

						<div
							className={`${styles.items} ${pathname === "/dashboard" ? styles.activeItem : ""}`}
							onClick={() => navigate("/dashboard")}>
							<MdDashboard />
							<p>Dashboard</p>
						</div>

						<div
							className={styles.items}
							onClick={() => {
								navigate("/", { replace: true });
								dispatch(removeUser());
							}}>
							<MdLogout />
							<p>Logout</p>
						</div>
					</div>
				</div>

				<div className={styles.content}>
					<div className={styles.navbar}>
						<div className={styles.search}>
							<label htmlFor="search">
								<IoSearchOutline />
							</label>

							<input type="search" name="" id="search" />
						</div>

						<div className={styles.languageNotification}>
							<select name="language" id="" className={styles.language}>
								<option value="english">English</option>
								<option value="hindi">Hindi</option>
							</select>

							<div className={styles.notification}>
								<IoIosNotifications />
							</div>

							<div className={styles.profilePic}>
								<CgProfile />
							</div>
						</div>
					</div>

					<div className={styles.mainSection}>
						<Outlet />
					</div>
				</div>
			</div>
		);
};

export default DashboardWrapper;
