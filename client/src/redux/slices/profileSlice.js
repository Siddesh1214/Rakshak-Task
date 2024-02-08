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
	testAttempted: localStorage.getItem("testAttempted") ? localStorage.getItem("testAttempted") : false,
	marks: localStorage.getItem("marks") ? localStorage.getItem("marks") : 0,
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
		setTestAttempted(state, value) {
			state.testAttempted = value.payload;
		},
		setMarks(state, value) {
			state.marks = value.payload;
		},
	},
});

export const { setUser, setLoading, setToken, setIsAuthenticated,setTestAttempted,setMarks } =
	profileSlice.actions;
export default profileSlice.reducer;
