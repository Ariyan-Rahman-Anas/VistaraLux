import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userExist, userNotExist } from "./redux/reducers/userReducer";
import axios from "axios";

const App = () => {

  const location = useLocation()
  
  const noHeaderFooter =
    location.pathname.includes("sign-in") ||
    location.pathname.includes("sign-up") ||
    location.pathname.includes("make-payment")
  
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  // useEffect(() => {
  //   const checkUserAuth = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/check-auth`, {
  //         withCredentials: true, 
  //       }); 
  //       if (response.data.user) {
  //         dispatch(userExist(response.data.user));
  //       } else {
  //         dispatch(userNotExist());
  //       }
  //     } catch (error) {
  //       console.error("Error during auth check: ", error.response ? error.response.data : error.message); // More detailed error logging
  //       dispatch(userNotExist());
  //     }
  //   };
  //   checkUserAuth();
  // }, [user, dispatch]);
  

  if (isAuthenticated) {
    // console.log("nice123")
  }
  
  return (
    <div>
      {noHeaderFooter || <Navbar />}
      <Outlet></Outlet>
      {noHeaderFooter || <Footer /> }
    </div>
  )
}
export default App;