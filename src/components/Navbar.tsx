// import {
//     AlignJustify,
//     Heart,
//     Moon,
//     Search,
//     ShoppingCart,
//     SunMedium,
//     UserRound,
//     X,
// } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { useSignOutMutation } from "../redux/api/userApi";
// import { toast } from "sonner";
// import {
//     selectAuthenticatedUser,
//     userNotExist,
// } from "../redux/reducers/userReducer";
// import { getActiveItemsLengthInCart } from "../redux/reducers/cartReducer";
// import { useAnUserWishlistQuery } from "../redux/api/wishlistApi";

// export default function Navbar() {
//     const [signOut, { data, isError, isSuccess, error }] = useSignOutMutation();
//     const location = useLocation();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const navItems = [
//         { title: "Home", route: "/" },
//         { title: "Products", route: "/products" },
//         { title: "About Us", route: "/about" },
//         { title: "Support", route: "/support" },
//     ];

//     const [drawer, setDrawer] = useState(false);
//     const [showDropDown, setShowDropDown] = useState(false);
//     const [theme, setTheme] = useState("light");

//     const toggleTheme = () => {
//         setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//     };

//     const dropdownRef = useRef<HTMLDivElement>(null); // To reference the dropdown
//     // Close dropdown if click is outside of it
//     // / Close dropdown if click is outside of it
//     useEffect(() => {
//         function handleClickOutside(event: MouseEvent) {
//             if (
//                 dropdownRef.current &&
//                 !dropdownRef.current.contains(event.target as Node)
//             ) {
//                 setShowDropDown(false);
//             }
//         }
//         // Bind the event listener
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             // Unbind the event listener on cleanup
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [dropdownRef]);

//     const user = useSelector(selectAuthenticatedUser);
//     const itemCount = useSelector(getActiveItemsLengthInCart);

//     const signOutHandler = () => {
//         signOut();
//     };
//     useEffect(() => {
//         if (isError && error?.data?.message) {
//             toast.error(error.data.message);
//         }
//         if (isSuccess && data?.message) {
//             dispatch(userNotExist());
//             toast.success(data.message);
//             navigate("/sign-in");
//         }
//     }, [isSuccess, isError, navigate, data, dispatch, error]);

//     const { data: wishlistData } = useAnUserWishlistQuery(user?._id);

//     return (
//         <nav className="flex items-end justify-between px-4 py-4 bg-white shadow w-full sticky top-0 z-50 ">
//             {/* Hamburger Icon for mobile (Drawer toggle) */}
//             <div className="flex items-center gap-2 flex-1 ">
//                 <div className="md:hidden">
//                     <AlignJustify
//                         onClick={() => setDrawer(true)}
//                         className="h-8 w-8 text-primary cursor-pointer"
//                     />
//                 </div>

//                 <div className="flex items-center gap-6">
//                     {/* Logo */}
//                     <div>
//                         <Link to="/" className="text-2xl italic font-semibold text-myBlue ">
//                             VistaraLux
//                         </Link>
//                     </div>

//                     {/* Navigation Menu for larger screens (desktop) */}
//                     <div className="hidden md:flex ">
//                         <ul className="flex items-center gap-4">
//                             {navItems.map((item, index) => (
//                                 <li key={index} className=" relative group">
//                                     <NavLink
//                                         to={item.route}
//                                         className={({ isActive }) =>
//                                             isActive && location.pathname === item.route
//                                                 ? "border-b-2 border-b-myBlue rounded-sm text-myBlue duration-500 "
//                                                 : "border-b-2 border-b-transparent duration-500"
//                                         }
//                                     >
//                                         {item.title}
//                                         <span className="absolute left-0 right-0 bottom-0 top-[1.35rem] h-[.14rem] w-full rounded-md bg-myBlue transform scale-x-0 origin-bottom transition-transform group-hover:scale-x-100 duration-300 "></span>
//                                     </NavLink>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>

