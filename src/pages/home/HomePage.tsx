import HeroSection from "./HeroSection"
import PopularCategories from "./PopularCategories"
import LatestProducts from "./LatestProducts"
import Categories from "./Categories"

const HomePage = () => {

  return (
    <div className="pt1 space-y-20 ">
      <HeroSection />
      <PopularCategories />

      <Categories />

      <LatestProducts />

    </div>
  )
}

export default HomePage