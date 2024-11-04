import { toast } from "sonner";
import { CartItem } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getActiveItemsInCart, removeCartItem } from "../redux/reducers/cartReducer";

export const useAddRemoveToCartHandler = (product) => {
    const dispatch = useDispatch();
    const activeItemsInCart = useSelector(getActiveItemsInCart); 
    
    const handleAddRemoveToCart = () => {
        const isProductInCart = activeItemsInCart.find(item => item._id === product._id);

        const cartItem: CartItem = {
            _id: product._id,
            name: product.name,
            price: product.price,
            photo: product.photos[0].url,
            quantity: 1,
            subtotal: product.price,
            productId: product._id,
            stock: product.stock,
        };

        if (cartItem.stock <= 0) {
            return toast.error("Not enough product available in stock. Please try later.");
        }

        if (!isProductInCart) {
            dispatch(addToCart(cartItem));
            toast.success("Product added to cart.");
        } else {
            dispatch(removeCartItem(cartItem._id));
            toast.error("Product removed from cart.");
        }
    };

    return handleAddRemoveToCart;
};