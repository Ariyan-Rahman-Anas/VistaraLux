import { CircleCheck, Heart, ShoppingCart } from "lucide-react"
import { useLocation } from "react-router-dom"
import payments from "./../../assets/images/payments.svg"
import OrderFeatures from "../../components/OrderFeatures"
import Carousel from "../../components/Carousel"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, getActiveItemsInCart, removeCartItem } from "../../redux/reducers/cartReducer"
import { CartItem } from "../../types/types"
import { toast } from "sonner"
import SimilarProducts from "../../components/SimilarProducts"

const ProductDetails = () => {

    const location = useLocation()
    const product = location?.state?.product
    const { name, category, brand, price, stock, photos, description, createdAt } = product || {}
    console.log("photo", product?.photos)
    const carouselImages = photos?.map(photo => photo?.url)
    console.log("carouselImages", carouselImages)

    const features = ["Secure payment method", "Free Shipping & Fasted Delivery", "100% Money-back guarantee", "24/7 Customer support", "Secure payment method"]


    const dispatch = useDispatch();
    const activeItemsInCart = useSelector(getActiveItemsInCart); // Selector to get the cart items

    const addRemoveToCartHandler = (product: Product) => {
        const isProductInCart = activeItemsInCart.find(item => item._id === product._id);

        // Construct the cart item with all required fields
        const cartItem: CartItem = {
            _id: product._id,
            name: product.name,
            price: product.price,
            photo: product.photos[0].url,
            quantity: 1,
            subtotal: product.price * 1,
            productId: product._id,
            stock: product.stock
        };

        if (cartItem.stock <= 0) {
            return toast.error("Not enough product available in stock, Please try after a few days.");
        }

        if (!isProductInCart) {
            dispatch(addToCart(cartItem));  // Adds to cart and handles all the calculations
            toast.success("Product added to cart.");
        } else {
            dispatch(removeCartItem(cartItem._id));  // Removes from cart and updates total
            toast.error("Product removed from cart.");
        }
    };

    return (
        <div className="p-2 md:p-4 md:pb20  space-y-20">
            <div className="w-full md:w-[90%] mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
                <div className="product-media pt-4 flex-1 ">
                    <Carousel images={carouselImages} />
                    <div className="mt-6 text-sm ">
                        <button className="flex items-center gap-1 secondary-btn ">
                            <Heart /> <span>Add to wishlist</span>
                        </button>
                    </div>
                </div>

                <div className="product-info flex-1 space-y-6 ">
                    <div className="section-grant p-4 md:p-6 ">
                        <h1 className="text-4xl mb-4" >{name}</h1>
                        <div className="flex items-start justify-between font-semibold text-gray-600 ">
                            <div className="space-y-2">
                                <p>Brand: <span className="text-black">{brand}</span> </p>
                                <p>Category: <span className="capitalize text-black ">{category}</span> </p>
                                <p>Release Date: <span className="capitalize text-black">{createdAt.slice(0, 10)}</span> </p>
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
                        <p className="mt-2 mb-10 tracking-wide leading-6 " >{description.slice(0, 200)}...read more</p>
                        <div>
                            {
                                !activeItemsInCart.find((item) => item._id === product._id)
                                    ? <button onClick={() => addRemoveToCartHandler(product)} className="flex items-center gap-3 primary-btn">
                                        <ShoppingCart /><span>Add to Cart</span>
                                    </button>
                                    : <button onClick={() => addRemoveToCartHandler(product)} className="flex items-center gap-3 danger-btn">
                                        <ShoppingCart /><span>Remove to Cart</span>
                                    </button>
                            }
                        </div>
                    </div>

                    <div className="section-grant p-4 space-y-2 ">
                        <h1 className="font-semibold"><span className="text-myBlue text-2xl font-bold " >100%</span> Guaranteed safe checkout</h1>
                        <div>
                            <img src={payments} alt="payment methods" className="w-full h-full" />
                        </div>
                    </div>

                </div>
            </div>

            <div className="description section-grant p-4 w-full md:w-[90%] mx-auto md:p-6 flex flex-col lg:flex-row items-start justify-between gap-10 ">
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