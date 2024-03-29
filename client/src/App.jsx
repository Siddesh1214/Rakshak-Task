import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import EditProfile from "./pages/EditProfile";
import { useSelector } from "react-redux";
import Quiz from "./pages/Quiz";
import Liscence from "./pages/Liscence";
import UploadDocs from "./pages/UploadDocs";

function App() {
	const { isAuthenticated } = useSelector((state) => state.profile);
	// const { isAuthenticated } = useSelector((state) => state.profile);
	// const { isAuthenticated } = useSelector((state) => state.profile);
	console.log("VALUE OF isAuthenticated---- ", isAuthenticated);
	// const isAuthenticated=localSt/
	return (
		<div className="">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />}></Route>

				

				<Route path="/login" element={<Login />}></Route>
				<Route path="/signup" element={<Signup />}></Route>
				<Route path="/profile" element={isAuthenticated?<Profile/>:<Login/>}></Route>
				<Route path="/editprofile" element={isAuthenticated?<EditProfile/>:<Login/>}></Route>
				<Route path="/quiz" element={isAuthenticated?<Quiz/>:<Login/>}></Route>
				<Route path="/liscence" element={isAuthenticated?<Liscence/>:<Login/>}></Route>
				<Route path="/uploadDocs" element={isAuthenticated?<UploadDocs/>:<Login/>}></Route>



				

			</Routes>
		</div>
	);
}

export default App;
