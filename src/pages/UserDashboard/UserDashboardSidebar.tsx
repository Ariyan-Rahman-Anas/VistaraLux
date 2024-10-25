import { LayoutDashboard, ShoppingBasket } from "lucide-react"
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
                  <Link to={"/"}>Logo</Link>
                  <div className="border mt-8 text-center p-4 ">
                      <div>
                          <img src={photo} alt={name} />
                      </div>
                      <h1>{name} <span>{gender} </span></h1>
                      <p>{email} </p>

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