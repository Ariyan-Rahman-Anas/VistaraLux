"use strict";

import { AlignJustify, Heart, Moon, Search, ShoppingCart, SunMedium, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOutMutation } from "../redux/api/userApi";
import { toast } from "sonner";
import { selectAuthenticatedUser, userNotExist } from "../redux/reducers/userReducer";
import { getActiveItemsLengthInCart } from "../redux/reducers/cartReducer";

export default function Navbar() {
    const [signOut, { data, isError, isSuccess, error }] = useSignOutMutation();
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const navItems = [
        { title: "Home", route: "/" },
        { title: "Products", route: "/products" },
        { title: "Blogs", route: "/blogs" },
        { title: "Gossip", route: "/gossip" },
        { title: "Shop", route: "/shop" },
    ];

    const [drawer, setDrawer] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const dropdownRef = useRef<HTMLDivElement>(null); // To reference the dropdown
    // Close dropdown if click is outside of it
    // / Close dropdown if click is outside of it
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropDown(false);
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on cleanup
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const user = useSelector(selectAuthenticatedUser);
    const itemCount = useSelector(getActiveItemsLengthInCart);



    const signOutHandler = () => {
        signOut();
    };
    useEffect(() => {
        if (isError && error?.data?.message) {
            toast.error(error.data.message);
        }
        if (isSuccess && data?.message) {
            dispatch(userNotExist());
            toast.success(data.message);
            navigate("/sign-in");
        }
    }, [isSuccess, isError, navigate, data, dispatch, error]);


    return (
        <nav className="flex items-center justify-between px-4 py-3 bg-white shadow w-full sticky top-0 z-50 ">
            {/* Hamburger Icon for mobile (Drawer toggle) */}
            <div className="flex items-center gap-2 flex-1 ">
                <div className="md:hidden">
                    <AlignJustify
                        onClick={() => setDrawer(true)}
                        className="h-8 w-8 text-primary cursor-pointer"
                    />
                </div>

                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <div>
                        <Link to="/" className="text-2xl font-semibold text-myBlue ">
                            VistaraLux
                        </Link>
                    </div>

                    {/* Navigation Menu for larger screens (desktop) */}
                    <div className="hidden md:flex ">
                        <ul className="flex items-center gap-4">
                            {navItems.map((item, index) => (
                                <li key={index} className=" relative group">
                                    <NavLink
                                        to={item.route}
                                        className={({ isActive }) =>
                                            isActive && location.pathname === item.route
                                                ? "border-b-2 border-b-myBlue rounded-sm text-myBlue duration-500 "
                                                : "border-b-2 border-b-transparent duration-500"
                                        }
                                    >
                                        {item.title}
                                        <span className="absolute left-0 right-0 bottom-0 top-[1.35rem] h-[.14rem] w-full rounded-md bg-myBlue transform scale-x-0 origin-bottom transition-transform group-hover:scale-x-100 duration-300 "></span>
                                    </NavLink>
                                </li>


                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 flex-1  ">
                {/* Search Bar (Hidden on mobile) */}
                <div className="relative hidden md:block w-full">
                    <input
                        type="text"
                        placeholder="Search for products"
                        className="py-2 px-4 rounded-full w-full border-[1.1px] border-myBlue outline-none"
                    />
                    <Search color="blue" strokeWidth={1.5} size={18} className="absolute right-3 top-1/4" />
                </div>


                {/* Icons (Wishlist, Shopping Cart) */}
                <div className="flex items-center gap-4 relative ">
                    <Heart color="blue" strokeWidth={1.5} className="hidden md:block" />
                    <Link to={"/shopping-cart"} className="flex relative">
                        <ShoppingCart color="blue" strokeWidth={1.5} />
                        <p className="absolute -top-5 left-1 bg-myBlue text-white h-6 w-6 flex items-center justify-center text-sm font-semibold rounded-full ">{itemCount}</p>
                    </Link>
                    <UserRound color="blue" strokeWidth={1.5} onClick={() => setShowDropDown(prev => !prev)} />
                    <div
                        ref={dropdownRef}
                        className={`absolute top-8 right-0 transition-all duration-300 transform ${showDropDown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                            } bg-white w-[8rem] h-[8rem] flex flex-col items-start gap-2 p-4 border border-black rounded-md`}>
                        {
                            user ?
                                <>
                                    {
                                        user?.role === "admin" ?
                                            <>
                                                <Link to={"/user/profile"}>Profile</Link>
                                                <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                                                <button onClick={signOutHandler} >Logout </button>
                                            </> :
                                            <>
                                                <Link to={"/user/profile"}>Profile</Link>
                                                <button onClick={signOutHandler} >Logout </button>
                                            </>
                                    }
                                </> : <Link to={"/sign-in"}>Sign in</Link>
                        }
                    </div>
                </div>
            </div>

            {/* Drawer (mobile only) */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-500 transform ${drawer ? "translate-x-0" : "-translate-x-full"} z-40 md:hidden`}
            >
                <div className="mt-4 ml-5">
                    {/* <div className="flex items-center gap-4 mb-4">
                        <span>Appearance</span>
                        <div className="flex items-center gap-5 px-1 border rounded-full">
                            <SunMedium />
                            <Moon size={18} />
                        </div>
                        <X
                            onClick={() => setDrawer(false)}
                            className="h-8 w-8 text-primary cursor-pointer"
                        />
                    </div> */}
                    <div className="flex items-center gap-4 mb-4">
                        <span>Appearance</span>
                        <div onClick={toggleTheme} className="flex items-center gap-1 px-2 py-1 border rounded-full cursor-pointer">
                            <SunMedium />
                            <Moon />
                        </div>
                        <X
                            onClick={() => setDrawer(false)}
                            className="h-8 w-8 text-primary cursor-pointer"
                        />
                    </div>

                    {/* Navigation Menu (mobile) */}
                    <ul className="flex flex-col gap-4">
                        {navItems.map((item, index) => (
                            <li key={index} className="relative group">
                                <NavLink
                                    to={item.route}
                                    className={({ isActive }) =>
                                        isActive && location.pathname === item.route
                                            ? "border-b-2 border-b-myBlue rounded-sm text-myBlue duration-500 "
                                            : "border-b-2 border-b-transparent duration-500"
                                    }
                                >
                                    {item.title}
                                    <span className="absolute left-0 right-0 bottom-0 top-[1.35rem] h-[.14rem] w-full rounded-md bg-myBlue transform scale-x-0 origin-bottom transition-transform group-hover:scale-x-100 duration-300 "></span>
                                </NavLink>
                            </li>


                        ))}
                    </ul>
                </div>
            </div>

            {/* Overlay when drawer is open */}
            {drawer && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setDrawer(false)}
                />
            )}
        </nav>
    );
}