import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user"))
		: null,
	token: localStorage.getItem("token")
		? JSON.parse(localStorage.getItem("token"))
		: null,
	loading: false,
	marks: 0,
	isAuthenticated: localStorage.getItem("isAuthenticated")
		? localStorage.getItem("isAuthenticated")
		: false,
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setUser(state, value) {
			state.user = value.payload;
		},
		setToken(state, value) {
			state.token = value.payload;
		},
		setLoading(state, value) {
			state.loading = value.payload;
		},
		setIsAuthenticated(state, value) {
			state.isAuthenticated = value.payload;
		},
	},
});

export const { setUser, setLoading, setToken, setIsAuthenticated } =
	profileSlice.actions;
export default profileSlice.reducer;
