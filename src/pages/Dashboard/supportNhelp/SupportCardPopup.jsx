import React, { useState } from "react";
import lessthan from "../../../../assets/svg/lessThan.svg";
import ticket from "../../../../assets/svg/ticket.svg";
import styles from "./SupportCardPopup.module.scss";
import ReasonPopup from "./ReasonPopup";

const queries = [
	{
		ticketNo: "25625",
		ticketTitle: "Server not Working",
		raiseddate: "12 sep 2023",
		active: true,
	},
	{
		ticketNo: "25625",
		ticketTitle: "Server not Working",
		raiseddate: "12 sep 2023",
		active: false,
	},
	{
		ticketNo: "25625",
		ticketTitle: "Server not Working",
		raiseddate: "12 sep 2023",
		active: false,
	},
	{
		ticketNo: "25625",
		ticketTitle: "Server not Working",
		raiseddate: "12 sep 2023",
		active: false,
	},
	{
		ticketNo: "25625",
		ticketTitle: "Server not Working",
		raiseddate: "12 sep 2023",
		active: false,
	},
	{
		ticketNo: "25625",
		ticketTitle: "Server not Working",
		raiseddate: "12 sep 2023",
		active: false,
	},
];
function SupportCardPopup({ data, onClose }) {
	return (
		<div className={styles.supportPopup}>
			<div className={styles.main}>
				<div className={styles.lessThan}>
					<img src={lessthan} alt="" onClick={onClose} />
				</div>
				<div className={styles.profile}>
					<div className={styles.profilePic}>
						<img src={data.profilePic} alt="" />
					</div>
					<div className={styles.nameEmail}>
						<h2>{data.userName}</h2>
						<p>{data.email}</p>
					</div>
				</div>

				<div className={styles.ticketRise}>Ticket Rise</div>

				<div className={styles.queryContainer}>{queries && queries.map((query, i) => <TicketCard data={query} key={i} />)}</div>
			</div>
		</div>
	);
}


export default SupportCardPopup;

const TicketCard = ({ data }) => {
	const [openReasonPopup, setOpenReasonPopup] = useState(false);

	const handleOpenReasonPopup = () => {
		setOpenReasonPopup(true);
	};

	const handleCloseReasonPopup = () => {
		setOpenReasonPopup(false);
	};
	return (
		<>
			<div className={styles.ticketCardContainer} onClick={handleOpenReasonPopup}>
				<div className={styles.ticketDetails}>
					<div className={styles.ticketNo}>
						<img src={ticket} alt="" />
						<p>Ticket No #{data.ticketNo}</p>
					</div>
					<div className={styles.ticketTitle}>{data.ticketTitle}</div>
					<div className={styles.raisedDate}>{data.raiseddate}</div>
				</div>
				<div className={styles.status}>
					{data.active === true ? <div className={styles.active}>active</div> : <div className={styles.closed}>closed</div>}
				</div>
			</div>

			{openReasonPopup && (
				<div className={styles.rpopup}>
					<ReasonPopup data={""} onClose={handleCloseReasonPopup} />
				</div>
			)}
		</>
	);
};