//             <div className="flex items-center justify-end gap-6 flex-1  ">
//                 <Link to={`/wishlist/${user?._id}`} className="flex relative">
//                     <Heart color="blue" strokeWidth={1.5} />
//                     <p className="absolute -top-5 left-1 bg-myBlue text-white h-6 w-6 flex items-center justify-center text-sm font-semibold rounded-full ">
//                         {wishlistData?.wishlist?.products?.length
//                             ? wishlistData?.wishlist?.products?.length
//                             : 0}
//                     </p>
//                 </Link>
//                 <Link to={"/shopping-cart"} className="flex relative">
//                     <ShoppingCart color="blue" strokeWidth={1.5} />
//                     <p className="absolute -top-5 left-1 bg-myBlue text-white h-6 w-6 flex items-center justify-center text-sm font-semibold rounded-full ">
//                         {itemCount}
//                     </p>
//                 </Link>


//                 <div>
//                     {
//                         user
//                             ? <div className="relative group">
//                                 {/* User Round Icon */}
//                                 <UserRound color="blue" strokeWidth={1.5} />

//                                 {/* Dropdown Menu */}
//                                 <div
//                                     className={`absolute top-7 -right-2 transition-all duration-300 ease-in-out text-white bg-myBlue w-[12rem] h-[10rem] flex flex-col items-start justify-center p-4 rounded-md  shadow-lg opacity-0 translate-y-[-20px] pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto`}
//                                 >
//                                     {user && (
//                                         <>
//                                             {user.role === "admin" ? (
//                                                 <>
//                                                     <Link to={"/user/profile"} className="hover:ml-2 hover:font-semibold duration-300" >Profile</Link>
//                                                     <Link to={"/admin/dashboard"} className="hover:ml-2 hover:font-semibold duration-300" >Admin Dashboard</Link>
//                                                     <hr className="mt-4 border rounded-full w-full border-gray-300  " />
//                                                     <button onClick={signOutHandler} className="hover:ml-2 hover:font-semibold duration-300" >Logout</button>
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                     <Link to={"/user/profile"} className="hover:ml-2 hover:font-semibold duration-300" >Profile</Link>
//                                                     <hr className="mt-4 border rounded-full w-full border-gray-300  " />
//                                                     <button className="hover:ml-2 hover:font-semibold duration-300" onClick={signOutHandler}>Logout</button>
//                                                 </>
//                                             )}
//                                         </>
//                                     )}
//                                 </div>
//                             </div>
//                             : <Link to={"/sign-in"}>
//                                 <UserRound color="blue" strokeWidth={1.5} />
//                             </Link>
//                     }
//                 </div>
//             </div>

//             {/* Drawer (mobile only) */}
//             <div
//                 className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-500 transform ${drawer ? "translate-x-0" : "-translate-x-full"
//                     } z-40 md:hidden`}
//             >
//                 <div className="mt-4 ml-5">
//                     {/* <div className="flex items-center gap-4 mb-4">
//                         <span>Appearance</span>
//                         <div className="flex items-center gap-5 px-1 border rounded-full">
//                             <SunMedium />
//                             <Moon size={18} />
//                         </div>
//                         <X
//                             onClick={() => setDrawer(false)}
//                             className="h-8 w-8 text-primary cursor-pointer"
//                         />
//                     </div> */}
//                     <div className="flex items-center gap-4 mb-4">
//                         <span>Appearance</span>
//                         <div
//                             onClick={toggleTheme}
//                             className="flex items-center gap-1 px-2 py-1 border rounded-full cursor-pointer"
//                         >
//                             <SunMedium />
//                             <Moon />
//                         </div>
//                         <X
//                             onClick={() => setDrawer(false)}
//                             className="h-8 w-8 text-primary cursor-pointer"
//                         />
//                     </div>

