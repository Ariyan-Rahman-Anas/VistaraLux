import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getActiveItemsInCart } from '../redux/reducers/cartReducer';
import { toast } from 'sonner';
import { useAddToWishlistMutation, useAnUserWishlistQuery } from '../redux/api/wishlistApi';
import { useEffect } from 'react';
import { selectAuthenticatedUser } from '../redux/reducers/userReducer';
import { useAddRemoveToCartHandler } from '../customHooks/useAddRemoveToCartHandler';

const ProductCard = ({ isLoading, product }) => {
    const { _id, name, price, brand, photos } = product || {};
    const user = useSelector(selectAuthenticatedUser);
    const [addToWishlist, { data, isSuccess, error }] = useAddToWishlistMutation();
    const activeItemsInCart = useSelector(getActiveItemsInCart);

    const { data: anUserWishlist } = useAnUserWishlistQuery(user?._id)
    const activeItemsInWishlist = anUserWishlist?.wishlist?.products

    const handleAddRemoveToCart = useAddRemoveToCartHandler(product);

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
        <div
            data-aos="zoom-in-up"
            data-aos-duration="1000"
            
            className="section-grant w-full p-4 relative flex items-center justify-center group">
            {isLoading ? (
                <div className="animate-pulse">
                    <div className="h-40 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
                </div>
            ) : (
                <div>
                    <img
                        src={photos[0]?.url}
                            alt={name}
                            loading='lazy'
                        className="h-full w-full object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-base font-semibold mb-2">{name}</h2>
                    <div className='flex items-center justify-between'>
                        <p className="text-base font-semibold text-gray-500">{brand}</p>
                        <p className="text-base font-semibold text-blue-500">${price}.00</p>
                    </div>
                </div>
            )}

            <div className="opacity-0 group-hover:opacity-100 border2 w-full h-full absolute top-0 left-0 duration-500 bg-black/55 rounded-md flex items-center justify-center gap-6">
                <div className="flex items-center justify-center gap-6 bg-white py-2 px-5 rounded-full">
                    {
                        !activeItemsInWishlist?.find(item => item?.productId?._id === product?._id) ? <Heart color="blue" className="cursor-pointer" onClick={() => addToWishlistHandler(product?._id)} />
                            : <Heart color="red" fill="red" className="cursor-pointer" onClick={() => addToWishlistHandler(product?._id)} />
                    }


                    {!activeItemsInCart.find((item) => item._id === product._id) ? (
                        <ShoppingCart color="blue" onClick={handleAddRemoveToCart} className="cursor-pointer" />
                    ) : (
                        <ShoppingCart color="red" fill="red" onClick={handleAddRemoveToCart} className="cursor-pointer" />
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