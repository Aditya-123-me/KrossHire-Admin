import React from "react";
import circle from "../../../../assets/svg/circle.svg";
import ticket from "../../../../assets/svg/ticket.svg";
import styles from  "./supportNhelp.module.scss";

function SupportCard({ data, handlePopup }) {
	const unresolvedClass = data.status === 0 ? styles.active : "";
	const resolvedClass = data.status === 1 ? styles.active : "";

	return (
		<div className={styles.supportCard} onClick={() => handlePopup(data)}>
			<div className={styles.userId}>
				<img src={data.profilePic} alt="" />
				<p>{data.userName}</p>
			</div>
			<div className={styles.emailAddress}>
				<p>{data.email}</p>
			</div>
			<div className={styles.reportedDate}>
				<p>{data.reportedDate}</p>
			</div>
			<div className={styles.ticketsRise}>
				<img src={ticket} alt="" />
				<p>{data.ticketRise} Ticket Rise</p>
			</div>
			<div className={styles.newTickets}>
				<img src={circle} alt="" />
				<p> {data.newTickets} New ticket Rise</p>
			</div>
			<div className={styles.ticketId}>
				<p> #{data.ticketId}</p>
			</div>

			<div className={styles.actions}>
				<button className={`${styles.unresolved} ${unresolvedClass}`}>Unresolved</button>
				<button className={`${styles.resolved} ${resolvedClass}`}>Resolved</button>
			</div>
		</div>
	);
}


export default SupportCard;