//                     {/* Navigation Menu (mobile) */}
//                     <ul className="flex flex-col gap-4">
//                         {navItems.map((item, index) => (
//                             <li key={index} className="relative group">
//                                 <NavLink
//                                     to={item.route}
//                                     className={({ isActive }) =>
//                                         isActive && location.pathname === item.route
//                                             ? "border-b-2 border-b-myBlue rounded-sm text-myBlue duration-500 "
//                                             : "border-b-2 border-b-transparent duration-500"
//                                     }
//                                 >
//                                     {item.title}
//                                     <span className="absolute left-0 right-0 bottom-0 top-[1.35rem] h-[.14rem] w-full rounded-md bg-myBlue transform scale-x-0 origin-bottom transition-transform group-hover:scale-x-100 duration-300 "></span>
//                                 </NavLink>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>

//             {/* Overlay when drawer is open */}
//             {drawer && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 z-30"
//                     onClick={() => setDrawer(false)}
//                 />
//             )}
//         </nav>
//     );
// }









// import {
//     AlignJustify,
//     Heart,
//     Moon,
//     Search,
//     ShoppingCart,
//     SunMedium,
//     UserRound,
//     X,
// } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { useSignOutMutation } from "../redux/api/userApi";
// import { toast } from "sonner";
// import {
//     selectAuthenticatedUser,
//     userNotExist,
// } from "../redux/reducers/userReducer";
// import { getActiveItemsLengthInCart } from "../redux/reducers/cartReducer";
// import { useAnUserWishlistQuery } from "../redux/api/wishlistApi";

// export default function Navbar() {
//     const [signOut, { data, isError, isSuccess, error }] = useSignOutMutation();
//     const location = useLocation();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const navItems = [
//         { title: "Home", route: "/" },
//         { title: "Products", route: "/products" },
//         { title: "About Us", route: "/about" },
//         { title: "Support", route: "/support" },
//     ];

//     const [drawer, setDrawer] = useState(false);
//     const [showDropDown, setShowDropDown] = useState(false);
//     const [theme, setTheme] = useState("light");

//     const toggleTheme = () => {
//         setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//     };

//     const dropdownRef = useRef<HTMLDivElement>(null); // To reference the dropdown

//     // Close dropdown if click is outside of it
//     useEffect(() => {
//         function handleClickOutside(event: MouseEvent) {
//             if (
//                 dropdownRef.current &&
//                 !dropdownRef.current.contains(event.target as Node)
//             ) {
//                 setShowDropDown(false);
//             }
//         }
//         // Bind the event listener
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             // Unbind the event listener on cleanup
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [dropdownRef]);

//     const user = useSelector(selectAuthenticatedUser);
//     const itemCount = useSelector(getActiveItemsLengthInCart);

//     const signOutHandler = () => {
//         signOut();
//     };
    
//     useEffect(() => {
//         if (isError && error?.data?.message) {
//             toast.error(error.data.message);
//         }
//         if (isSuccess && data?.message) {
//             dispatch(userNotExist());
//             toast.success(data.message);
//             navigate("/sign-in");
//         }
//     }, [isSuccess, isError, navigate, data, dispatch, error]);

//     const { data: wishlistData } = useAnUserWishlistQuery(user?._id);

//     return (
//         <nav className="flex items-end justify-between px-4 py-4 bg-white shadow w-full sticky top-0 z-50">
//             {/* Hamburger Icon for mobile (Drawer toggle) */}
//             <div className="flex items-center gap-2 flex-1 ">
//                 <div className="md:hidden">
//                     <AlignJustify
//                         onClick={() => setDrawer(true)}
//                         className="h-8 w-8 text-primary cursor-pointer"
//                     />
//                 </div>

//                 <div className="flex items-center gap-6">
//                     {/* Logo */}
//                     <div>
//                         <Link to="/" className="text-2xl italic font-semibold text-myBlue ">
//                             VistaraLux
//                         </Link>
//                     </div>

