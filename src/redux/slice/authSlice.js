import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	token: "",
};

const authSlice = createSlice({
	name: "authSlice",
	initialState,
	reducers: {
		fetchFromStorage: (state) => {
			const user = sessionStorage.getItem("krosshire_user");
			const token = sessionStorage.getItem("krosshire_token");

			if (user) state.user = JSON.parse(user);
			if (token) state.token = JSON.parse(token);
		},

		setUser: (state, { payload }) => {
			state.user = payload.user;
			state.token = payload.token;

			sessionStorage.setItem("krosshire_user", JSON.stringify(payload.user));
			sessionStorage.setItem("krosshire_token", JSON.stringify(payload.token));
		},

		removeUser: (state) => {
			sessionStorage.removeItem("krosshire_user");
			sessionStorage.removeItem("krosshire_token");
			state.user = null;
			state.token = "";
		},
	},
});

export const { fetchFromStorage, setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
