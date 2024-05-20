import React from "react";
import styles from "./Dashboard.module.scss";

const items = [
	{
		id: 1,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 2,
		count: 12,
		itemName: "Recent Queries",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 3,
		count: 42,
		itemName: "Recent Admission Applications",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 4,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 5,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 6,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 7,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 8,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 9,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
	{
		id: 10,
		count: 42,
		itemName: "Dummy",
		imgUrl: "https://picsum.photos/500/500",
	},
];

const Dashboard = () => {
	return (
		<div className={styles.Dashboard}>
			{items && items.map((item, i) => <UpperCards key={i} {...item} />)}
		</div>
	);
};

export default Dashboard;

const UpperCards = ({ id, count, itemName, imgUrl }) => {
	return (
		<div className={styles.cardContainer}>
			<div className={styles.upperSection}>
				<div className={styles.details}>
					<h3>{count}</h3>
					<h4>{itemName}</h4>
				</div>

				<div className={styles.prod}>
					<img src={imgUrl} alt="" />
				</div>
			</div>

			<div className={styles.line}><hr /></div>

			<div className={styles.lowerSection}>
				<p>Last Updated at {"15 minutes ago"} </p>
				<button>More Info</button>
			</div>
		</div>
	);
};
