import HeroSection from "./HeroSection"
import PopularCategories from "./PopularCategories"
import LatestProducts from "./LatestProducts"
import Categories from "./Categories"
import SimilarProducts from "../../components/SimilarProducts"

const HomePage = () => {

  return (
    <div className="pt1 space-y-20 ">
      <HeroSection />
      <PopularCategories />

      <Categories />

      <LatestProducts />

      <SimilarProducts />

    </div>
  )
}

export default HomePage