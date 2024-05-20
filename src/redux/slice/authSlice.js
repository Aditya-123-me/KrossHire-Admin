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
			const user = sessionStorage.getItem("HV_user");
			const token = sessionStorage.getItem("HV_token");

			if (user) state.user = JSON.parse(user);
			if (token) state.token = JSON.parse(token);
		},

		setUser: (state, { payload }) => {
            state.user = payload;
			state.token = payload.token.token;
			
            sessionStorage.setItem("HV_user", JSON.stringify(payload));
			sessionStorage.setItem("HV_token", JSON.stringify(payload.token.token));
        },
        
		removeUser: (state) => {
			sessionStorage.removeItem("HV_user");
			sessionStorage.removeItem("HV_token");
			state.user = null;
			state.token = "";
		},
	},
});

export const { fetchFromStorage, setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