//                     {/* Navigation Menu for larger screens (desktop) */}
//                     <div className="hidden md:flex ">
//                         <ul className="flex items-center gap-4">
//                             {navItems.map((item, index) => (
//                                 <li key={index} className=" relative group">
//                                     <NavLink
//                                         to={item.route}
//                                         className={({ isActive }) =>
//                                             isActive && location.pathname === item.route
//                                                 ? "border-b-2 border-b-myBlue rounded-sm text-myBlue duration-500 "
//                                                 : "border-b-2 border-b-transparent duration-500"
//                                         }
//                                     >
//                                         {item.title}
//                                         <span className="absolute left-0 right-0 bottom-0 top-[1.35rem] h-[.14rem] w-full rounded-md bg-myBlue transform scale-x-0 origin-bottom transition-transform group-hover:scale-x-100 duration-300 "></span>
//                                     </NavLink>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>

//             <div className="flex items-center justify-end gap-6 flex-1  ">
//                 <Link to={`/wishlist/${user?._id}`} className="flex relative">
//                     <Heart color="blue" strokeWidth={1.5} />
//                     <p className="absolute -top-5 left-1 bg-myBlue text-white h-6 w-6 flex items-center justify-center text-sm font-semibold rounded-full ">
//                         {wishlistData?.wishlist?.products?.length
//                             ? wishlistData?.wishlist?.products?.length
//                             : 0}
//                     </p>
//                 </Link>
//                 <Link to={"/shopping-cart"} className="flex relative">
//                     <ShoppingCart color="blue" strokeWidth={1.5} />
//                     <p className="absolute -top-5 left-1 bg-myBlue text-white h-6 w-6 flex items-center justify-center text-sm font-semibold rounded-full ">
//                         {itemCount}
//                     </p>
//                 </Link>

//                 <div>
//                     {user ? (
//                         <div className="relative">
//                             {/* User Round Icon with Click Event to Toggle Dropdown */}
//                             <UserRound
//                                 color="blue"
//                                 strokeWidth={1.5}
//                                 onClick={() => setShowDropDown((prev) => !prev)}
//                                 className="cursor-pointer"
//                             />

//                             {/* Dropdown Menu */}
//                             {showDropDown && (
//                                 <div
//                                     ref={dropdownRef}
//                                     className={`absolute top-7 -right-2 transition-all duration-300 ease-in-out text-white bg-myBlue w-[12rem] h-[10rem] flex flex-col items-start justify-center p-4 rounded-md  shadow-lg opacity-100 translate-y-0`}
//                                 >
//                                     {user && (
//                                         <>
//                                             {user.role === "admin" ? (
//                                                 <>
//                                                     <Link to={"/user/profile"} className="hover:ml-2 hover:font-semibold duration-300" >Profile</Link>
//                                                     <Link to={"/admin/dashboard"} className="hover:ml-2 hover:font-semibold duration-300" >Admin Dashboard</Link>
//                                                     <hr className="mt-4 border rounded-full w-full border-gray-300  " />
//                                                     <button onClick={signOutHandler} className="hover:ml-2 hover:font-semibold duration-300" >Logout</button>
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                     <Link to={"/user/profile"} className="hover:ml-2 hover:font-semibold duration-300" >Profile</Link>
//                                                     <hr className="mt-4 border rounded-full w-full border-gray-300  " />
//                                                     <button className="hover:ml-2 hover:font-semibold duration-300" onClick={signOutHandler}>Logout</button>
//                                                 </>
//                                             )}
//                                         </>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <Link to={"/sign-in"}>
//                             <UserRound color="blue" strokeWidth={1.5} />
//                         </Link>
//                     )}
//                 </div>
//             </div>

//             {/* Drawer (mobile only) */}
//             <div
//                 className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-500 transform ${
//                     drawer ? "translate-x-0" : "-translate-x-full"
//                 } z-40 md:hidden`}
//             >
//                 <div className="mt-4 ml-5">
//                     <div className="flex items-center gap-4 mb-4">
//                         <span>Appearance</span>
//                         <div
//                             onClick={toggleTheme}
//                             className="flex items-center gap-1 px-2 py-1 border rounded-full cursor-pointer"
//                         >
//                             <SunMedium />
//                             <Moon />
//                         </div>
//                         <X
//                             onClick={() => setDrawer(false)}
//                             className="h-8 w-8 text-primary cursor-pointer"
//                         />
//                     </div>

