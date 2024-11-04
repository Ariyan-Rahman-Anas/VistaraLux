import HeroSection from "./HeroSection"
import PopularCategories from "./PopularCategories"
import LatestProducts from "./LatestProducts"
import SimilarProducts from "../../components/SimilarProducts"
import NewsLetterSubscription from "../../components/NewsLetterSubscription"

const HomePage = () => {

  return (
    <div className="pt1 space-y-20 pb-4 ">
      <HeroSection />
      <PopularCategories />
      <LatestProducts />
      <SimilarProducts />

      <NewsLetterSubscription />
    </div>
  )
}

export default HomePage