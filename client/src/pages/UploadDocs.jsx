import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adharToServer, panToServer } from "../services/authAPIs";

function UploadDocs() {
	const { user, token } = useSelector((state) => state.profile);
	const dispatch = useDispatch();

	const [loadingAdhar, setLoadingAdhar] = useState(false);
	const [loadingPan, setLoadingPan] = useState(false);
	const [imageFileAdhar, setImageFileAdhar] = useState(null);
	const [imageFilePan, setImageFilePan] = useState(null);
	const [previewSourceAdhar, setPreviewSourceAdhar] = useState(null);
	const [previewSourcePan, setPreviewSourcePan] = useState(null);
	// console.log(user?.image);
	const fileInputRefAdhar = useRef(null);
	const fileInputRefPan = useRef(null);

	function handleFileChangeAdhar(e) {
		const file = e.target.files[0];
		if (file) {
			setImageFileAdhar(file);
		}
	}
	function handleFileChangePan(e) {
		const file = e.target.files[0];
		if (file) {
			setImageFilePan(file);
		}
	}

	const previewFileAdhar = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSourceAdhar(reader.result);
		};
	};
	const previewFilePan = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSourcePan(reader.result);
		};
	};

	const handleFileUploadAdhar = () => {
		try {
			console.log("UPLOADING.....");
			setLoadingAdhar(true);

			const formData = new FormData();
			formData.append("adharCard", imageFileAdhar);
			console.log("adharCard", imageFileAdhar);
			dispatch(adharToServer(token, formData)).then(() => {
				setLoadingAdhar(false);
			});
		} catch (error) {
			console.error(error);
		}
	};

	

	const handleFileUploadPan = () => {
		try {
			console.log("UPLOADING.....");
			setLoadingPan(true);

			const formData = new FormData();
			formData.append("panCard", imageFilePan);
			console.log("panCard", imageFilePan);
			dispatch(panToServer(token, formData)).then(() => {
				setLoadingPan(false);
			});
		} catch (error) {
			console.error(error);
		}
  };
  

  useEffect(() => {
		if (imageFileAdhar) {
			previewFileAdhar(imageFileAdhar);
		}
	}, [imageFileAdhar]);
	useEffect(() => {
		if (imageFilePan) {
			previewFilePan(imageFilePan);
		}
	}, [imageFilePan]);

	return (
		<div className="max-w-[1300px] mx-auto border mt-10">
			<div className=" flex flex-col items-center">
				<h1>View Documents</h1>
				<div className="flex items-center w-[70%] justify-evenly">
					<div className="border border-red-600 h-[20rem] w-[20rem] flex items-center flex-col gap-4">
						<h1>Adhar Card</h1>
						<img
							className="w-[250px] h-[250px]"
							src={previewSourceAdhar ? previewSourceAdhar : user.adharCard}
							alt=""
						/>
					</div>
					<div className="border border-red-600 h-[20rem] w-[20rem] flex items-center flex-col gap-4">
						<h1>Pan Card</h1>
            <img
              className="w-[250px] h-[250px]"
							src={previewSourcePan ? previewSourcePan : user.panCard}
							alt=""
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-col items-center mt-20">
				<h1>Uplaod Documents Here</h1>
				<div className="flex gap-10">
					<div className="flex flex-col">
						<input
							type="file"
							ref={fileInputRefAdhar}
							onChange={handleFileChangeAdhar}
						/>
						<button
							className="px-4 py-2 bg-slate-300 text-black rounded"
							type="submit"
							onClick={handleFileUploadAdhar}
						>
							{/* Upload to server */}
							{loadingAdhar ? "Uploading..." : "Upload to server"}
						</button>
					</div>
					<div className="flex flex-col">
						<input
							type="file"
							ref={fileInputRefPan}
							onChange={handleFileChangePan}
						/>
						<button
							className="px-4 py-2 bg-slate-300 text-black rounded"
							type="submit"
							onClick={handleFileUploadPan}
						>
							{loadingPan ? "Uploading..." : "Upload to server"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UploadDocs;
