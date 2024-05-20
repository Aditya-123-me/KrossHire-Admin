import React, { useState } from "react";
import styles from "./General.module.scss";

const initialData = {
	title: "Hansraj Ventures",
	desc: "Building A Better Tomorrow We understand that prosperity impacts all aspects of organization. We agree that success is a journey, not a destination. To achieve outstanding outcomes, we constantly aspire to raise the bar for ourselves and our customers. When you collaborate with our team, you’re not only partnering with highly experienced consultants; you’re also collaborating with business leaders and executives whose long-term career achievement is inextricably tied to your company’s success. What’s more? Start your journey to success with Hansraj Ventures.",
	welcomeTitle: "Welcome To Hansraj Ventures",
	welcomeDesc:
		"In This Fiercely Competitive Industry, We Are Prepared To Include The Best Digital Marketing Platforms At Cost-Effective Prices, Making Them Accessible To Small And Mid-Sized Businesses As Well. Hansraj Ventures Provides The Best Management Solutions By Offering Staffing, Recruitment, Sales, Digital Marketing, Marketing And Web Development Services To Improve Your Overall Performance And Conversions.",
	chooseusTitle: "Why You Choose Us ?",
	chooseusDesc:
		"Our Full Fledged Management Service Firm Helps Business Owners To Opt For The Best Services That Will Help Them Grow. At The Same Time, Business Owners Can Boost Their Acquisition Stats, Market Share And Brand Credibility. Hence, We Are At Forefront To Help Business Owners From Around The World By Helping Them With Resources To Choose The Service That Meets Their Specific Requirements. We Also Serve As An Unparalleled Platform For Companies To Put Their Best Foot Forward. Hansraj Ventures, Is A Treasury Of The Globe's Most Prominent, Efficient, And Top-Performing Management Solutions.",
	contactPhone: "+91 75959 74551 / 7979085200",
	contactEmail: "support@hansrajventures.com",
	footerTitle: "Hansraj Ventures",
	footerDesc:
		"The start-up business owners will always think about several ways to boost the business. We at Hansraj Ventures Pvt Ltd will provide the perfect solution for your staff payroll.",
	socialFacebook: "https://facebook.com/Hansraj Ventures",
	socialInsta: "https://instagram.com/Hansraj Ventures",
	socialSkype: "https://skype.com/Hansraj Ventures",
	socialWhatsapp: "https://whatsapp.com/Hansraj Ventures",
	socialTwitter: "https://twitter.com/Hansraj Ventures",
	socialLinkedin: "https://linkedin.com/Hansraj Ventures",
};

function General() {
	const [data, setData] = useState(initialData);
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
		
	};

	return (
		<div className={styles.generalContainer}>
			<button className={styles.save} onClick={isEditing ? handleSaveClick : handleEditClick}>{isEditing ? "Save" : "Edit"}</button>

			<h2>Main section</h2>
			<div className={styles.heroSection}>
				<h2>
					{isEditing ? <input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /> : data.title}
				</h2>
				<p>
					{isEditing ? <textarea value={data.desc} onChange={(e) => setData({ ...data, desc: e.target.value })} /> : data.desc}
				</p>
			</div>

			<h2>Welcome Section </h2>
			<div className={styles.welcomeSection}>
				<h2>
					{isEditing ? (
						<input value={data.welcomeTitle} onChange={(e) => setData({ ...data, welcomeTitle: e.target.value })} />
					) : (
						data.welcomeTitle
					)}
				</h2>
				<p>
					{isEditing ? (
						<textarea value={data.welcomeDesc} onChange={(e) => setData({ ...data, welcomeDesc: e.target.value })} />
					) : (
						data.welcomeDesc
					)}
				</p>
			</div>

			<h2>Choose Us section</h2>
			<div className={styles.chooseusSection}>
				<h2>
					{isEditing ? (
						<input value={data.chooseusTitle} onChange={(e) => setData({ ...data, chooseusTitle: e.target.value })} />
					) : (
						data.chooseusTitle
					)}
				</h2>
				<p>
					{isEditing ? (
						<textarea value={data.chooseusDesc} onChange={(e) => setData({ ...data, chooseusDesc: e.target.value })} />
					) : (
						data.chooseusDesc
					)}
				</p>
			</div>

			<h2>Footer section</h2>
			<div className={styles.footerSection}>
				<h2>
					{isEditing ? (
						<input value={data.footerTitle} onChange={(e) => setData({ ...data, footerTitle: e.target.value })} />
					) : (
						data.footerTitle
					)}
				</h2>
				<p>
					{isEditing ? (
						<textarea value={data.footerDesc} onChange={(e) => setData({ ...data, footerDesc: e.target.value })} />
					) : (
						data.footerDesc
					)}
				</p>
			</div>
			<h2>Social section</h2>
			<div className={styles.socials}>
				<div className={styles.phone}>
					<label>Contact us phone :</label>
					<p>
						{isEditing ? (
							<input value={data.contactPhone} onChange={(e) => setData({ ...data, contactPhone: e.target.value })} />
						) : (
							data.contactPhone
						)}
					</p>
				</div>
				<div className={styles.email}>
					<label>Contact us email :</label>
					<p>
						{isEditing ? (
							<input value={data.contactEmail} onChange={(e) => setData({ ...data, contactEmail: e.target.value })} />
						) : (
							data.contactEmail
						)}
					</p>
				</div>
				<div className={styles.facebook}>
					<label>Contact us Facebook :</label>
					<p>
						{isEditing ? (
							<input value={data.socialFacebook} onChange={(e) => setData({ ...data, socialFacebook: e.target.value })} />
						) : (
							data.socialFacebook
						)}
					</p>
				</div>
				<div className={styles.whatsapp}>
					<label>Contact us Whatsapp :</label>
					<p>
						{isEditing ? (
							<input value={data.socialWhatsapp} onChange={(e) => setData({ ...data, socialWhatsapp: e.target.value })} />
						) : (
							data.socialWhatsapp
						)}
					</p>
				</div>
				<div className={styles.skype}>
					<label>Contact us Skype :</label>
					<p>
						{isEditing ? (
							<input value={data.socialSkype} onChange={(e) => setData({ ...data, socialSkype: e.target.value })} />
						) : (
							data.socialSkype
						)}
					</p>
				</div>
				<div className={styles.instagram}>
					<label>Contact us Instagram :</label>
					<p>
						{isEditing ? (
							<input value={data.socialInsta} onChange={(e) => setData({ ...data, socialInsta: e.target.value })} />
						) : (
							data.socialInsta
						)}
					</p>
				</div>
				<div className={styles.twitter}>
					<label>Contact us Twitter :</label>
					<p>
						{isEditing ? (
							<input value={data.socialTwitter} onChange={(e) => setData({ ...data, socialTwitter: e.target.value })} />
						) : (
							data.socialTwitter
						)}
					</p>
				</div>
				<div className={styles.linkedIn}>
					<label>Contact us Linkedin :</label>
					<p>
						{isEditing ? (
							<input value={data.socialLinkedin} onChange={(e) => setData({ ...data, socialLinkedin: e.target.value })} />
						) : (
							data.socialLinkedin
						)}
					</p>
				</div>
			</div>
		</div>
	);
}

export default General;
