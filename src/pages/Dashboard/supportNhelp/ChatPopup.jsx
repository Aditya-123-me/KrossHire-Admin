import React from 'react';
import styles from "./SupportCardPopup.module.scss";

function ChatPopup({ onClose }) {
	return (
		<div onClick={onClose} className={styles.chatPopupCon}>
			<div className={styles.headSection}></div>
			<div className={styles.mainSection}></div>
			<div className={styles.typeMessage}></div>
		</div>
	);
}


export default ChatPopup;