import axios from "axios";

let token = sessionStorage.getItem("krosshire_token");
if (token) token = JSON.parse(token);

const Instance = axios.create({
	baseURL: "http://localhost:8521/api",
	// baseURL: "https://krosshire-be.vercel.app/api",
	headers: {
		Authorization: token,
	},
});

export default Instance;

// Do this after login
// axios.defaults.headers.Authorization = token
