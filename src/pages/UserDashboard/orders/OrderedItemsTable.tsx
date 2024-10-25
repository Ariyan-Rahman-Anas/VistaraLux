import { useSelector } from "react-redux";
import { selectAuthenticatedUser } from "../../../redux/reducers/userReducer";
import { useDeleteOrderMutation, useMyOrdersQuery } from "../../../redux/api/OrderApi";
import { ReactElement, useEffect, useMemo } from "react";
import { Column } from "react-table";
import ModularTableWithSkeleton from "../../../components/adminDashboard/ModularTable";
import { Link } from "react-router-dom";
import { Eye, Trash } from "lucide-react";
import { toast } from "sonner";
import EmptyMessage from "../../../components/EmptyMessage";


interface DataType {
    orderId: string;
    products: ReactElement;
    totalBill: number;
    paymentStatus: string;
    orderStatus: string;
    orderDate: string;
    action: ReactElement
}

const OrderedItemsTable = () => {
    const columns: Column<DataType>[] = [
        { Header: "Id", accessor: "orderId" },
        { Header: "Products", accessor: "products" },
        { Header: "Bill", accessor: "totalBill" },
        { Header: "Payment", accessor: "paymentStatus" },
        { Header: "Status", accessor: "orderStatus" },
        { Header: "Date", accessor: "orderDate" },
        { Header: "Action", accessor: "action" },
    ];

    const user = useSelector(selectAuthenticatedUser);
    const { _id } = user || {}

    const { data, isLoading, error: ordersQueryError } = useMyOrdersQuery(_id)

    const [deleteOrder, { data: deletedData, isSuccess, error }] = useDeleteOrderMutation()

    const deleteHandler = async (id: string) => {
        try {
            await deleteOrder(id)
        } catch (error) {
            toast.error("Failed to delete this transaction")
        }
    }

    useEffect(() => {
        if (error?.deletedData) {
            toast.error(error?.deletedData?.message)
        }
        if (isSuccess) {
            toast.success(deletedData?.message)
        }
    }, [deletedData?.message, error?.deletedData, isSuccess])


    // / Transform the products data from API into the required format
    const fullData: DataType[] = useMemo(() => {
        if (!data?.orders) return [];

        return data?.orders.map(order => ({
            orderId: order._id,
            products: <div>{order.orderedItems?.map(item => item.name)}</div>,
            totalBill: order?.total,
            paymentStatus: "Paid",
            orderStatus: <p className={`${order.status === "Processing" ? "text-myRed" : order.status === "Shipped" ? "text-purple-500" : "text-green-500"} font-semibold`} >{order.status}</p>,
            orderDate: order?.createdAt?.slice(0, 10),
            action: <div className='flex items-center justify-center gap-4 w-fit mx-auto text-right '>
                <Link to={`${order._id}`} state={{ order }}  >
                    <Eye size={17} />
                </Link>
                <Trash
                    size={17}
                    onClick={() => deleteHandler(order._id)}
                    className='cursor-pointer hover:text-myRed duration-300 ' />
            </div>
        }));
    }, [data?.orders]);


    return (
        <>
            {
                data?.orders.length >= 1 ? <>
                    <h1 className="heading" >My Transactions History</h1>
                    <ModularTableWithSkeleton
                        columns={columns}
                        data={fullData}
                        containerClassName="my-table-container"
                        showPagination={true}
                        isLoading={isLoading}
                    />
                </> :
                    <EmptyMessage
                        btnText={"Shop now"}
                        redirectTo={"/products"}
                        message={ordersQueryError?.data.message} />
            }
        </>
    )
}
export default OrderedItemsTable