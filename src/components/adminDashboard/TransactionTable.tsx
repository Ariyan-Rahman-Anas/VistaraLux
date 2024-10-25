import { ReactElement, useEffect, useMemo, useState } from "react"
import { Column } from "react-table"
import { Link } from "react-router-dom"
import ModularTableWithSkeleton from "./ModularTable"
import { useAllOrdersQuery, useDeleteOrderMutation } from "../../redux/api/OrderApi"
import { Eye, Trash } from "lucide-react"
import { toast } from "sonner"
import EmptyMessage from "../EmptyMessage"

interface DataType {
    user: string
    amount: number
    discount: number
    date: string
    status: ReactElement
    action: ReactElement
}

const TransactionTable = () => {
    const columns: Column<DataType>[] = [
        {
            Header: "User",
            accessor: "user"

        },
        {
            Header: "Amount",
            accessor: "amount"

        },
        {
            Header: "Discount",
            accessor: "discount"

        },
        {
            Header: "Status",
            accessor: "status"

        },
        {
            Header: "Date",
            accessor: "date"

        },
        {
            Header: "Action",
            accessor: "action"

        }
    ]

    const { data: transactionData, isLoading, error: transactionsQueryError } = useAllOrdersQuery("")

    const [deleteOrder, { data, isSuccess, error }] = useDeleteOrderMutation()

    const deleteHandler = async (id) => {
        try {
            await deleteOrder(id)
        } catch (error) {
            toast.error("Failed to delete this transaction")
        }
    }

    useEffect(() => {
        if (error?.data) {
            toast.error(error?.data?.message)
        }
        if (isSuccess) {
            toast.success(data?.message)
        }
    }, [error?.data, data?.message, isSuccess])

    // / Transform the products data from API into the required format
    const fullData: DataType[] = useMemo(() => {
        if (!transactionData?.orders) return [];

        return transactionData?.orders.map(order => ({
            user: <img src={order?.billingInfo?.userId?.photo} alt={order?.billingInfo?.userId?.name} className='table-img' />,
            amount: order?.total,
            discount: order?.discount,
            status: <p className={`${order.status === "Processing" ? "text-myRed" : order.status === "Shipped" ? "text-purple-500" : "text-green-500"} font-semibold`} >{order.status}</p>,
            date: order.createdAt.slice(0, 10),
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
    }, [transactionData?.orders]);

    return <>
        {
            transactionData?.orders?.length >= 1 ? <>
                <h1 className="heading" >Transactions</h1>
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
                    message={transactionsQueryError?.data.message}
                />
        }
    </>
}

export default TransactionTable