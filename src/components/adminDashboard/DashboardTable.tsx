import { Column } from 'react-table';
import ModularTableWithSkeleton from './ModularTable';
import { useStatsQuery } from '../../redux/api/dashboardApi';
import { ReactElement, useMemo } from 'react';

interface DataType {
    id: string
    quantity: number
    amount: number
    discount: number
    status: ReactElement
}

const DashboardTable = () => {

    const { data, isLoading } = useStatsQuery("")
    console.log("data is", data)

    const columns: Column<DataType>[] = [
        {
            Header: "Id",
            accessor: "id"
        },
        {
            Header: "Quantity",
            accessor: "quantity"
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
    ]
    

    // Transform the products data from API into the required format
    const fullData: DataType[] = useMemo(() => {
        if (!data?.adminDashboardStats) return [];

        return data?.adminDashboardStats?.latestTransaction?.map(transaction => ({
            id: transaction._id,
            quantity: transaction.quantity,
            amount: transaction.amount,
            discount: transaction.discount,
            status: <p className={`${transaction.status==="Processing" ? "text-myRed" : transaction.status==="Shipped" ? "text-purple-500" : "text-green-500"} font-semibold `} >{transaction.status}</p> ,
        }));
    }, [data]);

    
    return <>
        <h1 className='heading' >Top Transaction </h1>
        <ModularTableWithSkeleton
            columns={columns}
            data={fullData}
            containerClassName="my-table-container"
            showPagination={false}
            isLoading={isLoading}
        />
    </>
}
export default DashboardTable