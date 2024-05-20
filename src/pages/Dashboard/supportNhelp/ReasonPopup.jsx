import React, { useState } from "react";
import lessthan from "../../../../assets/svg/lessThan.svg";
import ticket from "../../../../assets/svg/ticket.svg";
import styles from  "./SupportCardPopup.module.scss";
import ChatPopup from "./ChatPopup";
const data = {
	profilePic:
		"https://s3-alpha-sig.figma.com/img/7186/0bb9/83519de3e0d5db342a52011d2ec9bcee?Expires=1699228800&Signature=QkGp~rUP5FolMsr8kdfW0acP-ENPBC6b6EBAd2O-V5zephPt6VLEURzT62Rqjel95tpATmupeewGkw11GKcSojaWER8dp166I8AnE9TdfsRsO9ZijN-PHe4-Ta1dx7zc-5sxWlduA6ISgDqLPpli1WVYt66f9Ez8FnVyZ~-BoXmpq1LPZlzNmQMSZLlZ5GhKv3b5BaKFyVPWtXAKz6lnGv-C-tXBSZf0gO1U8any2KbYWbOz18oxOc3MlF7QczBgL6xldy53EYRSpLcEjEzt6iiMM-nTnRCgtMlsmjLfswWvLlJr60zXR51VmRGJugHM5KBOFufdiISQ01QB34GM~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
	userName: "Cody Fisher",
	email: "CodyFisher@gmail.com",
	ticketNo: "25625",
	ticketTitle: "server not working",
	active: true,
	ticketDesc:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Senectus morbi eget at eu, porttitor potenti. Magnis faucibus turpis dis ipsum leo nulla bibendum donec. Mi gravida nunc vitae lacus. Semper morbi quis rhoncus gravida. Mi est augue ac faucibus eros, nullam. Pharetra mattis purus pharetra id rhoncus. Vitae enim rhoncus, duis sed purus leo, aliquam augue euismod. Morbi diam, id aenean vitae orci tincidunt tempor. Mauris mauris, dignissim sollicitudin molestie. Vestibulum eu odio odio et. o, aliquam augue euismod. Morbi diam, id aenean vitae orci tincidunt tempor. Mauris mauris, dignissim sollicitudin molestie. Vestibulum eu odio odio et.",
};
function ReasonPopup({ onClose }) {
	const [openChatPopup, setOpenChatPopup] = useState(false);
	const [activeChatId, setActiveChatId] = useState("");

	const handleOpenChatPopup = (data) => {
		setOpenChatPopup(true);
		setActiveChatId(data);
		// onClose();
	};

	const handleCloseChatPopup = () => {
		setOpenChatPopup(false);
	};

	return (
		<>
			<div className={styles.reasonPopupCon}>
				<div className={styles.lessThan}>
					<img src={lessthan} alt="" onClick={onClose} />
				</div>
				<h3>Reason</h3>
				<div className={styles.profile}>
					<div className={styles.profilePic}>
						<img src={data.profilePic} alt="" />
					</div>
					<div className={styles.nameEmail}>
						<h2>{data.userName}</h2>
						<p>{data.email}</p>
					</div>
				</div>
				<div className={styles.details}>
					<div className={styles.upperSection}>
						<div className={styles.left}>
							<div className={styles.ticketNo}>
								<img src={ticket} alt="" />
								<p>Ticket No #{data.ticketNo}</p>
							</div>
							<div className={styles.ticketTitle}>{data.ticketTitle}</div>
						</div>
						<div className={styles.status}>
							{data.active === true ? <div className={styles.active}>active</div> : <div className={styles.closed}>closed</div>}
						</div>
					</div>
					<div className={styles.detailDesc}>{data.ticketDesc}</div>
					<div className={styles.buttons}>
						<div className={styles.chat} onClick={() => handleOpenChatPopup(data.ticketNo)}>
							Chat
						</div>
						<div className={styles.goback} onClick={onClose}>
							Go back
						</div>
					</div>
				</div>
			</div>
			{openChatPopup && (
				<div className={styles.cpopup}>
					<ChatPopup data={activeChatId} onClose={handleCloseChatPopup} />
				</div>
			)}
		</>
	);
}


export default ReasonPopup;
