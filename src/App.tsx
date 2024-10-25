import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation()
  const noHeaderFooter =
    location.pathname.includes("sign-in") ||
    location.pathname.includes("sign-up") ||
    location.pathname.includes("make-payment")

  return (
    <div>
      {noHeaderFooter || <Navbar />}
      <Outlet></Outlet>
      {noHeaderFooter || <Footer />}
    </div>
  )
}
export default App;