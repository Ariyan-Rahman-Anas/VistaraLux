// import { useDispatch, useSelector } from "react-redux";
// import { selectAuthenticatedUser, updateUserProfile } from "../../../redux/reducers/userReducer";
// import { useEffect, useState } from "react";
// import { useUpdateProfileMutation } from "../../../redux/api/userApi";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// const EditProfile = () => {

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         setError,
//         reset,
//     } = useForm();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const user = useSelector(selectAuthenticatedUser);
//     const { name, photo, email, gender, dob, role } = user || {}

//     const [updateProfile,{data, isSuccess, isLoading, error}] = useUpdateProfileMutation()



    // const [preview, setPreview] = useState<string | null>(null);

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setPreview(reader.result as string); // Set the preview image URL
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

//     const handleUpdateProfile = async (formData) => {
//         const payload = {
//             name: formData.name,
//             gender: formData.gender,
//             dob: formData.dob
//         };

//         console.log("payload", payload)

//         try {
//             await updateProfile({ id: user._id, payload });
//             dispatch(updateUserProfile(payload));
//         } catch (error) {
//             toast.error("Failed to update your profile");
//             console.error("profile update failed:", error);
//         }
//     }

//     useEffect(() => {
//         if (error?.data) {
//             toast.error(error?.data?.message, { duration: 3000 });
//         }
//         if (isSuccess) {
//             toast.success(data?.message, { duration: 3000 });
//             navigate("/user/profile")
//         }
//     }, [data?.message, error?.data, isSuccess, navigate])

//   return (
//       <div className="dashboard-container ">
//           <form onSubmit={handleSubmit(handleUpdateProfile)} className="section-grant p-4 mt-4 space-y-4 ">
//               <div className="flex flex-col border-2 w-fit   ">
//                   <label htmlFor="file-input" className="cursor-pointer">
//                       {/* Preview Image */}
//                       <div className="w-32 h-32 rounded-full overflow-hidden bg-primary">
//                           {preview ? (
//                               <img src={preview} alt="Preview" className="w-full h-full object-cover" />
//                           ) : (
//                               <p className="flex items-center justify-center w-full h-full font-semibold">Upload Image</p>
//                           )}
//                       </div>
//                   </label>
//                   {/* File Input */}
//                   <input
//                       type="file"
//                       id="file-input"
//                       accept="image/*"
//                     //   onChange={handleFileChange}
//                       className="hidden"
//                       {...register("photo")}
//                   />
//               </div>
//               <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//                   <div className="grid gap-1  w-full ">
//                       <label htmlFor="email">Email</label>
//                       <input type="text" defaultValue={email} readOnly className="text-input" />
//                   </div>
//                   <div className="grid gap-1 w-full">
//                       <label htmlFor="name">Name</label>
//                       <input type="text" defaultValue={name} placeholder="e.g. Ariyan Rahman Anas" className="text-input"
//                           {...register("name")}
//                       />
//                   </div>
//               </div>
//               <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//                   <div className="grid gap-1 w-full">
//                       <label htmlFor="gender">Gender</label>
//                       <select  className="text-input" defaultValue={gender}
//                           {...register("gender")}
//                       >
//                           <option value="">Select Gender</option>
//                           <option value="male">Male</option>
//                           <option value="female">Female</option>
//                           <option value="third">Third Gender</option>
//                       </select>
//                   </div>
//                   <div className="grid gap-1 w-full">
//                       <label htmlFor="dob">DOB</label>
//                       <input type="date" className="text-input" defaultValue={dob}
//                           {...register("dob")}
//                       />
//                   </div>
//               </div>
//               <button type="submit" disabled={isLoading} className="full-w-btn">
//                   {isLoading ? (
//                       <div className="flex items-center justify-center">
//                           <div className="spinner"></div>
//                           <span>Updating...</span>
//                       </div>
//                   ) : (
//                       "Save Changes"
//                   )}
//               </button>
//           </form>
//       </div>
//   )
// }

// export default EditProfile











