import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, getActiveItemsInCart, removeCartItem } from '../redux/reducers/cartReducer';
import { CartItem } from '../types/types';
import { toast } from 'sonner';

interface Product {
    _id: string;
    name: string;
    photo: string;
    price: number;
    quantity: number;
    productID: string;
    stock: number;
}

interface ProductCardProps {
    isLoading: boolean;
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ isLoading, product }) => {
    const { _id, name, price, photo } = product || {};

    const dispatch = useDispatch();
    const activeItemsInCart = useSelector(getActiveItemsInCart); // Selector to get the cart items

    const addRemoveToCartHandler = (product: Product) => {
        const isProductInCart = activeItemsInCart.find(item => item._id === product._id);

        // Construct the cart item with all required fields
        const cartItem: CartItem = {
            _id: product._id,
            name: product.name,
            price: product.price,
            photo: product.photo,
            quantity: 1, // initial quantity is 1 when added to the cart
            subtotal: product.price * 1, // subtotal is price * quantity
            productId: product._id, // assuming this is the same as _id
            stock: product.stock // carry over the stock to ensure we don't over-purchase
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
        <div className="section-grant w-full p-4 relative flex items-center justify-center group">
            {isLoading ? (
                <div className="animate-pulse">
                    {/* Skeleton Image */}
                    <div className="h-40 bg-gray-300 rounded-lg mb-4"></div>
                    {/* Skeleton Name */}
                    <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
                    {/* Skeleton Price */}
                    <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
                </div>
            ) : (
                <div>
                    {/* Product Image */}
                    <img
                        src={photo}
                        alt={name}
                        className="h-40 w-full object-cover rounded-lg mb-4"
                    />
                    {/* Product Name */}
                    <h2 className="text-lg font-semibold mb-2">{name}</h2>
                    {/* Product Price */}
                    <p className="text-xl font-semibold text-blue-500">${price}</p>
                </div>
            )}

            {/* Overlay with conditional ShoppingCart icon */}
            <div className="opacity-0 group-hover:opacity-100 border2 w-full h-full absolute top-0 left-0 duration-500 bg-black/55 rounded-md flex items-center justify-center gap-6">
                <div className="flex items-center justify-center gap-6 bg-white py-2 px-5 rounded-full">
                    <Heart color="blue" className="cursor-pointer" />

                    {/* Conditional ShoppingCart rendering based on product in the cart */}
                    {!activeItemsInCart.find((item) => item._id === product._id) ? (
                        <ShoppingCart
                            color="blue"
                            onClick={() => addRemoveToCartHandler(product)}
                            className="cursor-pointer"
                        />
                    ) : (
                        <ShoppingCart
                            color="blue"
                            fill="blue"
                            onClick={() => addRemoveToCartHandler(product)}
                            className="cursor-pointer"
                        />
                    )}

                    <Link to={`/products/${_id}`} state={{ product }}>
                        <Eye color="blue" className="cursor-pointer" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;