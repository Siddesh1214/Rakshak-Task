import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import {
	setLoading,
	setUser,
	setToken,
	setIsAuthenticated,
} from "../redux/slices/profileSlice";
import { useDispatch } from "react-redux";

// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = " http://localhost:4000/api/v1";

const LOGIN_API = BASE_URL + "/auth/login";
const SIGNUP_API = BASE_URL + "/auth/signup";
const EDITPROFILE = BASE_URL + "/auth/editProfile";
const CHANGE_PROFILE_PIC = BASE_URL + "/auth/changeProfilePic";
const GET_USER_DATA = BASE_URL + "/user";
const UPLOAD_DOCS = BASE_URL + "/auth/uploadDocs";

// const dispatch = useDispatch();

export const signup = (
	firstName,
	lastName,
	email,
	password,
	contact,
	address
) => {
	return async (dispatch) => {
		const toastId = toast.loading("loading...");
		dispatch(setLoading(true));
		try {
			const res = await apiConnector("POST", SIGNUP_API, {
				firstName,
				lastName,
				email,
				password,
				contact,
				address,
			});
			console.log("RES OF SIGNUP API is...", res);

			toast.success("Signup Successfull");
		} catch (error) {
			console.log("LOGIN API ERROR............", error);
			console.log("RES", error.response.data.message);

			toast.error(error.response.data.message);
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
};

export const login = (email, password, navigate) => {
	return async (dispatch) => {
		const toastId = toast.loading("loading...");
		dispatch(setLoading(true));
		try {
			const res = await apiConnector("POST", LOGIN_API, { email, password });
			console.log("RES OF LOGINAPI is...", res);

			//set user,token
			toast.success(res.data.message);
			dispatch(setToken(res.data.token));
			dispatch(setUser(res.data.user));
			dispatch(setIsAuthenticated(true));
			


			localStorage.setItem('token', JSON.stringify(res.data.token));
			localStorage.setItem('user', JSON.stringify(res.data.user));
			localStorage.setItem('isAuthenticated', true);

			navigate('/profile');
		} catch (error) {
			console.log("LOGIN API ERROR............", error);
			console.log("RES", error.response.data.message);

			toast.error(error.response.data.message);
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
};


export const editProfiler = async (data, token) => {
	// const toastId = toast.loading("Saving Changes..")
	try {
		const res = await apiConnector('POST', EDITPROFILE, data, {
			Authorization: `Bearer ${token}`
		});
		console.log(res);
		console.log("HGFJKD -- ", res.data.data);
		// return (setUser(res.data));
		return res.data.data;
	} catch (error) {
		console.log("UPDATE_PROFILE_API API ERROR............", error);
		toast.error("Could Not Update Profile");
	}
	// toast.dismiss(toastId);

}
export function editProfileDetails(data, token) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		dispatch(setLoading(true));
		try {
			const res = await apiConnector('POST', EDITPROFILE, data, {
				Authorization: `Bearer ${token}`
			});
			console.log(res);
			console.log("HGFJKD -- ", res.data.data);
			dispatch(setUser(res.data.data));
			localStorage.setItem('user', JSON.stringify(res.data.data))
			toast.success("Profile Updated Successfully!");
		} catch (error) {
			console.log("UPDATE_PROFILE_API API ERROR............", error);
			toast.error("Could Not Update Profile");
		}
		dispatch(setLoading(false));

		toast.dismiss(toastId);
	}
}

export function updateDisplayPic(token, formData) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading.....");
		console.log("API FORMDATA ", formData);
		dispatch(setLoading(true));
		try {
			const response = await apiConnector("POST", CHANGE_PROFILE_PIC, formData, {
				'content-type': 'multipart/form-data',
				Authorization:`Bearer ${token}`
			})
			console.log("UPDATE_PROFILE_PIC API RESPONSE......", response);
			console.log("UPDATE_PROFILE_PIC API PICTURE LINE......", response.data.message);
			localStorage.setItem('user', JSON.stringify(response?.data?.data))
			dispatch(setUser(response?.data?.data));

			toast.success("Display Picture Updated Successfully");
		} catch (error) {
			console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
			toast.error("Could Not Update Display Picture");
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	}
}