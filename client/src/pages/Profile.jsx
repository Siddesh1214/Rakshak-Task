import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Link } from 'react-router-dom';
import { setUser } from "../redux/slices/profileSlice";


function Profile() {

	

	const { user } = useSelector((state) => state.profile);

	return (
		<div>
			<div className="max-w-[1300px]  mx-auto ">
				<div className="mx-auto flex flex-col gap-10 mt-5 border border-red-500">
					<h1 className="text-4xl font-bold text-center uppercase">Profile</h1>
					<div className="flex justify-between items-center ">
						{/* left */}
						<div className="w-[30%] border border-green-500">
							<div className="m-5 p-4 rounded-3xl  border border-yellow-500 bg-slate-400">
								<img
									className="rounded-2xl"
									// src="https://centrechurch.org/wp-content/uploads/2022/03/img-person-placeholder.jpeg"
									src={user?.image}
									alt=""
								/>
							</div>
						</div>

						{/* Right */}
						<div className="w-[70%] p-5 border border-green-500 flex  justify-evenly ">
							<div className="w-1/2 flex flex-col text-xl">
								<div className="flex items-center gap-5">
									<label htmlFor="">First Name</label>
									<span>{user?.firstName}</span>
								</div>
								<div className="flex items-center gap-5">
									<label htmlFor="">Last Name</label>
									<span>{user?.lastName}</span>
								</div>
								<div className="flex items-center gap-5">
									<label htmlFor="">Contact</label>
									<span>+91 {user?.contact}</span>
								</div>
							</div>
							<div className="w-1/2 flex flex-col text-xl">
								<div className="flex items-center gap-5">
									<label htmlFor="">Email</label>
									<span>{user?.email}</span>
								</div>
								<div className="flex items-center gap-5">
									<label htmlFor="">Addresss</label>
									<span>
									{user?.address}
									</span>
								</div>
								<div className="flex items-center gap-5">
									<label htmlFor="">Contact</label>
									<span>+91 {user?.contact}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="mx-auto">
						<Link to='/editprofile'>
						<button  className="px-6 py-4 text-xl bg-blue-300">
							Edit Profile
						</button>
						 </Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