//                     {/* Navigation Menu (mobile) */}
//                     <ul className="flex flex-col gap-4">
//                         {navItems.map((item, index) => (
//                             <li key={index} className="relative group">
//                                 <NavLink
//                                     to={item.route}
//                                     className={({ isActive }) =>
//                                         isActive && location.pathname === item.route
//                                             ? "border-b-2 border-b-myBlue rounded-sm text-myBlue duration-500 "
//                                             : "border-b-2 border-b-transparent duration-500"
//                                     }
//                                 >
//                                     {item.title}
//                                     <span className="absolute left-0 right-0 bottom-0 top-[1.35rem] h-[.14rem] w-full rounded-md bg-myBlue transform scale-x-0 origin-bottom transition-transform group-hover:scale-x-100 duration-300 "></span>
//                                 </NavLink>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>

//             {/* Overlay when drawer is open */}
//             {drawer && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 z-30"
//                     onClick={() => setDrawer(false)}
//                 />
//             )}
//         </nav>
//     );
// }











import {
    AlignJustify,
    Heart,
    Moon,
    Search,
    ShoppingCart,
    SunMedium,
    UserRound,
    X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOutMutation } from "../redux/api/userApi";
import { toast } from "sonner";
import {
    selectAuthenticatedUser,
    userNotExist,
} from "../redux/reducers/userReducer";
import { getActiveItemsLengthInCart } from "../redux/reducers/cartReducer";
import { useAnUserWishlistQuery } from "../redux/api/wishlistApi";
import { RootState } from "../redux/store";
import { toggleTheme } from "../redux/reducers/themeReducer"; // Import toggleTheme action

