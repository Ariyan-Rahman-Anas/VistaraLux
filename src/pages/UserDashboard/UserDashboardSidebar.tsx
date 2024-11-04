import gUser from "./../../assets/images/profile/g.svg"
import bUser from "./../../assets/images/profile/b.svg"
import nullUser from "./../../assets/images/profile/null.svg"
import { CheckCircle2Icon, CheckCircleIcon, LayoutDashboard, ShoppingBasket } from "lucide-react"
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom"
import { selectAuthenticatedUser } from "../../redux/reducers/userReducer";

const UserDashboardSidebar = () => {

    const user = useSelector(selectAuthenticatedUser);
    const {name, photo, email, gender, role} = user || {} 


    const sideBarLinks = [
        {
            title: "Profile",
            link: "/user/profile",
            icon: <LayoutDashboard size={14} />
        },
        {
            title: "Dashboard",
            link: "/user/dashboard",
            icon: <LayoutDashboard size={14} />
        },
        {
            title: "Orders",
            link: "/user/orders",
            icon: <ShoppingBasket size={14} />
        }
    ]


    const location = useLocation()

  return (
      <div className="aside w-full md:w-[20%] p-4 bg-white h-screen overflow-y-auto ">
          <aside
              className="space-y-5"
          >
              <div className="logo-closer">
                  <div className="text-center underline">
                      <Link to="/" className="text-2xl italic font-semibold text-myBlue dark:text-white">
                          VistaraLux
                      </Link>
                  </div>
                  <div className="mt-8 text-center p-4 ">
                      <div className="h-16 w-16 mx-auto ">
                          <img src={photo?.[0]?.url ? photo?.[0]?.url : gender === "male" ? bUser : gender === "female" ? gUser : nullUser } alt={name}  loading="lazy" className="w-full  h-full rounded-full" />
                      </div>
                      <div className="flex items-center gap-1 ">
                          <h1>{name}</h1>
                          <CheckCircle2Icon size={16}  className="bg-myBlue rounded-full text-white" />
                      </div>
                  </div>
              </div>
              {/* dashboard */}
              <div>
                  <h5 className="subHeading">Dashboard</h5>
                  <ul>
                      {sideBarLinks?.map((link, index) => (
                          <li
                              key={index}
                              className={`${location.pathname.includes(link.link) ? "bg-blue-100 text-myBlue " : ""} p-2 flex items-center gap-2 rounded-md duration-500 `}
                          >
                              <span>{link.icon}</span>
                              <Link
                                  to={link.link}
                              >
                                  {link.title}
                              </Link>
                          </li>
                      ))}
                  </ul>
              </div>
          </aside>
      </div>
  )
}
export default UserDashboardSidebar