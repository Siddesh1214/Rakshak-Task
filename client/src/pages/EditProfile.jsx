import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editProfiler, editProfileDetails } from "../services/authAPIs";
import { setLoading, setUser } from "../redux/slices/profileSlice";
import toast from "react-hot-toast";
import EditProfilePic from "../components/EditProfilePic";



function EditProfile() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { user,token } = useSelector((state) => state.profile);
	// useEffect(() => {
	// 	let { user } = useSelector((state) => state.profile);
		
	// }, [user]);
	const dispatch=useDispatch();
	const submitEditForm = async(data) => {
		console.log('Form Data... ', data);
		console.log('TOKEN--- ', token);

		try {
			
			dispatch(editProfileDetails(data, token));
		} catch (error) {
			console.log("Erroror ", error);

		}


	};
	return (
		<div>
			<div className="max-w-[1300px]  mx-auto ">
				<div className="mx-auto flex flex-col gap-10 mt-5 border border-red-500">
					<h1 className="text-4xl font-bold text-center uppercase">
						Edit Profile
					</h1>

					<div className="flex justify-between items-center ">
						<EditProfilePic></EditProfilePic>

						<div className=" w-[70%]  p-5 border border-green-500 flex  justify-evenly ">
							<form
								action=""
								onSubmit={handleSubmit(submitEditForm)}
								className="flex flex-col items-center gap-10"
							>
								<div className="flex gap-6">
									<div className="flex flex-col text-xl gap-6">
										<div className="flex  items-center gap-4 inp-div">
											<label htmlFor="">First Name</label>
											<input
												type="name"
												id="firstName"
												placeholder="Enter firstname"
												{...register("firstName")}
												defaultValue={user?.firstName}
											/>
										</div>
										<div className="flex  items-center gap-4 inp-div">
											<label htmlFor="">Last Name</label>
											<input
												type="name"
												id="lastName"
												placeholder="Enter lastname"
												{...register("lastName")}
												defaultValue={user?.lastName}

											/>
										</div>
										<div className="flex  items-center gap-4 inp-div">
											<label htmlFor="">Contact</label>
											<input
												type="number"
												id="contact"
												placeholder="Enter contact"
												{...register("contact")}
												defaultValue={user?.contact}

											/>
										</div>
									</div>
									<div className="flex flex-col text-xl gap-6">
										<div className="flex  items-center gap-4 inp-div">
											<label htmlFor="">Email</label>
											<input
												type="email"
												id="email"
												placeholder="Enter email"
												{...register("email")}
												defaultValue={user?.email}

											/>
										</div>
										<div className="flex  items-center gap-4 inp-div">
											<label htmlFor="">Address</label>
											<input
												type="text"
												id="address"
												placeholder="Enter address"
												{...register("address")}
												defaultValue={user?.address}

											/>
										</div>
										{/* <div className="flex  items-center gap-4 inp-div">
											<label htmlFor="">Email</label>
											<input
												type="email"
												id="email"
												placeholder="Enter email"
											/>
										</div> */}
									</div>
								</div>

								<div>
									<button
										className="px-4 py-2 bg-slate-300 text-black rounded"
										type="submit"
									>
										Save Info
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditProfile;

{
	/* <form action="">
							<div className="w-1/2 flex flex-col text-xl">
								<div className="flex items-center gap-5">
									<label htmlFor="">Email</label>
									<input type="email" id="email" placeholder="Enter email" />
								</div>
							</div>
						</form> */
}
