import React, { useEffect, useRef, useState } from "react";
import { Circles } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "../../../components/Hooks/axios";
import lessthan from "../../../assets/svg/lessThan.svg";
import styles from "./Team.module.scss";


function Team() {
	const [editableMember, setEditableMember] = useState(null);
	const [newName, setNewName] = useState("");
	const [newImageUrl, setNewImageUrl] = useState("");
	const [imageFile, setImageFile] = useState(null);
	const fileInputRef = useRef(null);
	const [openAddPopup, setOpenAddPopup] = useState(false);
	const [activeTeamId, setActiveTeamId] = useState(null);
	const [allTeams, setAllTeams] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [reload, setReload] = useState(0);

	const handleEditClick = (teamIndex, memberIndex, currentName, currentImageUrl) => {
		setEditableMember({ teamIndex, memberIndex });
		setNewName(currentName);
		setNewImageUrl(currentImageUrl);
	};

	const handleSaveClick = (member, team) => {
		const formData = new FormData();
		formData.append("name", newName);
		formData.append("memberImage", imageFile);

		axios
			.put(`/team/updateContent/${team}/${member}`, formData)
			.then(({ data }) => {
				if (data.status === 1) {
					toast.success("One team member updated successfully !");
					setReload(Math.random());
					setImageFile(null);
					setEditableMember(null);
					setNewName("");
					setNewImageUrl("");
				}
			})
			.catch((e) => console.log(e));
	};

	const handleCancelClick = () => {
		setEditableMember(null);
		setNewName("");
		setNewImageUrl("");
	};

	const handleDeleteClick = (member, team) => {
		const shouldDelete = window.confirm("Are you sure you want to delete this member?");
		if (shouldDelete) {
			axios
				.delete(`/team/deleteContent/${team}/${member}`)
				.then(({ data }) => {
					if (data.status === 1) {
						toast.success("One team member deleted successfully !");
						setReload(Math.random());
					}
				})
				.catch((e) => console.log(e));
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			setNewImageUrl(URL.createObjectURL(file));
			setImageFile(file);
		}
	};

	const handleImageClick = () => {
		fileInputRef.current.click();
	};

	//add new member
	const addNewMember = (teamId) => {
		setActiveTeamId(teamId);
		setOpenAddPopup(true);
	};

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`/team/list`)
			.then(({ data }) => {
				if (data.status === 1) {
					setAllTeams(data.data);
					setIsLoading(false);
				}
			})
			.catch((e) => console.log(e));
	}, [reload]);

	return (
		<div className={styles.teamContainer}>
			{isLoading ? (
				<div className={styles.LoadingContainer}>
					<Circles height="15vh" width="15vh" color="#d59f3b" ariaLabel="circles-loading" visible={true} />
				</div>
			) : (
				allTeams?.map((team, teamIndex) => (
					<div className={styles.teamCard} key={teamIndex}>
						<div className={styles.title}>{team.name}</div>

						<button onClick={() => addNewMember(team._id)}>Add New Member</button>

						<div className={styles.teamMembers}>
							{team.content ? (
								team.content.map((member, memberIndex) => (
									<div className={styles.member} key={memberIndex}>
										{editableMember &&
										editableMember.teamIndex === teamIndex &&
										editableMember.memberIndex === memberIndex ? (
											<>
												<h2>
													<input
														type="text"
														value={newName}
														onChange={(e) => setNewName(e.target.value)}
													/>
												</h2>
												<input
													type="file"
													accept="image/*"
													onChange={(e) => handleImageChange(e)}
													ref={fileInputRef}
													style={{ display: "none" }}
												/>
												{newImageUrl ? (
													<>
														<img
															height={"100px"}
															width={"100px"}
															src={newImageUrl}
															alt="Preview"
															className={styles.preview}
															onClick={() => handleImageClick()}
															style={{ cursor: "pointer" }}
														/>
														<button onClick={() => handleSaveClick(member._id, team._id)}>
															Save
														</button>
														<button onClick={() => handleCancelClick()}>Cancel</button>
													</>
												) : (
													<p>No image selected</p>
												)}
											</>
										) : (
											<>
												<h2>{member.name}</h2>

												<img src={member.img} alt="" height={"100px"} width={"100px"} />

												<button
													onClick={() =>
														handleEditClick(teamIndex, memberIndex, member.name, member.img)
													}>
													Edit
												</button>

												<button onClick={() => handleDeleteClick(member._id, team._id)}>Delete</button>
											</>
										)}
									</div>
								))
							) : (
								<div>No Members Yet</div>
							)}
						</div>
					</div>
				))
			)}

			{openAddPopup && (
				<div className={styles.popupCon}>
					<AddMemberPopup teamId={activeTeamId} setOpenAddPopup={setOpenAddPopup} setReload={setReload} />
				</div>
			)}
		</div>
	);
}

export default Team;

const AddMemberPopup = ({ teamId, setOpenAddPopup, setReload }) => {
	const [formData, setFormData] = useState({
		name: "",
		image: null,
	});

	const imageInputRef = useRef(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (event) => {
		const { name, type } = event.target;

		if (type === "file") {
			const file = event.target.files[0];
			setFormData((prevData) => ({
				...prevData,
				image: file,
			}));

			if (file) {
				setPreviewUrl(URL.createObjectURL(file));
			} else {
				setPreviewUrl(null);
			}
		} else {
			setFormData((prevData) => ({
				...prevData,
				[name]: event.target.value,
			}));
		}
	};

	const handleImageClick = () => {
		imageInputRef.current.click();
	};

	const handleSave = () => {
		if (formData.name === "" || formData.image === null) return toast.warn("Please add all fields !");

		setIsLoading(true);

		const formDataAxios = new FormData();
		formDataAxios.append("name", formData.name);
		formDataAxios.append("memberImage", formData.image);

		axios
			.post(`/team/createContent/${teamId}`, formDataAxios)
			.then(({ data }) => {
				setOpenAddPopup(false);
				setIsLoading(false);
				toast.success("A team member added successfully !");
				setReload(Math.random());
			})
			.catch((e) => console.log(e));
	};

	const handleCancel = () => {
		setFormData({
			name: "",
			image: null,
		});
		setPreviewUrl(null);
		setOpenAddPopup(false);
	};

	return (
		<div className={styles.addMemberCon}>
			<div className={styles.back} onClick={handleCancel}>
				<img src={lessthan} alt="" />
			</div>
			<div className={styles.name}>
				<label htmlFor="name">Name:</label>
				<input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
			</div>
			<label htmlFor="image">Image:</label>
			<div className={styles.imagePreviewCon}>
				<input
					type="file"
					id="image"
					name="image"
					ref={imageInputRef}
					accept="image/*"
					style={{ display: "none" }}
					onChange={handleInputChange}
				/>
				<div className={styles.imagePreview} onClick={handleImageClick}>
					{previewUrl ? <img src={previewUrl} alt="Preview" /> : "Click to choose an image"}
				</div>
			</div>
			<div className={styles.buttons}>
				<button onClick={handleSave} disabled={isLoading}>
					{isLoading ? <Circles height="3vh" width="3vh" color="#d59f3b" ariaLabel="circles-loading" visible={true} /> : "Save"}
				</button>
				<button onClick={handleCancel}>Cancel</button>
			</div>
		</div>
	);
};
