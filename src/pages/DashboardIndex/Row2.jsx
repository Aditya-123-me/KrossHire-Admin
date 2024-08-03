import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Flag from "../../assets/svg/Flag.svg";
import axios from "../../components/Hooks/axios";
import Loading from "../../components/Hooks/Loading";
import styles from "./Dashboard.module.scss";

const Row2 = () => {
	const [activeMapBtn, setActiveMapBtn] = useState("monthly");
	const [pageViewData, setPageViewData] = useState([
		{
			page_path: "/Home",
			page_title: "/Home",
			views: "412",
		},

		{
			page_path: "/signin",
			page_title: "/signin",
			views: "101",
		},
		{
			page_path: "/Setting",
			page_title: "/Setting",
			views: "56",
		},
		{
			page_path: "/Chat",
			page_title: "/Chat",
			views: "44",
		},
		{
			page_path: "/signup",
			page_title: "/signup",
			views: "27",
		},
		{
			page_path: "/verification-code",
			page_title: "/verification-code",
			views: "12",
		},
		{
			page_path: "/Privacy",
			page_title: "/Privacy",
			views: "10",
		},
		{
			page_path: "/Security",
			page_title: "/Security",
			views: "6",
		},
		{
			page_path: "/remote-jobs",
			page_title: "remote jobs",
			views: "5",
		},

		{
			page_path: "/blogs/668405bf9e7c785f07191773",
			page_title: "/Post/668405bf9e7c785f07191773",
			views: "1",
		},
		{
			page_path: "/blogs",
			page_title: "/Post/668fd9099e7c785f0719b33a",
			views: "1",
		},
		{
			page_path: "/contact-us",
			page_title: "/Story/6683e0e29e7c785f07190d20",
			views: "1",
		},
		{
			page_path: "/jobs",
			page_title: "jobs acrosstek",
			views: "1",
		},
		{
			page_path: "/hire?react",
			page_title: "hire developer remote",
			views: "1",
		},
		{
			page_path: "/forget-password",
			page_title: "Emagz | Best Social Media Platform- Chat, Persona, Networking",
			views: "1",
		},
	]);
	const [pageViewCount, setPageViewCount] = useState(412);
	const [pageViewLoading, setPageViewLoading] = useState(false);

	const [countryData, setCountryData] = useState({
		most_users_country: "IN",
		user_data: {
			AE: 5,
			CN: 12,
			DE: 1,
			GB: 1,
			IN: 60,
			NG: 4,
			PK: 1,
			SA: 1,
			SE: 1,
			US: 7,
		},
	});
	const [totalUserByCountry, setTotalUserByCountry] = useState(103);
	const [countryLoading, setCountryLoading] = useState(false);

	// useEffect(() => {
	// 	setPageViewLoading(true);


	// 	axios
	// 		.get(`/views_by_page_title_and_page_path`)
	// 		.then(({ data }) => {
	// 			console.log(data);
	// 			setPageViewData(data);
	// 			setPageViewCount(data[0].views);
	// 			setPageViewLoading(false);
	// 		})
	// 		.catch((response) => {
	// 			console.log("Error => ", response);
	// 		});
	// }, []);

	const totalUserCountInCountry = (data) => {
		const sum = Object.values(data).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		return sum;
	};
	const displayNames = new Intl.DisplayNames(["en"], { type: "region" });

	// useEffect(() => {
	// 	setCountryLoading(true);
	// 	axios
	// 		.get(`/users_by_country?time_range=${activeMapBtn}`)
	// 		.then(({ data }) => {
	// 			setCountryData(data);
	// 			setTotalUserByCountry(totalUserCountInCountry(data?.user_data));
	// 			setCountryLoading(false);
	// 		})
	// 		.catch((response) => {
	// 			console.log("Error => ", response);
	// 		});
	// }, [activeMapBtn]);

	return (
		<div className={styles.Row2}>
			<div className={styles.Col2}>
				<div className={styles.Top}>
					<h1>Users Location</h1>

					<div className={styles.ButtonContainer}>
						<button className={activeMapBtn === "weekly" ? styles.Active : ""} onClick={() => setActiveMapBtn("weekly")}>
							Weekly
						</button>

						<button className={activeMapBtn === "monthly" ? styles.Active : ""} onClick={() => setActiveMapBtn("monthly")}>
							Monthly
						</button>

						<button className={activeMapBtn === "yearly" ? styles.Active : ""} onClick={() => setActiveMapBtn("yearly")}>
							Yearly
						</button>
					</div>
				</div>

				{countryLoading ? (
					<div className={styles.Loading}>
						<Loading />
					</div>
				) : (
					<>
						<div className={styles.Mid}>
							<VectorMap
								map={worldMill}
								containerStyle={{ with: "100%", height: "100%" }}
								backgroundColor="transparent"
								series={{
									regions: [
										{
											scale: ["#9db7df", "#0066ff"],
											values: countryData?.user_data,
										},
									],
								}}
								onRegionTipShow={function reginalTip(event, label, code) {
									return label.html(`<div> <p>${label.html()}</p>  <p>${countryData?.user_data[code]}</p> </div>`);
								}}
							/>
						</div>

						<div className={styles.Bottom}>
							<div className={styles.Box}>
								<img src={Flag} alt="" />
								<div className={styles.Text}>
									<h2>{displayNames.of(countryData?.most_users_country)}</h2>
									<p>
										{Math.floor((countryData?.user_data[countryData?.most_users_country] / totalUserByCountry) * 100)}
										% <span /> {countryData?.user_data[countryData?.most_users_country]} Users
									</p>
								</div>
							</div>
						</div>
					</>
				)}
			</div>

			<div className={styles.Col3}>
				<div className={styles.Top}>
					<h1>Pages Views</h1>
					<Link>View All</Link>
				</div>

				<div className={styles.Bottom}>
					{pageViewLoading ? (
						<div className={styles.Loading}>
							<Loading />
						</div>
					) : (
						pageViewData.map((data, index) => (
							<div key={index} className={styles.Box}>
								<div className={styles.Text}>
									<h4>{data?.page_path}</h4>
									<h5>{data?.views}</h5>
								</div>
								<div className={styles.Bar}>
									<span style={{ width: `${(data.views / pageViewCount) * 100}%` }} />
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Row2;
