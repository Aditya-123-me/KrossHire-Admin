import React from "react";
// import banner from "../../../../assets/images/Banner.png";

import profile from "../../../../assets/images/kevin.png";
import styles from "./AdminProfile.module.scss";
import upload from "../../../../assets/svg/upload.svg";

const data = {
	banner: "https://firebasestorage.googleapis.com/v0/b/hansrajventures-b8dea.appspot.com/o/Used_Images%2FBannerFreeconsultLoginBg%2FBanner.png?alt=media&token=ba9f8abe-164b-4324-8649-7a2ed04c4f98",
	profile,
};

function AdminProfile() {
	return (
		<div className={styles.AdminProfile}>
			<h1>Admin Profile</h1>
			<div className={styles.bannerSection}>
				<div className={styles.banner}>
					<img src={data.banner} alt="" />
				</div>
				<div className={styles.profilePic}>
					<img src={data.profile} alt="" />
					<div className={styles.nameDetails}>
						<h2>{"Kevin Gilbert"}</h2>
						<p>Social Media Admin</p>
					</div>
				</div>
			</div>
			<div className={styles.basicDetailSection}>
				<div className={styles.profilePhoto}>
					<img src={data.profile} alt="" />
					<div className={styles.upload}>
						<img src={upload} alt="" />
						<p>Upload Profile Photo</p>
					</div>
					<div className={styles.warn}>
						<p>
							<span>Remember: </span>For best results, use an image at least 200px by 200px in .jpg or .png format
						</p>
					</div>
				</div>
				<div className={styles.banner}>
					<div className={styles.poster}>
						<img src={data.banner} alt="" />
					</div>
					<div className={styles.details}>
						<div className={styles.upload}>
							<img src={upload} alt="" />
							<p>Upload Profile Photo</p>
						</div>
						<div className={styles.removeBanner}>
							<p>Remove Banner</p>
						</div>
						<div className={styles.warn}>
							<p>
								<span>Remember: </span>For best results, use an image at least 200px by 200px in .jpg or .png format
							</p>
						</div>
					</div>
				</div>
				<div className={styles.basicInfo}></div>
			</div>
		</div>
	);
}

export default AdminProfile;
