import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../assets/images/AcrosstekLogo.png";
import eye from "../../assets/svg/eye.svg";
import axios from "../../components/Hooks/axios";
import { setUser } from "../../redux/slice/authSlice";
import "./Login.scss";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		email: "admimn@gmail.com",
		password: "123@admin",
	});
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (sessionStorage.getItem("krosshire_token")) navigate("/dashboard", { replace: true });
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handlePasswordToggle = () => {
		setPasswordVisible(!passwordVisible);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData.email === "" || formData.password === "") return toast.error("Pleas fill !!");
		setIsLoading(true);

		const raw = {
			email: formData.email,
			password: formData.password,
		};

		axios
			.post("/admin/login", raw)
			.then(({ data }) => {
				if (data.status) {
					toast.success(data.msg);
					setIsLoading(false);
					dispatch(setUser(data.data));
					navigate("/dashboard", { replace: true });
					axios.defaults.headers.Authorization = data.data.token;
				}
			})
			.catch(({ response: { data } }) => {
				setIsLoading(false);
				toast.error(data.message);
			});
	};

	return (
		<div className="LoginContainer">
			<div className="leftSection">
				<div className="iconContainer">
					<div className="logo">
						<img src={Logo} alt="" />
					</div>
					<h3>Welcome To AcrossTek</h3>
				</div>
			</div>

			<div className="rightSection">
				<div className="formCon">
					<h1>Login Admin</h1>
					<form>
						<div className="inputs">
							<div className="inp1">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									name="email"
									id="email"
									placeholder="Email address"
									value={formData.email}
									onChange={handleInputChange}
								/>
							</div>
							<div className="inp2">
								<div className="passwordCon">
									<label htmlFor="password">Password</label>
									<div className="forgot">Forgot Password</div>
								</div>
								<div className="inputCon">
									<input
										type={passwordVisible ? "text" : "password"}
										name="password"
										id="password"
										placeholder="Password"
										value={formData.password}
										onChange={handleInputChange}
									/>
									<div className="eye" onClick={handlePasswordToggle}>
										<img src={eye} alt="" />
									</div>
								</div>
							</div>
						</div>

						<button disabled={isLoading} type="submit" onClick={handleSubmit}>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
