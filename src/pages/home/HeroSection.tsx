import { Link } from "react-router-dom"
import heroImg from "./../../assets/images/cover.svg"

const HeroSection = () => {
    return (
        <div className="w-full ">
            <div className="bo relative w-full h-full ">
                <img
                    src={heroImg}
                    alt="Online shopping platform showcasing seamless e-commerce experience"
                    className="h-full w-full"
                    loading="lazy"
                />
                <div className="absolute top-4 md:top-1/4 left-2 md:left-8 tracking-wider w-2/3 md:w-2/4">
                    <h1 className="text-lg md:text-5xl  font-bold ">
                        Luxury, <br /> <span className="text-myBlue"> Redefined for Today</span>
                    </h1>
                    <p className="text-sm md:text-base font-medium  mt-2 mb-6 md:mt-4 pr-10 hidden md:block ">Discover timeless fashion, refined accessories, and essentials crafted to elevate every moment of your life.</p>
                    <p className="md:hidden mt-2 mb-4 " >Timeless style and essentials to elevate every moment.</p>
                    <Link to={"/products"} className="primary-btn" >Explore Now</Link>
                </div>
            </div>

        </div>
    )
}
export default HeroSection