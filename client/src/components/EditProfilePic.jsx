import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPic } from "../services/authAPIs";

function EditProfilePic() {
  const { user,token } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const dispatch = useDispatch();
  console.log(user?.image);
  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      
    }
  }
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }
  console.log("IMAGE FILE", imageFile);

  const handleFileUpload = () => {
    try {
      console.log("UPLOADING.....");
      setLoading(true);
      
      const formData = new FormData();
      formData.append('displayPic', imageFile);
      console.log('displayPic', imageFile);
      dispatch(updateDisplayPic(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.error(error);

    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);
	return (
		<div className="w-[30%] border border-green-500 flex flex-col items-center">
			<div className="m-5 p-4 rounded-3xl  border border-yellow-500 bg-slate-400">
				<img
					className="rounded-2xl"
					src={previewSource || `${user?.image}`}
					alt=""
				/>
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} />
			
			<button
				className="px-4 py-2 bg-slate-300 text-black rounded"
        type="submit"
        onClick={handleFileUpload}
			>
				{loading ? "Uploading..." : "Save"}
			</button>
		</div>
	);
}

export default EditProfilePic;
