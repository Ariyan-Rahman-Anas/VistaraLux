import { Link, useNavigate } from "react-router-dom"
import errorImage from "./../assets/images/errorPage.svg"
import usePageTitle from "../customHooks/usePageTitle";
  
const NotFoundPage = () => {
  usePageTitle('404-Page Not Found');
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-[80vh] text-center text-sm ">
      <div>
        <div className="w-2/3 md:w-1/4 mx-auto ">
          <img src={errorImage} alt="not found page's image" className="h-full w-full" />
        </div>
        <div className="flex items-center justify-center gap-8 mt-1 ">
          <Link to={"/"} className="danger-btn" >Back to Home</Link>
          <button onClick={() => navigate(-1)} className="primary-btn" >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
export default NotFoundPage