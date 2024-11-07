import { Link } from 'react-router-dom'
import furnitureAdsBg from "./../../assets/images/ads/furni-ads-bg.svg"
import furnitureAdsImg from "./../../assets/images/ads/furni-ads-img.svg"
import { useState } from 'react'
import { useSearchProductsQuery } from '../../redux/api/productApi'
import ProductCard from '../../components/ProductCard'

const MustHaveHouseholds = () => {

    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    const [minPrice, setMinPrice] = useState(1)
    const [maxPrice, setMaxPrice] = useState(1000000)
    const [category, setCategory] = useState("")
    const [page, setPage] = useState(1)

    const {
        data: searchData,
        isLoading: searchProductsLoading,
        // isSuccess: searchProductsIsSuccess,
        // isError: searchProductsIsError,
        // error: searchProductsError
    } = useSearchProductsQuery({
        search,
        sort,
        category: "household",
        page,
        minPrice,
        maxPrice
    })

  return (
      <div>
          {/* ads */}
          <div
              style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.0)), url(${furnitureAdsBg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: ".5rem"
              }}
              className="shadow hover:shadow-md duration-300 flex flex-col md:flex-row items-center gap-y-4 py-10 p-2">

              <div className="flex-1 ">
                  <img src={furnitureAdsImg} alt="" />
              </div>
              <div className="flex-1  ">
                  <h1 className="text-5xl font-bold">Must-Have Home Essentials</h1>
                  <p className="text-3xl font-light my-2 " >Perfect Home Decoration!</p>
                  <p className="mb-6 text-sm">Elevate your home with our Luxury Furniture Collection – the perfect blend of style and comfort for a beautifully decorated space!</p>
                  <Link to={"/products"} className="primary-btn ">Shop now</Link>
              </div>
          </div>


          <div>
              <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="hidden">
              </select>

              <div className="flex items-center justify-between font-semibold my-3">
                  <h1 className="text-2xl">Home Appliances</h1>
                  <Link to={"/products"} state={{ category: "groceries" }} className="text-myBlue animate-pulse ">See more →</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                  {
                      searchData && searchData?.products.slice(0, 4).map(product => <ProductCard key={product._id} product={product} isLoading={searchProductsLoading} >
                      </ProductCard>)
                  }
              </div>
          </div>

    </div>
  )
}

export default MustHaveHouseholds