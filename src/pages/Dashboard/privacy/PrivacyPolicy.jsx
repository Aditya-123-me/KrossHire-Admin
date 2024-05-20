import React, { useState } from "react";
import styles from "./Privacy.module.scss";
const initialPrivacyText =
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae magni nam, accusamus commodi perspiciatis veritatis pariatur inventore? Recusandae, possimus sequi aspernatur adipisci culpa pariatur hic, tempore saepe molestias, accusamus eaque dolores tenetur? Assumenda dolor est necessitatibus, dicta, beatae impedit aspernatur nihil earum nulla sint quae autem enim error eius vero?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quibusdam laboriosam ad unde blanditiis perspiciatis quos quasi numquam nam tempora veritatis illum fugiat, perferendis animi dolor saepe incidunt magni accusamus officiis dicta maiores aliquam iste asperiores. Officiis facilis eveniet ex quis non temporibus nam earum. Ratione facilis eligendi harum eveniet.";

const initialTermsText =
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae magni nam, accusamus commodi perspiciatis veritatis pariatur inventore? Recusandae, possimus sequi aspernatur adipisci culpa pariatur hic, tempore saepe molestias, accusamus eaque dolores tenetur? Assumenda dolor est necessitatibus, dicta, beatae impedit aspernatur nihil earum nulla sint quae autem enim error eius vero?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quibusdam laboriosam ad unde blanditiis perspiciatis quos quasi numquam nam tempora veritatis illum fugiat, perferendis animi dolor saepe incidunt magni accusamus officiis dicta maiores aliquam iste asperiores. Officiis facilis eveniet ex quis non temporibus nam earum. Ratione facilis eligendi harum eveniet.";

const initialAboutUsText =
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae magni nam, accusamus commodi perspiciatis veritatis pariatur inventore? Recusandae, possimus sequi aspernatur adipisci culpa pariatur hic, tempore saepe molestias, accusamus eaque dolores tenetur? Assumenda dolor est necessitatibus, dicta, beatae impedit aspernatur nihil earum nulla sint quae autem enim error eius vero?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quibusdam laboriosam ad unde blanditiis perspiciatis quos quasi numquam nam tempora veritatis illum fugiat, perferendis animi dolor saepe incidunt magni accusamus officiis dicta maiores aliquam iste asperiores. Officiis facilis eveniet ex quis non temporibus nam earum. Ratione facilis eligendi harum eveniet."; 

function PrivacyPolicy() {
	const [privacy, setPrivacy] = useState(initialPrivacyText);
	const [terms, setTerms] = useState(initialTermsText);
	const [aboutUs, setAboutUs] = useState(initialAboutUsText);

	const [isEditingPrivacy, setIsEditingPrivacy] = useState(false);
	const [isEditingTerms, setIsEditingTerms] = useState(false);
	const [isEditingAboutUs, setIsEditingAboutUs] = useState(false);

	const handleEditPrivacyClick = () => {
		setIsEditingPrivacy(true);
	};

	const handleSavePrivacyClick = () => {
		console.log(privacy);
		setIsEditingPrivacy(false);
	};

	const handleCancelPrivacyClick = () => {
		setPrivacy(initialPrivacyText);
		setIsEditingPrivacy(false);
	};

	const handlePrivacyChange = (event) => {
		setPrivacy(event.target.value);
	};

	const handleEditTermsClick = () => {
		setIsEditingTerms(true);
	};

	const handleSaveTermsClick = () => {
		console.log(terms);
		setIsEditingTerms(false);
	};

	const handleCancelTermsClick = () => {
		setTerms(initialTermsText);
		setIsEditingTerms(false);
	};

	const handleTermsChange = (event) => {
		setTerms(event.target.value);
	};

	const handleEditAboutUsClick = () => {
		setIsEditingAboutUs(true);
	};

	const handleSaveAboutUsClick = () => {
		console.log(aboutUs);
		setIsEditingAboutUs(false);
	};

	const handleCancelAboutUsClick = () => {
		setAboutUs(initialAboutUsText);
		setIsEditingAboutUs(false);
	};

	const handleAboutUsChange = (event) => {
		setAboutUs(event.target.value);
	};

	return (
		<div className={styles.privacyContainer}>
			<h2>Privacy Policy</h2>
			{isEditingPrivacy ? (
				// Editing mode
				<div className={styles.mainItems}>
					<textarea value={privacy} onChange={handlePrivacyChange} />
					<br />
					<div className={styles.actions}>
						<button onClick={handleSavePrivacyClick}>Save</button>
						<button onClick={handleCancelPrivacyClick}>Cancel</button>
					</div>
				</div>
			) : (
				// Display mode
				<div className={styles.mainItems}>
					<p>{privacy}</p>
					<button onClick={handleEditPrivacyClick}>Edit Privacy</button>
				</div>
			)}

			<h2>Terms and Conditions</h2>
			{isEditingTerms ? (
				// Editing mode
				<div className={styles.mainItems}>
					<textarea value={terms} onChange={handleTermsChange} />
					<br />
					<div className={styles.actions}>
						<button onClick={handleSaveTermsClick}>Save</button>
						<button onClick={handleCancelTermsClick}>Cancel</button>
					</div>
				</div>
			) : (
				// Display mode
				<div className={styles.mainItems}>
					<p>{terms}</p>
					<button onClick={handleEditTermsClick}>Edit Terms</button>
				</div>
			)}

			<h2>About Us</h2>
			{isEditingAboutUs ? (
				// Editing mode
				<div className={styles.mainItems}>
					<textarea value={aboutUs} onChange={handleAboutUsChange} />
					<br />
					<div className={styles.actions}>
						<button onClick={handleSaveAboutUsClick}>Save</button>
						<button onClick={handleCancelAboutUsClick}>Cancel</button>
					</div>
				</div>
			) : (
				// Display mode
				<div className={styles.mainItems}>
					<p>{aboutUs}</p>
					<button onClick={handleEditAboutUsClick}>Edit About Us</button>
				</div>
			)}
		</div>
	);
}

export default PrivacyPolicy;

