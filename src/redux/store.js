import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import tempSlice from "./slice/tempSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		temp: tempSlice,
	},
});

export default store;
