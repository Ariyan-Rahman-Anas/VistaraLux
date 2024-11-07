import HeroSection from "./HeroSection"
import PopularCategories from "./PopularCategories"
import LatestProducts from "./LatestProducts"
import SimilarProducts from "../../components/SimilarProducts"
import NewsLetterSubscription from "../../components/NewsLetterSubscription"
import FreshGroceries from "./FreshGroceries"
import MustHaveHouseholds from "./MustHaveHouseholds"

const HomePage = () => {

  return (
    <div className="pt1 space-y20 pb-4  ">
      <HeroSection />

      <div className="w-full md:w-[90%] mx-auto px-2 md:px-0 space-y-20 ">


        <PopularCategories />

        <LatestProducts />


        <MustHaveHouseholds />

        <FreshGroceries />


        <SimilarProducts />

        <NewsLetterSubscription />
      </div>
    </div>
  )
}

export default HomePage