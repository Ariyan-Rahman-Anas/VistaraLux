import { useSelector } from "react-redux"
import { useAnUserWishlistQuery, useDeleteFromWishlistMutation } from "../../redux/api/wishlistApi"
import { selectAuthenticatedUser } from "../../redux/reducers/userReducer"
import { useEffect, useMemo } from "react"
import { Column } from "react-table"
import { Link } from "react-router-dom"
import { Eye, Trash } from "lucide-react"
import ModularTableWithSkeleton from "../../components/adminDashboard/ModularTable"
import { toast } from "sonner"

const WishlistTable = () => {

    const user = useSelector(selectAuthenticatedUser)

    const { data: wishlistData, isLoading, error: wishlistQueryError } = useAnUserWishlistQuery(user._id)

    const listData = wishlistData?.wishlist?.products

    const [deleteFromWishlist, { data: wishlistDeletedData, isSuccess, error }] = useDeleteFromWishlistMutation()

    const deleteHandler = (id) => {
        const payload = {
            userId: user._id,
            productId: id
        }
        deleteFromWishlist(payload)
    }
    useEffect(() => {
        if (error?.data) {
            toast.error(error?.data?.message, { duration: 3000 });
        }

        if (isSuccess) {
            toast.success(wishlistDeletedData?.message, { duration: 3000 });
        }
    }, [error, isSuccess, wishlistDeletedData?.message]);


    const columns: Column[] = useMemo(() => [
        {
            Header: "Photo",
            accessor: "photo"
        },
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Price",
            accessor: "price"
        },
        {
            Header: "Stock",
            accessor: "stock"
        },
        {
            Header: "Action",
            accessor: "action"
        }
    ], []);

    // Transform the products data from API into the required format
    const fullData = useMemo(() => {
        if (!listData) return [];

        return listData.map(product => ({
            photo:
                <div className="w-16">
                    <img src={product?.productId?.photos[0]?.url} alt={product?.productId?.name} loading='lazy' />
            </div>,
            name: product?.productId?.name,
            category: product?.productId?.category,
            price: product?.productId?.price,
            stock: <p className={`${product?.productId?.stock > 10 ? "text-myBlue" : "text-myRed"} font-semibold `}>{product?.productId?.stock > 10 ? "In Stock" : "Low Stock"} </p>,
            action: <div className='flex items-center justify-center gap-6 w-fit mx-auto'>
                <Link to={`/products/${product?.productId?._id}`} state={{ product: product?.productId }} >
                    <Eye size={17} />
                </Link>
                <Trash size={17} onClick={() => deleteHandler(product.productId?._id)} className='cursor-pointer hover:text-myRed duration-300 ' />
            </div>
        }));
    }, [listData]);


    return (
        <div>
            {
                <div className="section-grant p-4  ">
                    <div className='flex items-center justify-between '>
                        <h1 className='heading'>Wishlist </h1>
                        <h1>Total {listData?.length} items</h1>
                    </div>
                    <ModularTableWithSkeleton
                        columns={columns}
                        data={fullData}
                        containerClassName="my-table-container"
                        heading="Products"
                        showPagination={listData?.length <= 6 ? false : true}
                        isLoading={isLoading}
                    />
                </div>
            }
        </div>
    )
}

export default WishlistTable