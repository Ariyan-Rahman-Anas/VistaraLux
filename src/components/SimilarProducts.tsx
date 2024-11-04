import { Eye, Heart, ShoppingCart } from "lucide-react"
import { useAllProductsQuery } from "../redux/api/productApi"
import { Link } from "react-router-dom"
import { CartItem, Product } from "../types/types"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, getActiveItemsInCart, removeCartItem } from "../redux/reducers/cartReducer"
import { toast } from "sonner"


const SimilarProducts = () => {
    const { data, isLoading } = useAllProductsQuery("");
    const dispatch = useDispatch();
    const activeItemsInCart = useSelector(getActiveItemsInCart);

    // Ensure there are enough products to choose from
    const totalProducts = data?.products?.length || 0;
    const startForFlashSell = totalProducts >= 3 ? Math.floor(Math.random() * (totalProducts - 3)) : 0; // Random start point for 3 products

    const startForBestSell = totalProducts >= 3 ? Math.floor(Math.random() * (totalProducts - 3)) : 0; // Random start point for 3 products

    const startForTopRated = totalProducts >= 3 ? Math.floor(Math.random() * (totalProducts - 3)) : 0; // Random start point for 3 products

    const startForNewArrival = totalProducts >= 3 ? Math.floor(Math.random() * (totalProducts - 3)) : 0; // Random start point for 3 products

    const addRemoveToCartHandler = (product: Product) => {
        const isProductInCart = activeItemsInCart.find(item => item._id === product._id);

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
            dispatch(addToCart(cartItem));
            toast.success("Product added to cart.");
        } else {
            dispatch(removeCartItem(cartItem._id));
            toast.error("Product removed from cart.");
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-[90%] mx-auto ">
            <div id="flash-sale-today" >
                <h1 className="text-xl font-semibold mb-3">Flash Sale Today</h1>
                <div className="space-y-4">
                    {data?.products.slice(startForFlashSell, startForFlashSell + 3).map(product => (
                        <div
                            data-aos="zoom-in-up"
                            data-aos-duration="1000"
                            key={product._id} className="section-grant w-full p-4 relative flex items-center justify-center group">
                            <div className="flex items-center justify-start gap-2">
                                <div className="w-1/3">
                                    <img
                                        src={product.photos[0].url}
                                        alt={product.name}
                                        className="h-full w-full object-cover rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold mb-2">{product.name}</h2>
                                    <p className="text-base font-semibold text-blue-500">${product.price}</p>
                                </div>
                            </div>

                            <div className="opacity-0 group-hover:opacity-100 border2 w-full h-full absolute top-0 left-0 duration-500 bg-black/55 rounded-md flex items-center justify-center gap-6">
                                <div className="flex items-center justify-center gap-6 bg-white py-2 px-5 rounded-full">
                                    <Heart color="blue" className="cursor-pointer" />

                                    {!activeItemsInCart.find((item) => item._id === product._id) ? (
                                        <ShoppingCart
                                            color="blue"
                                            onClick={() => addRemoveToCartHandler(product)}
                                            className="cursor-pointer"
                                        />
                                    ) : (
                                        <ShoppingCart
                                            color="red"
                                            fill="red"
                                            onClick={() => addRemoveToCartHandler(product)}
                                            className="cursor-pointer"
                                        />
                                    )}

                                    <Link to={`/products/${product._id}`} state={{ product }}>
                                        <Eye color="blue" className="cursor-pointer" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div id="best-sellers" >
                <h1 className="text-xl font-semibold mb-3">Best Sellers</h1>
                <div className="space-y-4">
                    {data?.products.slice(startForBestSell, startForBestSell + 3).map(product => (
                        <div
                            data-aos="zoom-in-up"
                            data-aos-duration="1000"
                            key={product._id} className="section-grant w-full p-4 relative flex items-center justify-center group">
                            <div className="flex items-center justify-start gap-2">
                                <div className="w-1/3">
                                    <img
                                        src={product.photos[0].url}
                                        alt={product.name}
                                        className="h-full w-full object-cover rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold mb-2">{product.name}</h2>
                                    <p className="text-base font-semibold text-blue-500">${product.price}</p>
                                </div>
                            </div>

                            <div className="opacity-0 group-hover:opacity-100 border2 w-full h-full absolute top-0 left-0 duration-500 bg-black/55 rounded-md flex items-center justify-center gap-6">
                                <div className="flex items-center justify-center gap-6 bg-white py-2 px-5 rounded-full">
                                    <Heart color="blue" className="cursor-pointer" />

                                    {!activeItemsInCart.find((item) => item._id === product._id) ? (
                                        <ShoppingCart
                                            color="blue"
                                            onClick={() => addRemoveToCartHandler(product)}
                                            className="cursor-pointer"
                                        />
                                    ) : (
                                        <ShoppingCart
                                            color="red"
                                            fill="red"
                                            onClick={() => addRemoveToCartHandler(product)}
                                            className="cursor-pointer"
                                        />
                                    )}

                                    <Link to={`/products/${product._id}`} state={{ product }}>
                                        <Eye color="blue" className="cursor-pointer" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div id="top-rated" >
                <h1 className="text-xl font-semibold mb-3">Top Rated</h1>
                <div className="space-y-4">
                    {data?.products.slice(startForTopRated, startForTopRated + 3).map(product => (
                        <div
                            data-aos="zoom-in-up"
                            data-aos-duration="1000"
                            key={product._id} className="section-grant w-full p-4 relative flex items-center justify-center group">
                            <div className="flex items-center justify-start gap-2">
                                <div className="w-1/3">
                                    <img
                                        src={product.photos[0].url}
                                        alt={product.name}
                                        className="h-full w-full object-cover rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold mb-2">{product.name}</h2>
                                    <p className="text-base font-semibold text-blue-500">${product.price}</p>
                                </div>
                            </div>

                            <div className="opacity-0 group-hover:opacity-100 border2 w-full h-full absolute top-0 left-0 duration-500 bg-black/55 rounded-md flex items-center justify-center gap-6">
                                <div className="flex items-center justify-center gap-6 bg-white py-2 px-5 rounded-full">
                                    <Heart color="blue" className="cursor-pointer" />

                                    {!activeItemsInCart.find((item) => item._id === product._id) ? (
                                        <ShoppingCart
                                            color="blue"
                                            onClick={() => addRemoveToCartHandler(product)}
                                            className="cursor-pointer"
                                        />
                                    ) : (
                                        <ShoppingCart
                                            color="red"
                                            fill="red"
                                            onClick={() => addRemoveToCartHandler(product)}
                                            className="cursor-pointer"
                                        />
                                    )}

                                    <Link to={`/products/${product._id}`} state={{ product }}>
                                        <Eye color="blue" className="cursor-pointer" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div id="new-arrival" >
                <h1 className="text-xl font-semibold mb-3">New Arrival</h1>
                <div className="space-y-4">
                    {data?.products.slice(startForNewArrival, startForNewArrival + 3).map(product => (
                        <div
                            data-aos="zoom-in-up"
                            data-aos-duration="1000"
                            key={product._id} className="section-grant w-full p-4 relative flex items-center justify-center group">
                            <div className="flex items-center justify-start gap-2">
                                <div className="w-1/3">
                                    <img
                                        src={product.photos[0].url}
                                        alt={product.name}
                                        className="h-full w-full object-cover rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold mb-2">{product.name}</h2>
                                    <p className="text-base font-semibold text-blue-500">${product.price}</p>
                                </div>
                            </div>

                            <div className="opacity-0 group-hover:opacity-100 border2 w-full h-full absolute top-0 left-0 duration-500 bg-black/55 rounded-md flex items-center justify-center gap-6">
                                <div className="flex items-center justify-center gap-6 bg-white py-2 px-5 rounded-full">
                                    <Heart color="blue" className="cursor-pointer" />

                                    {!activeItemsInCart.find((item) => item._id === product._id) ? (
                                        <ShoppingCart
                                            color="blue"
                                            onClick={() => addRemoveToCartHandler(product)}
                                            className="cursor-pointer"
                                        />
                                    ) : (
                                        <ShoppingCart
                                                color="red"
                                                fill="red"
                                            onClick={() => addRemoveToCartHandler(product)}
                                            className="cursor-pointer"
                                        />
                                    )}

                                    <Link to={`/products/${product._id}`} state={{ product }}>
                                        <Eye color="blue" className="cursor-pointer" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default SimilarProducts;