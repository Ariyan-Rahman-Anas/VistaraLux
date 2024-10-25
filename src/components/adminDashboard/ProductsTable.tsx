import { Column } from 'react-table';
import { ReactElement, useEffect, useMemo } from "react";
import { Link } from 'react-router-dom';
import { useAllProductsQuery, useDeleteProductMutation } from '../../redux/api/productApi';
import ModularTableWithSkeleton from './ModularTable';
import { Eye, FilePenLine, Trash } from 'lucide-react';
import { toast } from 'sonner';
import EmptyMessage from '../EmptyMessage';

interface DataType {
    photo: ReactElement;
    name: string;
    category:string
    price: number;
    stock: number;
    action: ReactElement;
}

const ProductsTable = () => {
    const { data, isLoading, error: productsQueryError } = useAllProductsQuery("");
    const [deleteProduct, { data: deletedProductData, isLoading: isLoadingDelete, isSuccess, error }] = useDeleteProductMutation();

    const deleteHandler = async (id) => {
        try {
            await deleteProduct(id)
        } catch (error) {
            toast.error("Failed to delete product", { duration: 3000 });
            console.error("Product delete failed:", error);
        }
    }
    useEffect(() => {
        if (error?.data) {
            toast.error(error?.data?.message, { duration: 3000 });
        }

        if (isSuccess) {
            toast.success(deletedProductData?.message, { duration: 4000 });
        }
    }, [error, isSuccess, data, deletedProductData?.message]);

    // Memoize the columns to prevent unnecessary re-renders
    const columns: Column<DataType>[] = useMemo(() => [
        {
            Header: "Photo",
            accessor: "photo"
        },
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Category",
            accessor: "category"
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
    const fullData: DataType[] = useMemo(() => {
        if (!data?.products) return [];

        return data.products.map(product => ({
            photo: <img src={product.photo} alt={product.name} className='table-img' />,
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            action: <div className='flex items-center justify-center gap-4 w-fit mx-auto text-right '>
                <Link to={`/products/${product._id}`} state={{ product }} >
                    <Eye size={17} />
                </Link>
                <Link to={`/admin/products/${product._id}`} state={{ product }}>
                    <FilePenLine size={17} />
                </Link>
                <Trash size={17} onClick={() => deleteHandler(product._id)} className='cursor-pointer hover:text-myRed duration-300 ' />
            </div>
        }));
    }, [data]);

    return (
        <>
            {
                data?.products.length >= 1 ? <>
                    <div className='flex items-center justify-between '>
                        <h1 className='heading'>Products </h1>
                        <h1>Total {data?.products.length} products</h1>
                    </div>
                    <ModularTableWithSkeleton
                        columns={columns}
                        data={fullData}
                        containerClassName="my-table-container"
                        heading="Products"
                        showPagination={true}
                        isLoading={isLoading}
                    />
                </> : <EmptyMessage
                        btnText={"Add Products"}
                        redirectTo={"/admin/products/new-product"}
                        message={productsQueryError?.data.message}
                    />
            }
        </>
    );
};

export default ProductsTable;