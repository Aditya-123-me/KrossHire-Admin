import React, { useState } from "react";
import leftArrow from "../../../assets/svg/leftArrow.svg";
import rightArrow from "../../../assets/svg/rightArrow.svg";
import SupportCard from "./SupportCard";
import SupportCardPopup from "./SupportCardPopup";
import styles from "./supportNhelp.module.scss";

const supports = [
	{
		id: 1,
		profilePic:
			"https://s3-alpha-sig.figma.com/img/7186/0bb9/83519de3e0d5db342a52011d2ec9bcee?Expires=1699228800&Signature=QkGp~rUP5FolMsr8kdfW0acP-ENPBC6b6EBAd2O-V5zephPt6VLEURzT62Rqjel95tpATmupeewGkw11GKcSojaWER8dp166I8AnE9TdfsRsO9ZijN-PHe4-Ta1dx7zc-5sxWlduA6ISgDqLPpli1WVYt66f9Ez8FnVyZ~-BoXmpq1LPZlzNmQMSZLlZ5GhKv3b5BaKFyVPWtXAKz6lnGv-C-tXBSZf0gO1U8any2KbYWbOz18oxOc3MlF7QczBgL6xldy53EYRSpLcEjEzt6iiMM-nTnRCgtMlsmjLfswWvLlJr60zXR51VmRGJugHM5KBOFufdiISQ01QB34GM~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		userName: "Cody Fisher",
		email: "Codyfisher67@gmail.com",
		reportedDate: "10 Dec, 2021",
		ticketRise: 6,
		newTickets: 2,
		ticketId: "566W077XXXXX ",
		status: 1,
	},
	{
		id: 2,
		profilePic:
			"https://s3-alpha-sig.figma.com/img/7186/0bb9/83519de3e0d5db342a52011d2ec9bcee?Expires=1699228800&Signature=QkGp~rUP5FolMsr8kdfW0acP-ENPBC6b6EBAd2O-V5zephPt6VLEURzT62Rqjel95tpATmupeewGkw11GKcSojaWER8dp166I8AnE9TdfsRsO9ZijN-PHe4-Ta1dx7zc-5sxWlduA6ISgDqLPpli1WVYt66f9Ez8FnVyZ~-BoXmpq1LPZlzNmQMSZLlZ5GhKv3b5BaKFyVPWtXAKz6lnGv-C-tXBSZf0gO1U8any2KbYWbOz18oxOc3MlF7QczBgL6xldy53EYRSpLcEjEzt6iiMM-nTnRCgtMlsmjLfswWvLlJr60zXR51VmRGJugHM5KBOFufdiISQ01QB34GM~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		userName: "Rody Fisher",
		email: "Rodyfisher67@gmail.com",
		reportedDate: "10 Dec, 2021",
		ticketRise: 6,
		newTickets: 2,
		ticketId: "566W077XXXXX ",
		status: 1,
	},
	{
		id: 3,
		profilePic:
			"https://s3-alpha-sig.figma.com/img/7186/0bb9/83519de3e0d5db342a52011d2ec9bcee?Expires=1699228800&Signature=QkGp~rUP5FolMsr8kdfW0acP-ENPBC6b6EBAd2O-V5zephPt6VLEURzT62Rqjel95tpATmupeewGkw11GKcSojaWER8dp166I8AnE9TdfsRsO9ZijN-PHe4-Ta1dx7zc-5sxWlduA6ISgDqLPpli1WVYt66f9Ez8FnVyZ~-BoXmpq1LPZlzNmQMSZLlZ5GhKv3b5BaKFyVPWtXAKz6lnGv-C-tXBSZf0gO1U8any2KbYWbOz18oxOc3MlF7QczBgL6xldy53EYRSpLcEjEzt6iiMM-nTnRCgtMlsmjLfswWvLlJr60zXR51VmRGJugHM5KBOFufdiISQ01QB34GM~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		userName: "Nody Fisher",
		email: "Nodyfisher67@gmail.com",
		reportedDate: "10 Dec, 2021",
		ticketRise: 6,
		newTickets: 2,
		ticketId: "566W077XXXXX ",
		status: 0,
	},
	{
		id: 4,
		profilePic:
			"https://s3-alpha-sig.figma.com/img/7186/0bb9/83519de3e0d5db342a52011d2ec9bcee?Expires=1699228800&Signature=QkGp~rUP5FolMsr8kdfW0acP-ENPBC6b6EBAd2O-V5zephPt6VLEURzT62Rqjel95tpATmupeewGkw11GKcSojaWER8dp166I8AnE9TdfsRsO9ZijN-PHe4-Ta1dx7zc-5sxWlduA6ISgDqLPpli1WVYt66f9Ez8FnVyZ~-BoXmpq1LPZlzNmQMSZLlZ5GhKv3b5BaKFyVPWtXAKz6lnGv-C-tXBSZf0gO1U8any2KbYWbOz18oxOc3MlF7QczBgL6xldy53EYRSpLcEjEzt6iiMM-nTnRCgtMlsmjLfswWvLlJr60zXR51VmRGJugHM5KBOFufdiISQ01QB34GM~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		userName: "Cody Fisher",
		email: "Codyfisher67@gmail.com",
		reportedDate: "10 Dec, 2021",
		ticketRise: 6,
		newTickets: 2,
		ticketId: "566W077XXXXX ",
		status: 0,
	},
	{
		id: 5,
		profilePic:
			"https://s3-alpha-sig.figma.com/img/7186/0bb9/83519de3e0d5db342a52011d2ec9bcee?Expires=1699228800&Signature=QkGp~rUP5FolMsr8kdfW0acP-ENPBC6b6EBAd2O-V5zephPt6VLEURzT62Rqjel95tpATmupeewGkw11GKcSojaWER8dp166I8AnE9TdfsRsO9ZijN-PHe4-Ta1dx7zc-5sxWlduA6ISgDqLPpli1WVYt66f9Ez8FnVyZ~-BoXmpq1LPZlzNmQMSZLlZ5GhKv3b5BaKFyVPWtXAKz6lnGv-C-tXBSZf0gO1U8any2KbYWbOz18oxOc3MlF7QczBgL6xldy53EYRSpLcEjEzt6iiMM-nTnRCgtMlsmjLfswWvLlJr60zXR51VmRGJugHM5KBOFufdiISQ01QB34GM~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		userName: "Jody Fisher",
		email: "Jodyfisher67@gmail.com",
		reportedDate: "10 Dec, 2021",
		ticketRise: 6,
		newTickets: 2,
		ticketId: "566W077XXXXX ",
		status: 1,
	},
	{
		id: 6,
		profilePic:
			"https://s3-alpha-sig.figma.com/img/7186/0bb9/83519de3e0d5db342a52011d2ec9bcee?Expires=1699228800&Signature=QkGp~rUP5FolMsr8kdfW0acP-ENPBC6b6EBAd2O-V5zephPt6VLEURzT62Rqjel95tpATmupeewGkw11GKcSojaWER8dp166I8AnE9TdfsRsO9ZijN-PHe4-Ta1dx7zc-5sxWlduA6ISgDqLPpli1WVYt66f9Ez8FnVyZ~-BoXmpq1LPZlzNmQMSZLlZ5GhKv3b5BaKFyVPWtXAKz6lnGv-C-tXBSZf0gO1U8any2KbYWbOz18oxOc3MlF7QczBgL6xldy53EYRSpLcEjEzt6iiMM-nTnRCgtMlsmjLfswWvLlJr60zXR51VmRGJugHM5KBOFufdiISQ01QB34GM~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		userName: "Cody Fisher",
		email: "Codyfisher67@gmail.com",
		reportedDate: "10 Dec, 2021",
		ticketRise: 6,
		newTickets: 2,
		ticketId: "566W077XXXXX ",
		status: 0,
	},
	{
		id: 7,
		profilePic:
			"https://s3-alpha-sig.figma.com/img/7186/0bb9/83519de3e0d5db342a52011d2ec9bcee?Expires=1699228800&Signature=QkGp~rUP5FolMsr8kdfW0acP-ENPBC6b6EBAd2O-V5zephPt6VLEURzT62Rqjel95tpATmupeewGkw11GKcSojaWER8dp166I8AnE9TdfsRsO9ZijN-PHe4-Ta1dx7zc-5sxWlduA6ISgDqLPpli1WVYt66f9Ez8FnVyZ~-BoXmpq1LPZlzNmQMSZLlZ5GhKv3b5BaKFyVPWtXAKz6lnGv-C-tXBSZf0gO1U8any2KbYWbOz18oxOc3MlF7QczBgL6xldy53EYRSpLcEjEzt6iiMM-nTnRCgtMlsmjLfswWvLlJr60zXR51VmRGJugHM5KBOFufdiISQ01QB34GM~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		userName: "Cody Fisher",
		email: "Codyfisher67@gmail.com",
		reportedDate: "10 Dec, 2021",
		ticketRise: 6,
		newTickets: 2,
		ticketId: "566W077XXXXX ",
		status: 1,
	},
	{
		id: 8,
		profilePic:
			"https://s3-alpha-sig.figma.com/img/7186/0bb9/83519de3e0d5db342a52011d2ec9bcee?Expires=1699228800&Signature=QkGp~rUP5FolMsr8kdfW0acP-ENPBC6b6EBAd2O-V5zephPt6VLEURzT62Rqjel95tpATmupeewGkw11GKcSojaWER8dp166I8AnE9TdfsRsO9ZijN-PHe4-Ta1dx7zc-5sxWlduA6ISgDqLPpli1WVYt66f9Ez8FnVyZ~-BoXmpq1LPZlzNmQMSZLlZ5GhKv3b5BaKFyVPWtXAKz6lnGv-C-tXBSZf0gO1U8any2KbYWbOz18oxOc3MlF7QczBgL6xldy53EYRSpLcEjEzt6iiMM-nTnRCgtMlsmjLfswWvLlJr60zXR51VmRGJugHM5KBOFufdiISQ01QB34GM~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		userName: "Cody Fisher",
		email: "Codyfisher67@gmail.com",
		reportedDate: "10 Dec, 2021",
		ticketRise: 6,
		newTickets: 2,
		ticketId: "566W077XXXXX ",
		status: 1,
	},
	{
		id: 9,
		profilePic:
			"https://s3-alpha-sig.figma.com/img/7186/0bb9/83519de3e0d5db342a52011d2ec9bcee?Expires=1699228800&Signature=QkGp~rUP5FolMsr8kdfW0acP-ENPBC6b6EBAd2O-V5zephPt6VLEURzT62Rqjel95tpATmupeewGkw11GKcSojaWER8dp166I8AnE9TdfsRsO9ZijN-PHe4-Ta1dx7zc-5sxWlduA6ISgDqLPpli1WVYt66f9Ez8FnVyZ~-BoXmpq1LPZlzNmQMSZLlZ5GhKv3b5BaKFyVPWtXAKz6lnGv-C-tXBSZf0gO1U8any2KbYWbOz18oxOc3MlF7QczBgL6xldy53EYRSpLcEjEzt6iiMM-nTnRCgtMlsmjLfswWvLlJr60zXR51VmRGJugHM5KBOFufdiISQ01QB34GM~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		userName: "Cody Fisher",
		email: "Codyfisher67@gmail.com",
		reportedDate: "10 Dec, 2021",
		ticketRise: 6,
		newTickets: 2,
		ticketId: "566W077XXXXX ",
		status: 1,
	},
	{
		id: 10,
		profilePic:
			"https://s3-alpha-sig.figma.com/img/7186/0bb9/83519de3e0d5db342a52011d2ec9bcee?Expires=1699228800&Signature=QkGp~rUP5FolMsr8kdfW0acP-ENPBC6b6EBAd2O-V5zephPt6VLEURzT62Rqjel95tpATmupeewGkw11GKcSojaWER8dp166I8AnE9TdfsRsO9ZijN-PHe4-Ta1dx7zc-5sxWlduA6ISgDqLPpli1WVYt66f9Ez8FnVyZ~-BoXmpq1LPZlzNmQMSZLlZ5GhKv3b5BaKFyVPWtXAKz6lnGv-C-tXBSZf0gO1U8any2KbYWbOz18oxOc3MlF7QczBgL6xldy53EYRSpLcEjEzt6iiMM-nTnRCgtMlsmjLfswWvLlJr60zXR51VmRGJugHM5KBOFufdiISQ01QB34GM~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		userName: "Cody Fisher",
		email: "Codyfisher67@gmail.com",
		reportedDate: "10 Dec, 2021",
		ticketRise: 6,
		newTickets: 2,
		ticketId: "566W077XXXXX ",
		status: 1,
	},
	{
		id: 11,
		profilePic:
			"https://s3-alpha-sig.figma.com/img/7186/0bb9/83519de3e0d5db342a52011d2ec9bcee?Expires=1699228800&Signature=QkGp~rUP5FolMsr8kdfW0acP-ENPBC6b6EBAd2O-V5zephPt6VLEURzT62Rqjel95tpATmupeewGkw11GKcSojaWER8dp166I8AnE9TdfsRsO9ZijN-PHe4-Ta1dx7zc-5sxWlduA6ISgDqLPpli1WVYt66f9Ez8FnVyZ~-BoXmpq1LPZlzNmQMSZLlZ5GhKv3b5BaKFyVPWtXAKz6lnGv-C-tXBSZf0gO1U8any2KbYWbOz18oxOc3MlF7QczBgL6xldy53EYRSpLcEjEzt6iiMM-nTnRCgtMlsmjLfswWvLlJr60zXR51VmRGJugHM5KBOFufdiISQ01QB34GM~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		userName: "Cody Fisher",
		email: "Codyfisher67@gmail.com",
		reportedDate: "10 Dec, 2021",
		ticketRise: 6,
		newTickets: 2,
		ticketId: "566W077XXXXX ",
		status: 1,
	},
	{
		id: 12,
		profilePic:
			"https://s3-alpha-sig.figma.com/img/7186/0bb9/83519de3e0d5db342a52011d2ec9bcee?Expires=1699228800&Signature=QkGp~rUP5FolMsr8kdfW0acP-ENPBC6b6EBAd2O-V5zephPt6VLEURzT62Rqjel95tpATmupeewGkw11GKcSojaWER8dp166I8AnE9TdfsRsO9ZijN-PHe4-Ta1dx7zc-5sxWlduA6ISgDqLPpli1WVYt66f9Ez8FnVyZ~-BoXmpq1LPZlzNmQMSZLlZ5GhKv3b5BaKFyVPWtXAKz6lnGv-C-tXBSZf0gO1U8any2KbYWbOz18oxOc3MlF7QczBgL6xldy53EYRSpLcEjEzt6iiMM-nTnRCgtMlsmjLfswWvLlJr60zXR51VmRGJugHM5KBOFufdiISQ01QB34GM~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		userName: "Cody Fisher",
		email: "Codyfisher67@gmail.com",
		reportedDate: "10 Dec, 2021",
		ticketRise: 6,
		newTickets: 2,
		ticketId: "566W077XXXXX ",
		status: 0,
	},
	{
		id: 13,
		profilePic:
			"https://s3-alpha-sig.figma.com/img/7186/0bb9/83519de3e0d5db342a52011d2ec9bcee?Expires=1699228800&Signature=QkGp~rUP5FolMsr8kdfW0acP-ENPBC6b6EBAd2O-V5zephPt6VLEURzT62Rqjel95tpATmupeewGkw11GKcSojaWER8dp166I8AnE9TdfsRsO9ZijN-PHe4-Ta1dx7zc-5sxWlduA6ISgDqLPpli1WVYt66f9Ez8FnVyZ~-BoXmpq1LPZlzNmQMSZLlZ5GhKv3b5BaKFyVPWtXAKz6lnGv-C-tXBSZf0gO1U8any2KbYWbOz18oxOc3MlF7QczBgL6xldy53EYRSpLcEjEzt6iiMM-nTnRCgtMlsmjLfswWvLlJr60zXR51VmRGJugHM5KBOFufdiISQ01QB34GM~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		userName: "Cody Fisher",
		email: "Codyfisher67@gmail.com",
		reportedDate: "10 Dec, 2021",
		ticketRise: 6,
		newTickets: 2,
		ticketId: "566W077XXXXX ",
		status: 1,
	},
];

