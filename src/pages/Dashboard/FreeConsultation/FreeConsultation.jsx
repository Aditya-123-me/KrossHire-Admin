import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import axios from "../../../components/Hooks/axios";
import styles from "./FreeConsultation.module.scss";

const FreeConsultation = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		axios
			.get(`/consulting/all`)
			.then(({ data }) => {
				setData(data.data);
			})
			.catch(({ response }) => {
				console.log("Error => ", response);
			});
	}, []);

	return (
		<div className={styles.FreeConsultation}>
			<h1>Free Consultation</h1>

			<div className={styles.ContentWrapper}>
				{isLoading ? (
					<div className={styles.LoadingContainer}>
						<Circles height="15vh" width="15vh" color="#d59f3b" ariaLabel="circles-loading" visible={true} />
					</div>
				) : (
					<>
						{data.length === 0 && <h2>No data</h2>}

						{data.map((data, index) => {
							return (
								<div key={index} className={styles.Row}>
									<p>
										Name: <span>{data?.name}</span>
									</p>
									<p>
										Email: <span>{data?.email}</span>
									</p>
									<p>
										Phone Number: <span>{data?.number}</span>
									</p>
									<p>
										Business Name: <span>{data?.businessName}</span>
									</p>
									<p>
										Business Type: <span>{data?.businessType}</span>
									</p>
									<p>
										Business Details: <span>{data?.details}</span>
									</p>
									<p>
										Date: <span>{data?.date}</span>
									</p>
									<p>
										Time: <span>{data?.time}</span>
									</p>
								</div>
							);
						})}
					</>
				)}
			</div>
		</div>
	);
};

export default FreeConsultation;
