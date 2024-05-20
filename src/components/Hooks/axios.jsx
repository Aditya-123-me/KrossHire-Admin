import axios from "axios";

let token = sessionStorage.getItem("HV_token");
if (token) token = JSON.parse(token);

const Instance = axios.create({
	// baseURL: "http://localhost:3037/api",
	// baseURL: "https://hansraj-ventures-be.vercel.app/api",
	baseURL: "https://hv.rohandev.xyz/api",
	headers: {
		Authorization: token,
	},
});

export default Instance;

// Do this after login
// axios.defaults.headers.Authorization = token