function SupportNhelp() {
	const [showDetailPopup, setShowDetailPopup] = useState(false);
	const [activeCardData, setActiveCardData] = useState("");

	const handlePopup = (data) => {
		setActiveCardData({ ...data });
		setShowDetailPopup(true);
	};
	const handleClosePopup = () => {
		setShowDetailPopup(false);
	};
	return (
		<div className={styles.supportSection}>
			<h1>Support & Help</h1>
			<h4>Welcome To Prince College Admin</h4>

			<div className={styles.paymentHistory}>
				<div className={styles.heading}>
					<h2>Recent Users</h2>
				</div>
				<div className={styles.subHeading}>
					<div className={styles.userId}>UserId</div>
					<div className={styles.emailAddress}>Email Address</div>
					<div className={styles.reportDate}>Report Date</div>
					<div className={styles.ticketRise}>Ticket Rise</div>
					<div className={styles.newTickets}>New Tickets</div>
					<div className={styles.ticketId}>Ticket Id</div>
					<div className={styles.action}>Action</div>
				</div>
				<div className={styles.supportCards}>
					{supports && supports.slice(0, 10).map((item) => <SupportCard data={item} handlePopup={handlePopup} key={item.id} />)}
				</div>

				<div className={styles.pagination}>
					<div className={styles.records}>{"Showing 1 t0 100 users in 1 page"}</div>
					<div className={styles.pageButtons}>
						<div className={styles.leftArrow}>
							<img src={leftArrow} alt="" />
						</div>
						<div className={styles.pages}>
							<div className={styles.buttons}>01</div>
							<div className={`${styles.buttons} ${styles.active}`}>02</div>
							<div className={styles.buttons}>03</div>
							<div className={styles.buttons}>04</div>
							<div className={styles.buttons}>05</div>
						</div>
						<div className={styles.rightArrow}>
							<img src={rightArrow} alt="" />
						</div>
					</div>
				</div>
			</div>
			{showDetailPopup && (
				<div className={styles.spopup}>
					<SupportCardPopup data={activeCardData} onClose={handleClosePopup} />
				</div>
			)}
		</div>
	);
}


export default SupportNhelp;
