import { useState } from "react"
import { useCategoriesQuery, useSearchProductsQuery } from "../../redux/api/productApi"
import ProductCard from "../../components/ProductCard"
import freshGroceries from "./../../assets/images/ads/fresh-groceries.svg"
import { Link } from "react-router-dom"

const FreshGroceries = () => {

    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    const [minPrice, setMinPrice] = useState(1)
    const [maxPrice, setMaxPrice] = useState(1000000)
    const [category, setCategory] = useState("")
    const [page, setPage] = useState(1)

    const { data: freshGroceriesData } = useCategoriesQuery("")

    console.log("freshGroceriesData", freshGroceriesData)

    const {
        data: searchData,
        isLoading: searchProductsLoading,
        // isSuccess: searchProductsIsSuccess,
        // isError: searchProductsIsError,
        // error: searchProductsError
    } = useSearchProductsQuery({
        search,
        sort,
        category: "groceries",
        page,
        minPrice,
        maxPrice
    })

    console.log("searchData", searchData)

  return (
      <div>
          {/* ads */}
          <div className="shadow hover:shadow-md duration-300 section-gran flex flex-col-reverse md:flex-row items-center gap-y-4 px-2 md:px-0 ">
              <div className=" pb-6 md:p-4">
                  <h1 className="text-5xl font-bold">Looking for fresh Groceries?</h1>
                  <p className="text-sm mt-3 mb-6">Discover the finest selection at VistaraLux – quality you can trust, delivered right to your door!</p>
                  <Link to={"/products"} className="primary-btn ">Shop now</Link>
              </div>
              <div>
                  <img src={freshGroceries} alt="fresh groceries" className="rounded-md h-full w-full " />
              </div>
          </div>
          {/* ..... */}

          <div>
              <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="hidden">
              </select>

              <div className="flex items-center justify-between font-semibold my-3">
                  <h1 className="text-2xl">Groceries</h1>
                  <Link to={"/products"} state={{ category:"groceries"}} className="text-myBlue animate-pulse ">See more →</Link>
             </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                  {
                      searchData && searchData?.products.slice(0,8).map(product => <ProductCard key={product._id} product={product} isLoading={searchProductsLoading} >
                      </ProductCard>)
                  }
              </div>
          </div>
    </div>
  )
}
export default FreshGroceries