import { CircleCheck, Heart, ShoppingCart } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import payments from "./../../assets/images/payments.svg"
import OrderFeatures from "../../components/OrderFeatures"
import Carousel from "../../components/Carousel"
import { useSelector } from "react-redux"
import { getActiveItemsInCart } from "../../redux/reducers/cartReducer"
import SimilarProducts from "../../components/SimilarProducts"
import { useAddRemoveToCartHandler } from "../../customHooks/useAddRemoveToCartHandler"
import { useAddToWishlistMutation, useAnUserWishlistQuery } from "../../redux/api/wishlistApi"
import { toast } from "sonner"
import { useEffect } from "react"
import { selectAuthenticatedUser } from "../../redux/reducers/userReducer"

const ProductDetails = () => {

    const location = useLocation()
    const product = location?.state?.product
    const { name, category, brand, price, stock, photos, description, createdAt } = product || {}
    const carouselImages = photos?.map(photo => photo?.url)

    const features = ["Secure payment method", "Free Shipping & Fasted Delivery", "100% Money-back guarantee", "24/7 Customer support", "Secure payment method"]

    const user = useSelector(selectAuthenticatedUser);

    const activeItemsInCart = useSelector(getActiveItemsInCart);
    const handleAddRemoveToCart = useAddRemoveToCartHandler(product);

    const [addToWishlist, { data, isSuccess, error }] = useAddToWishlistMutation();
    const { data: anUserWishlist } = useAnUserWishlistQuery(user?._id)
    const activeItemsInWishlist = anUserWishlist?.wishlist?.products

    const addToWishlistHandler = async (item) => {
        const payload = {
            user: user?._id,
            products: item
        };

        try {
            await addToWishlist(payload);
        } catch (error) {
            toast.error("Failed to add to wishlist");
            console.error("Add to wishlist failed:", error);
        }
    };

    useEffect(() => {
        if (error?.data) {
            toast.error(error?.data?.message);
        }

        if (isSuccess) {
            toast.success(data?.message);
        }
    }, [data?.message, error?.data, isSuccess]);


    return (
        <div className="p-2 md:p-4 md:pb20  space-y-20">
            <div className="w-full md:w-[90%] mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
                <div
                    data-aos="zoom-in-up"
                    data-aos-duration="1000"
                    className="product-media pt-4 flex-1 ">
                    <Carousel images={carouselImages} />
                    <div className="mt-6 text-sm ">
                        {
                            !activeItemsInWishlist?.find(item => item?.productId?._id === product?._id)
                                ?
                                <button onClick={() => addToWishlistHandler(product?._id)} className="flex items-center gap-1 secondary-btn ">
                                    <Heart /> <span>Add to wishlist</span>
                                </button>
                                :
                                <Link to={`/wishlist/${user._id}`} className="flex items-center w-fit gap-1 secondary-btn ">
                                    <Heart color="red" fill="red" /> <span>Check Wishlist</span>
                                </Link>
                        }
                    </div>
                </div>

                <div
                    data-aos="fade-up"
                    data-aos-duration="1000"

                    className="product-info flex-1 space-y-6 ">
                    <div className="section-grant p-4 md:p-6 ">
                        <h1 className="text-4xl mb-4" >{name}</h1>
                        <div className="flex items-start justify-between font-semibold text-gray-600 ">
                            <div className="space-y-2">
                                <p>Brand: <span className="text-black">{brand}</span> </p>
                                <p>Category: <span className="capitalize text-black ">{category}</span> </p>
                                <p>Release Date: <span className="capitalize text-black">{createdAt?.slice(0, 10)}</span> </p>
                            </div>
                            <div className="space-y-2">
                                <p>Availability: <span className={`${stock <= 10 ? "text-myRed" : "text-green-500"}`} >{stock <= 10 ? "Low Stock" : "In Stock"}</span> </p>
                                <p>Seller: <span className="capitalize text-black" >Seller's Name</span> </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 my-7 ">
                            <p className="text-3xl font-semibold text-myBlue">${price}</p>
                            <p className="bg-primary text-white text-xl font-semibold py-2 px-5 rounded-md  " >0% OFF </p>
                        </div>
                        <p className="mt-2 mb-10 tracking-wide leading-6 " >{description?.slice(0, 200)}...read more</p>
                        <div>
                            {
                                !activeItemsInCart.find((item) => item._id === product._id)
                                    ? <button onClick={handleAddRemoveToCart} className="flex items-center gap-3 primary-btn">
                                        <ShoppingCart /><span>Add to Cart</span>
                                    </button>
                                    : <button onClick={handleAddRemoveToCart} className="flex items-center gap-3 danger-btn">
                                        <ShoppingCart /><span>Remove to Cart</span>
                                    </button>
                            }
                        </div>
                    </div>

                    <div
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        className="section-grant p-4 space-y-2 ">
                        <h1 className="font-semibold"><span className="text-myBlue text-2xl font-bold " >100%</span> Guaranteed safe checkout</h1>
                        <div>
                            <img src={payments} alt="payment methods" className="w-full h-full" />
                        </div>
                    </div>
                </div>
            </div>

            <div
                data-aos="fade-up"
                data-aos-duration="1000"
                className="description section-grant p-4 w-full md:w-[90%] mx-auto md:p-6 flex flex-col lg:flex-row items-start justify-between gap-10 ">
                <div className="w-full lg:w-[40%] ">
                    <h1 className="text-xl font-semibold mb-3" >Description</h1>
                    <p>{description} </p>
                </div>

                <div className="flex items-start justify-between w-full lg:w-[60%] ">
                    <div className="w-full font-semibold ">
                        <h1 className="text-xl font-semibold mb-3" >Features</h1>
                        <div className="space-y-4 text-gray-600">
                            {features?.map((feature, index) => <div key={index} className="flex items-center gap-2">
                                <CircleCheck color="blue" />
                                <p>{feature}</p>
                            </div>)}
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-xl font-semibold mb-3" >Shipping Information</h1>
                        <div className="space-y-4 text-gray-600">
                            <p><span className="font-semibold text-black " >Courier:</span> 2-4 days, free shipping</p>
                            <p><span className="font-semibold text-black " >Local shipping:</span> upto one week, additional $19</p>
                            <p><span className="font-semibold text-black " >Ups ground:</span>  6-7 days, free shipping</p>
                            <p><span className="font-semibold text-black " >Ups fallback:</span> 10-12 days, $29</p>
                        </div>
                    </div>
                </div>
            </div>

            <SimilarProducts />

            <OrderFeatures />
        </div>
    )
}
export default ProductDetails