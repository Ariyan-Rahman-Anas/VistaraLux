import { useState } from "react"
import { useCategoriesQuery, useSearchProductsQuery } from "../../redux/api/productApi"
import ProductCard from "../../components/ProductCard"
import { X } from "lucide-react"

const ProductsPage = () => {

    const { data: categoryData } = useCategoriesQuery("")

    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    const [minPrice, setMinPrice] = useState(1)
    const [maxPrice, setMaxPrice] = useState(1000000)
    const [category, setCategory] = useState("")
    const [page, setPage] = useState(1)

    const {
        data: searchData,
        isLoading: searchProductsLoading,
        isSuccess: searchProductsIsSuccess,
        isError: searchProductsIsError,
        error: searchProductsError
    } = useSearchProductsQuery({
        search,
        sort,
        category,
        page,
        minPrice,
        maxPrice
    })


    // console.log("ppppp", searchData)
    const isPrevPage = page > 1;
    const isNextPage = page < searchData?.totalPages;


    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value <= maxPrice) {
            setMinPrice(value);
        }
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= minPrice) {
            setMaxPrice(value);
        }
    };

    const resetFilters = () => {
        setSearch(''); // Clears the search input
        setSort('');   // Resets the sort selection
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 px-2 mt-8 ">
            <aside className="sectiongrant col-span-8 md:col-span-2 p-4 ">
                <div className="flex flex-col gap-1">
                    <label htmlFor="category-name" className="text-sm font-medium">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border py-2 px-4 outline-none rounded-md hover:bg-gray-200 ">
                        <option value="" >All</option>
                        {
                            categoryData && categoryData?.categories?.map((category, index) => <option key={index} value={category} className="capitalize" >{category}</option>)
                        }
                    </select>
                </div>
                <div className="flex flex-col gap-1 mt-4 ">

                    <div className="flex items-center justify-between gap-8">
                        <div>
                            <label htmlFor="minPrice" className=" text-sm font-medium">
                                Min Price
                            </label>
                            <input
                                type="number"
                                id="minPrice"
                                value={minPrice}
                                onChange={handleMinPriceChange}
                                min={0}
                                max={maxPrice}
                                className="border p-2 focus:outline-none rounded-md w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="maxPrice" className=" text-sm font-medium">
                                Max Price
                            </label>
                            <input
                                type="number"
                                id="maxPrice"
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
                                min={minPrice}
                                max={1000000}
                                className=" border p-2 focus:outline-none rounded-md w-full"
                            />
                        </div>
                    </div>
                    {/* ... */}
                </div>
            </aside>
            <main className="sectiongrant col-span-8 md:col-span-6 p-4 ">
                {/* ..... */}
                <div className="flex items-center justify-between flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-1 w-full relative">
                        <label className="text-sm font-semibold">Search</label>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by product name"
                            className="border py-2 px-3 focus:outline-none rounded-md w-full"
                        />

                        {/* X Icon - Shows only when search input has text */}
                        {search && (
                            <X
                                size={20}
                                onClick={() => setSearch('')} // Clears the search input on click
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 p-0.5 cursor-pointer hover:text-white hover:bg-myRed rounded-full duration-300 opacity-100"
                            />
                        )}
                    </div>

                    <div className="flex items-end gap-4">
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-medium">Sort</label>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="border py-2 px-4 outline-none rounded-md hover:bg-gray-200"
                            >
                                <option value="">Default</option>
                                <option value="asc">Price: Low to High</option>
                                <option value="dsc">Price: High to Low</option>
                            </select>
                        </div>
                        <button onClick={resetFilters} className="danger-btn min-w-32">Reset filters</button>
                    </div>
                </div>

                {/* ..... */}

                <div className="my-8 grid grid-cols-1 md:grid-cols-3 place-items-center lg:gridcols-4 gap-6 ">
                    {
                        searchProductsIsSuccess && searchData.products?.length >= 1 && searchData.products?.map(product => <ProductCard key={product._id} product={product} isLoading={searchProductsLoading} />)
                    }
                </div>
                <div className="my-8  flex items-center justify-center text-center w-full " >
                    <h1>
                        {
                            searchProductsIsError && searchProductsError.data.message
                        }
                    </h1>
                </div>

                <div>
                    {
                        searchData && searchData.totalPages > 1 && <>
                            {searchData && searchData.totalPages && (
                                <article className="flex items-center justify-center gap-4">
                                    <button
                                        disabled={!isPrevPage}
                                        onClick={() => setPage((prev) => prev - 1)}
                                        className="primary-btn"
                                    >
                                        Prev
                                    </button>
                                    <span>
                                        {page} of {searchData.totalPages}
                                    </span>
                                    <button
                                        disabled={!isNextPage}
                                        onClick={() => setPage((prev) => prev + 1)}
                                        className="primary-btn"
                                    >
                                        Next
                                    </button>
                                </article>
                            )}
                        </>
                    }
                    
                </div>
            </main>
        </div>
    )
}
export default ProductsPage