import { useDispatch, useSelector } from "react-redux";
import { selectAuthenticatedUser, updateUserProfile } from "../../../redux/reducers/userReducer";
import { useEffect, useState } from "react";
import { useUpdateProfileMutation } from "../../../redux/api/userApi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const EditProfile = () => {
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(selectAuthenticatedUser);
    const { name, photo, email, gender, dob, role } = user || {};

    const [updateProfile, { data, isSuccess, isLoading, error }] = useUpdateProfileMutation();

    // State to store the selected file for preview and submission
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         setSelectedFile(file); // Set the file for upload

    //         // Generate a preview of the image
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setPreview(reader.result as string); // Update preview state with image URL
    //         };
    //         reader.readAsDataURL(file); // Convert file to data URL for preview
    //     }
    // };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file); // Set the file for upload

            // Generate a preview of the image
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string); // Update preview state with image URL
            };
            reader.readAsDataURL(file); // Convert file to data URL for preview
        }
    };

    // const handleUpdateProfile = async (formData) => {
    //     const formDataObj = new FormData();
    //     formDataObj.append("name", formData.name);
    //     formDataObj.append("gender", formData.gender);
    //     formDataObj.append("dob", formData.dob);

    //     console.log("formDataObj", formDataObj)

    //     // Include the photo in FormData if a new one is selected
    //     if (selectedFile) {
    //         formDataObj.append("photo", selectedFile);
    //     }

    //     try {
    //         // Trigger the updateProfile mutation with user ID and formData
    //         await updateProfile({ id: user._id, formDataObj });

    //         // Dispatch the update to Redux state
    //         dispatch(updateUserProfile({ name: formData.name, gender: formData.gender, dob: formData.dob }));
    //     } catch (error) {
    //         toast.error("Failed to update your profile");
    //         console.error("Profile update failed:", error);
    //     }
    // };

    


    const handleUpdateProfile = async (formData) => {
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("gender", formData.gender);
        formDataObj.append("dob", formData.dob);

        if (selectedFile) {
            formDataObj.append("photo", selectedFile); // Add photo if selected
        }

        try {
            // Call the mutation and await the full user data
            const updatedUserData = await updateProfile({ id: user._id, formDataObj }).unwrap();
            console.log("Updated User Data:", updatedUserData); // Debug: Ensure photo is included

            // Dispatch to update Redux state with full user data, including photo
            dispatch(updateUserProfile(updatedUserData?.user));
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Failed to update your profile");
            console.error("Profile update failed:", error);
        }
    };

    
    useEffect(() => {
        if (error?.data) {
            toast.error(error?.data?.message, { duration: 3000 });
        }
        if (isSuccess) {
            toast.success(data?.message, { duration: 3000 });
            navigate("/user/profile");
        }
    }, [data?.message, error?.data, isSuccess, navigate]);

    return (
        <div className="dashboard-container ">
            <form onSubmit={handleSubmit(handleUpdateProfile)} className="section-grant p-4 mt-4 space-y-4">
                <div className="flex flex-col w-fit">
                    <label htmlFor="file-input" className="cursor-pointer">
                        {/* Preview Image */}
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-primary">
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <p className="flex items-center justify-center w-full h-full font-semibold">Upload Image</p>
                            )}
                        </div>

                    </label>
                    {/* File Input */}
                    {/* <input
                        type="file"
                        id="file-input"
                        accept="image/*"
                        className="hidden"
                        {...register("photo")}
                    /> */}

                    <input
                        type="file"
                        id="file-input"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                </div>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="grid gap-1 w-full">
                        <label htmlFor="email">Email</label>
                        <input type="text" defaultValue={email} readOnly className="text-input" />
                    </div>
                    <div className="grid gap-1 w-full">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            defaultValue={name}
                            placeholder="e.g. Ariyan Rahman Anas"
                            className="text-input"
                            {...register("name")}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="grid gap-1 w-full">
                        <label htmlFor="gender">Gender</label>
                        <select
                            className="text-input"
                            defaultValue={gender}
                            {...register("gender")}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="grid gap-1 w-full">
                        <label htmlFor="dob">DOB</label>
                        <input
                            type="date"
                            className="text-input"
                            defaultValue={dob}
                            {...register("dob")}
                        />
                    </div>
                </div>
                <button type="submit" disabled={isLoading} className="primary-btn">
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="spinner"></div>
                            <span>Updating...</span>
                        </div>
                    ) : (
                        "Save Changes"
                    )}
                </button>
            </form>
        </div>
    );
};

export default EditProfile;