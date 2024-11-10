import { useSelector } from "react-redux";
import gUser from "./../../../assets/images/profile/g.svg"
import bUser from "./../../../assets/images/profile/b.svg"
import nullUser from "./../../../assets/images/profile/null.svg"
import gCover from "./../../../assets/images/profile/g-cover.svg"
import bCover from "./../../../assets/images/profile/b-cover.svg"
import nullCover from "./../../../assets/images/profile/null-cover.svg"
import { selectAuthenticatedUser } from "../../../redux/reducers/userReducer";
import { Link } from "react-router-dom";
import { Pen } from "lucide-react";
import usePageTitle from "../../../customHooks/usePageTitle";


const UserProfile = () => {
  usePageTitle("Profile")
  const user = useSelector(selectAuthenticatedUser);
  const { name, photo, email, gender, role } = user || {} 

  console.log("photo", photo?.[0]?.url)

  return (
    <div className="dashboard-container ">
      <div className="section-grant p-4 mt-4  ">
        <div className="relative">
          <div className="w-full h-72 mx-auto bg-blue-100 z10 ">
            <img loading="lazy" src={gender === 'male' ? bCover : gender === 'female' ? gCover : nullCover } alt="user cover picture" className="w-full h-full" />
          </div>
          <Link to={"/user/profile/edit"} className="absolute bottom-2 right-2 flex items-center gap-2 w-fit primary-btn" > <span>Edit Profile   </span> <Pen /></Link>
        </div>
        <div className="rounded-md pt10 -mt-10 ">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="z-50">
              <img src={photo?.[0]?.url ? photo?.[0]?.url : gender === "male" ? bUser : gender === "female" ? gUser : nullUser } alt={name} loading="lazy" className="rounded-full h-40 w-40 " />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">{name}</h1>
              <p>{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default UserProfile