export default function Navbar() {
    const [signOut, { data, isError, isSuccess, error }] = useSignOutMutation();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navItems = [
        { title: "Home", route: "/" },
        { title: "Products", route: "/products" },
        { title: "About Us", route: "/about" },
        { title: "Support", route: "/support" },
    ];

    const [drawer, setDrawer] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // To reference the dropdown

    // Fetching theme state from Redux store
    const theme = useSelector((state: RootState) => state.theme);
    const user = useSelector(selectAuthenticatedUser);
    const itemCount = useSelector(getActiveItemsLengthInCart);

    const toggleThemeHandler = () => {
        dispatch(toggleTheme()); // Dispatch theme toggle action
    };

    // Apply theme class to the root <html> element whenever the theme changes
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    // Close dropdown if click is outside of it
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowDropDown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

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

    const { data: wishlistData } = useAnUserWishlistQuery(user?._id);

    return (
        <nav className="flex items-end justify-between px-4 py-4 bg-white dark:bg-gray-900 shadow w-full sticky top-0 z-50">
            {/* Hamburger Icon for mobile (Drawer toggle) */}
            <div className="flex items-center gap-2 flex-1">
                <div className="md:hidden">
                    <AlignJustify
                        onClick={() => setDrawer(true)}
                        className="h-8 w-8 text-primary cursor-pointer"
                    />
                </div>

                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <div>
                        <Link to="/" className="text-2xl italic font-semibold text-myBlue dark:text-white">
                            VistaraLux
                        </Link>
                    </div>

                    {/* Navigation Menu for larger screens (desktop) */}
                    <div className="hidden md:flex">
                        <ul className="flex items-center gap-4">
                            {navItems.map((item, index) => (
                                <li key={index} className="relative group">
                                    <NavLink
                                        to={item.route}
                                        className={({ isActive }) =>
                                            isActive && location.pathname === item.route
                                                ? "border-b-2 border-b-myBlue rounded-sm text-myBlue dark:text-white duration-500"
                                                : "border-b-2 border-b-transparent text-gray-800 dark:text-gray-300 duration-500"
                                        }
                                    >
                                        {item.title}
                                        <span className="absolute left-0 right-0 bottom-0 top-[1.35rem] h-[.14rem] w-full rounded-md bg-myBlue transform scale-x-0 origin-bottom transition-transform group-hover:scale-x-100 duration-300"></span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-6 flex-1">
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleThemeHandler}
                    className="flex items-center gap-1 px-2 py-1 border rounded-full cursor-pointer"
                    aria-label="Toggle Theme"
                >
                    {theme === "light" ? <SunMedium /> : <Moon />}
                </button>

                {/* Wishlist and Cart Icons */}
                <Link to={`/wishlist/${user?._id}`} className="flex relative">
                    <Heart color="blue" strokeWidth={1.5} />
                    <p className="absolute -top-5 left-1 bg-myBlue text-white h-6 w-6 flex items-center justify-center text-sm font-semibold rounded-full">
                        {wishlistData?.wishlist?.products?.length || 0}
                    </p>
                </Link>
                <Link to={"/shopping-cart"} className="flex relative">
                    <ShoppingCart color="blue" strokeWidth={1.5} />
                    <p className="absolute -top-5 left-1 bg-myBlue text-white h-6 w-6 flex items-center justify-center text-sm font-semibold rounded-full">
                        {itemCount}
                    </p>
                </Link>

                {/* User Icon and Dropdown */}
                <div>
                    {user ? (
                        <div className="relative">
                            <UserRound
                                color="blue"
                                strokeWidth={1.5}
                                onClick={() => setShowDropDown((prev) => !prev)}
                                className="cursor-pointer"
                            />

                            {showDropDown && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute top-7 -right-2 transition-all duration-300 ease-in-out text-white bg-myBlue w-[12rem] h-[10rem] flex flex-col items-start justify-center p-4 rounded-md shadow-lg opacity-100 translate-y-0"
                                >
                                    {user && (
                                        <>
                                            {user.role === "admin" ? (
                                                <>
                                                    <Link to={"/user/profile"} className="hover:ml-2 hover:font-semibold duration-300">Profile</Link>
                                                    <Link to={"/admin/dashboard"} className="hover:ml-2 hover:font-semibold duration-300">Admin Dashboard</Link>
                                                    <hr className="mt-4 border rounded-full w-full border-gray-300" />
                                                    <button onClick={signOutHandler} className="hover:ml-2 hover:font-semibold duration-300">Logout</button>
                                                </>
                                            ) : (
                                                <>
                                                    <Link to={"/user/profile"} className="hover:ml-2 hover:font-semibold duration-300">Profile</Link>
                                                    <hr className="mt-4 border rounded-full w-full border-gray-300" />
                                                    <button onClick={signOutHandler} className="hover:ml-2 hover:font-semibold duration-300">Logout</button>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to={"/sign-in"}>
                            <UserRound color="blue" strokeWidth={1.5} />
                        </Link>
                    )}
                </div>
            </div>

            {/* Drawer (mobile only) */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-500 transform ${drawer ? "translate-x-0" : "-translate-x-full"} z-40 md:hidden`}
            >
                <div className="mt-4 ml-5">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-gray-800 dark:text-gray-200">Appearance</span>
                        <button onClick={toggleThemeHandler} className="flex items-center gap-1 px-2 py-1 border rounded-full cursor-pointer">
                            <SunMedium />
                            <Moon />
                        </button>
                        <X onClick={() => setDrawer(false)} className="h-8 w-8 text-primary cursor-pointer" />
                    </div>

                    {/* Navigation Menu (mobile) */}
                    <ul className="flex flex-col gap-4">
                        {navItems.map((item, index) => (
                            <li key={index} className="relative group">
                                <NavLink
                                    to={item.route}
                                    className={({ isActive }) =>
                                        isActive && location.pathname === item.route
                                            ? "border-b-2 border-b-myBlue rounded-sm text-myBlue dark:text-white duration-500"
                                            : "border-b-2 border-b-transparent text-gray-800 dark:text-gray-300 duration-500"
                                    }
                                >
                                    {item.title}
                                    <span className="absolute left-0 right-0 bottom-0 top-[1.35rem] h-[.14rem] w-full rounded-md bg-myBlue transform scale-x-0 origin-bottom transition-transform group-hover:scale-x-100 duration-300"></span>
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
