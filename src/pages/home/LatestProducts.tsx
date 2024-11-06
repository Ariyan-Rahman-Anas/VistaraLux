import ProductCard from "../../components/ProductCard"
import { useLatestProductsQuery } from "../../redux/api/productApi"

const LatestProducts = () => {

    const { data, isLoading } = useLatestProductsQuery("")

    return (
        <div className="">
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