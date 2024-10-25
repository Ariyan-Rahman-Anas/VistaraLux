import ProductCard from "../../components/ProductCard"
import { useLatestProductsQuery } from "../../redux/api/productApi"

const LatestProducts = () => {

    const { data, isLoading } = useLatestProductsQuery("")
    console.log("products", data)

    return (
        <div className="bg-white mx-2 p-2 md:p-4 w-full lg:w-[92%] lg:mx-auto rounded-md  ">
            <h1 className="heading  ">Latest Products </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                {
                    data && data.products.map(product => <ProductCard key={product._id} product={product} isLoading={isLoading} >
                    </ProductCard>)
                }
            </div>
        </div>
    )
}

export default LatestProducts