import { useState } from "react"
import { useSearchProductsQuery } from "../../redux/api/productApi"
import ProductCard from "../../components/ProductCard"
import mens from "./../../assets/images/ads/mens.svg"
import { Link } from "react-router-dom"

const MansFashion = () => {

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
        category: "gents",
        page,
        minPrice,
        maxPrice
    })

    return (
        <div>
            {/* ads */}
            <div className="rounded-md shadow hover:shadow-md duration-300 section-gran flex flex-col-reverse md:flex-row items-center justify-between gap-y-4 px-2 md:px-0 ">
                <div className="md:pl-6 lg:pl-8 pb-6 md:p-4 flex-1 ">
                    <h1 className="text-5xl font-bold">Where Style Meets Elegance</h1>
                    <p className="text-sm mt-3 mb-6">Explore a curated collection of fashion where timeless style meets modern elegance, designed to elevate your wardrobe for any occasion.</p>
                    <Link to={"/products"} className="primary-btn ">Shop now</Link>
                </div>
                <div className="flex-1">
                    <img src={mens} alt="fresh groceries" className="rounded-md h-full w-full " />
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
                    <h1 className="text-2xl">Gents </h1>
                    <Link to={"/products"} state={{ category: "gents" }} className="text-myBlue animate-pulse ">See more →</Link>
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
export default MansFashion