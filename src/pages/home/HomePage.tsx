import HeroSection from "./HeroSection"
import PopularCategories from "./PopularCategories"
import LatestProducts from "./LatestProducts"
import SimilarProducts from "../../components/SimilarProducts"
import NewsLetterSubscription from "../../components/NewsLetterSubscription"
import FreshGroceries from "./FreshGroceries"
import MustHaveHouseholds from "./MustHaveHouseholds"
import MansFashion from "./MansFashion"

const HomePage = () => {

  return (
    <div>
      <HeroSection />

      <div className="w-full md:w-[90%] mx-auto px-2 md:px-0 mt-24 space-y-24">

        <PopularCategories />

        <LatestProducts />

        <MansFashion />

        <FreshGroceries />

        <MustHaveHouseholds />



        <SimilarProducts />

        <NewsLetterSubscription />
      </div>
    </div>
  )
}

export default HomePage