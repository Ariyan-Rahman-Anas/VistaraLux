import { AlignJustify, ArrowRightLeft, ChartColumn, ChartLine, ChartPie, LayoutDashboard, Orbit, Puzzle, ShoppingBasket, Timer, UsersRound, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

function AdminSidebar() {

    // const [showModal, setShowModal] = useState<boolean>(false)
    // const [phoneActive, setPhoneActive] = useState<boolean>(window.innerWidth < 1100)

    // const resizeHandler = () => {
    //     setPhoneActive(window.innerWidth < 1100);
    // };

    // useEffect(() => {
    //     window.addEventListener("resize", resizeHandler);

    //     return () => {
    //         window.removeEventListener("resize", resizeHandler);
    //     };
    // }, []);


    const dashboardLinks = [
        {
            title: "Dashboard",
            link: "/admin/dashboard",
            icon: <LayoutDashboard size={14} />
        },
        {
            title: "Products",
            link: "/admin/products",
            icon: <ShoppingBasket size={14} />
        },
        {
            title: "Customers",
            link: "/admin/customers",
            icon: <UsersRound size={14} />
        },
        {
            title: "Transactions",
            link: "/admin/transactions",
            icon: <ArrowRightLeft size={14} />
        }
    ]

    const chartsLinks = [
        {
            title: "Bar",
            link: "/admin/bar",
            icon: <ChartColumn size={14} />
        },
        {
            title: "Pie",
            link: "/admin/pie",
            icon: <ChartPie size={14} />
        },
        {
            title: "Line",
            link: "/admin/line",
            icon: <ChartLine size={14} />
        }
    ]

    const appsLinks = [
        {
            title: "Toss",
            link: "/admin/toss",
            icon: <Orbit size={14} />
        },
        {
            title: "Coupon",
            link: "/admin/coupon",
            icon: <Puzzle size={14} />
        },
        {
            title: "Stopwatch",
            link: "/admin/stopwatch",
            icon: <Timer size={14} />
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
                    {/* {phoneActive &&
                        <X
                            color="white"
                            id="hamburgerMenuCloser"
                            onClick={() => setShowModal(false)}
                        />} */}
                </div>
                {/* dashboard */}
                <div>
                    <h5 className="subHeading">Dashboard</h5>
                    <ul>
                        {dashboardLinks?.map((link, index) => (
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

                {/* charts */}
                <div>
                    <h5 className="subHeading">Charts</h5>
                    <ul>
                        {chartsLinks?.map((link, index) => (
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


                {/* apps */}
                <div>
                    <h5 className="subHeading">Apps</h5>
                    <ul>
                        {appsLinks?.map((link, index) => (
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

export default AdminSidebar