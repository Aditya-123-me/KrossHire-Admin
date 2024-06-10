import React, { useEffect, useRef, useState } from "react";
import { FaCamera, FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TagsInput } from "react-tag-input-component";
import { toast } from "react-toastify";
import Loading from "../../components/Hooks/Loading";
import axios from "../../components/Hooks/axios";
import styles from "./Style.module.scss";

const Footer = () => {
	const imageRef1 = useRef();
	const imageRef2 = useRef();
	const imageRef3 = useRef();
	const imageRef4 = useRef();
	const imageRef5 = useRef();
	const [image1, setImage1] = useState(null);
	const [image2, setImage2] = useState(null);
	const [image3, setImage3] = useState(null);
	const [image4, setImage4] = useState(null);
	const [image5, setImage5] = useState(null);
	const [name, setName] = useState("");
	const [profession, setProfession] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [exp, setExp] = useState("");
	const [skills, setSkills] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [reload, setReload] = useState(0);
	const [footerData, setFooterData] = useState({});

	useEffect(() => {
		axios
			.get(`/footer/oneFooter/6655a24b2efcc4ff81abe112`)
			.then(({ data }) => {
				setFooterData(data.data);

				setName(data.data?.name);
				setProfession(data.data?.profession);
				setDescription(data.data?.description);
				setLocation(data.data?.location);
				setExp(data.data?.exp);
				setSkills(data.data?.skills);
			})
			.catch(({ response }) => {
				console.log("Error => ", response);
			});
	}, [reload]);

	const handelSubmit = () => {
		if (!name || !profession || !description || !location || !exp || !skills) return toast.error("Please all data !!");
		setIsLoading(true);

		const formData = new FormData();
		formData.append("id", "6655a24b2efcc4ff81abe112");
		formData.append("name", name);
		if (image1) formData.append("image1", image1);
		if (image2) formData.append("image2", image2);
		if (image3) formData.append("image3", image3);
		if (image4) formData.append("image4", image4);
		if (image5) formData.append("image5", image5);
		formData.append("description", description);
		formData.append("profession", profession);
		formData.append("location", location);
		formData.append("exp", exp);
		formData.append("skills", JSON.stringify(skills));

		axios
			.put(`/footer/create-update`, formData)
			.then(({ data }) => {
				toast.success(data.msg);
				setIsLoading(false);
				setReload(Math.random());
				setFooterData(data.data);
				setName(data.data?.name);
				setProfession(data.data?.profession);
				setDescription(data.data?.description);
				setLocation(data.data?.location);
				setExp(data.data?.exp);
				setSkills(data.data?.skills);
			})
			.catch((response) => {
				if (response.message) toast.error(response.message);
				setIsLoading(false);
				console.log("Error => ", response);
			});
	};

	return (
		<div className={styles.AddDeveloperPopup}>
			<div className={styles.ImageSection}>
				<div className={styles.CardWrapperOuter}>
					<img src={image1 ? URL.createObjectURL(image1) : footerData?.image1} alt="" className={styles.img1} />
					<img src={image3 ? URL.createObjectURL(image3) : footerData?.image3} alt="" className={styles.img2} />
					<img src={image4 ? URL.createObjectURL(image4) : footerData?.image4} alt="" className={styles.img3} />
					<img src={image5 ? URL.createObjectURL(image5) : footerData?.image5} alt="" className={styles.img4} />

					<div className={styles.CardWrapper}>
						<div className={styles.CardWrapperInner}>
							<div className={styles.CardTop}>
								<div className={styles.CardTopLeft}>
									<img src={image2 ? URL.createObjectURL(image2) : footerData?.image2} alt="" />

									<div className={styles.TopContentSection}>
										<div className={styles.NameSection}>
											<h2>{name}</h2>

											<p>
												<FaRegClock />
												{exp} year Exp
											</p>
										</div>

										<div className={styles.DetailsSection}>
											<p>{profession}</p>
											<p>
												<FaLocationDot />
												{location}
											</p>
										</div>
									</div>
								</div>

								<div className={styles.CardTopRight}>{description}</div>
							</div>

							<div className={styles.CardBottom}>
								Skills{" "}
								{skills?.map((s, i) => (
									<p key={i}>{s}</p>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.WrapperContainer}>
				<h2>Add Footer Data</h2>

				<div className={styles.ImageWrapper}>
					<div className={styles.Image}>
						<img src={image1 ? URL.createObjectURL(image1) : footerData?.image1} alt="" />
						<input type="file" ref={imageRef1} onChange={(e) => setImage1(e.target.files[0])} />
						<button onClick={() => imageRef1.current.click()}>
							<FaCamera />
						</button>
					</div>

					<div className={styles.Image}>
						<img src={image2 ? URL.createObjectURL(image2) : footerData?.image2} alt="" />
						<input type="file" ref={imageRef2} onChange={(e) => setImage2(e.target.files[0])} />
						<button onClick={() => imageRef2.current.click()}>
							<FaCamera />
						</button>
					</div>
					<div className={styles.Image}>
						<img src={image3 ? URL.createObjectURL(image3) : footerData?.image3} alt="" />
						<input type="file" ref={imageRef3} onChange={(e) => setImage3(e.target.files[0])} />
						<button onClick={() => imageRef3.current.click()}>
							<FaCamera />
						</button>
					</div>
					<div className={styles.Image}>
						<img src={image4 ? URL.createObjectURL(image4) : footerData?.image4} alt="" />
						<input type="file" ref={imageRef4} onChange={(e) => setImage4(e.target.files[0])} />
						<button onClick={() => imageRef4.current.click()}>
							<FaCamera />
						</button>
					</div>
					<div className={styles.Image}>
						<img src={image5 ? URL.createObjectURL(image5) : footerData?.image5} alt="" />
						<input type="file" ref={imageRef5} onChange={(e) => setImage5(e.target.files[0])} />
						<button onClick={() => imageRef5.current.click()}>
							<FaCamera />
						</button>
					</div>
				</div>

				<div className={styles.InputWrapper}>
					<label>Name</label>
					<input type="text" placeholder="Add Name" value={name} onChange={(e) => setName(e.target.value)} />
				</div>

				<div className={styles.Row}>
					<div className={styles.InputWrapper}>
						<label>Profession</label>
						<input
							type="text"
							placeholder="Add Profession"
							value={profession}
							onChange={(e) => setProfession(e.target.value)}
						/>
					</div>

					<div className={styles.InputWrapper}>
						<label>Experience</label>
						<input
							type="number"
							placeholder="Add Experience [only add year]"
							value={exp}
							onChange={(e) => setExp(e.target.value)}
						/>
					</div>
				</div>

				<div className={styles.InputWrapper}>
					<label>Skills</label>
					<TagsInput value={skills} onChange={setSkills} name="skills" placeHolder="Add Skills" />
					<em>press enter or comma to add new skills</em>
				</div>

				<div className={styles.InputWrapper}>
					<label>Description</label>
					<textarea
						placeholder="Add Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}></textarea>
				</div>

				<div className={styles.InputWrapper}>
					<label>Location</label>
					<input
						type="text"
						placeholder="Add Location"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
				</div>

				<button className={styles.Submit} onClick={handelSubmit}>
					{isLoading ? <Loading color="#fff" /> : "Submit"}
				</button>
			</div>
		</div>
	);
};

export default Footer;
