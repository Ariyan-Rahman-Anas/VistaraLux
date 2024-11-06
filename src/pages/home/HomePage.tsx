import HeroSection from "./HeroSection"
import PopularCategories from "./PopularCategories"
import LatestProducts from "./LatestProducts"
import SimilarProducts from "../../components/SimilarProducts"
import NewsLetterSubscription from "../../components/NewsLetterSubscription"
import furnitureAdsBg from "./../../assets/images/ads/furni-ads-bg.svg"
import furnitureAdsImg from "./../../assets/images/ads/furni-ads-img.svg"
import { Link } from "react-router-dom"
import FreshGroceries from "./FreshGroceries"

const HomePage = () => {

  return (
    <div className="pt1 space-y20 pb-4  ">
      <HeroSection />

      <div className="w-full md:w-[90%] mx-auto px-2 md:px-0 space-y-20 ">

      
        <PopularCategories />
        
        <LatestProducts />

      <div 
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.0)), url(${furnitureAdsBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius:".5rem"
          }}
          className="shadow hover:shadow-md duration-300 flex flex-col md:flex-row items-center gap-y-4 py-10 p-2"> 

          <div className="flex-1 ">
            <img src={furnitureAdsImg} alt="" />
          </div>
          <div className="flex-1  ">
            <h1 className="text-5xl font-bold">Luxury Furniture</h1>
            <p className="text-3xl font-light my-2 " >Perfect Home Decoration!</p>
            <p className="mb-6 text-sm">Elevate your home with our Luxury Furniture Collection – the perfect blend of style and comfort for a beautifully decorated space!</p>
            <Link to={"/products"} className="primary-btn ">Shop now</Link>
          </div>
      </div>


        <FreshGroceries />

     
      <SimilarProducts />

        <NewsLetterSubscription />
      </div>
    </div>
  )
}

export default HomePage