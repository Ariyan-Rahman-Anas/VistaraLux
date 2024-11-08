// import { Column } from 'react-table';
// import ModularTableWithSkeleton from './ModularTable';
// import { ReactElement, useMemo } from 'react';
// import { useAllOrdersQuery } from '../../redux/api/OrderApi';

// interface DataType {
//     // id: string
//     user: string
//     date: string
//     amount: number
//     discount: number
//     status: ReactElement
// }

// const DashboardTable = () => {

//     const { data: transactionData, isLoading, error: transactionsQueryError } = useAllOrdersQuery("")


//     console.log("transactionData", transactionData)

//     const columns: Column<DataType>[] = [
//         {
//             Header: "User",
//             accessor: "user"
//         },
//         {
//             Header: "Date",
//             accessor: "date"
//         },
//         {
//             Header: "Amount",
//             accessor: "amount"
//         },
//         {
//             Header: "Discount",
//             accessor: "discount"
//         },
//         {
//             Header: "Status",
//             accessor: "status"
//         },
//     ]
    

//     // Transform the products data from API into the required format
//     const fullData: DataType[] = useMemo(() => {
//         if (!transactionData?.orders) return [];

//         return transactionData?.orders?.map(order => ({
//             user: order.billingInfo.userId?.name.split(" ").pop(),
//             date: order.createdAt.slice(0,10),
//             amount: order.total,
//             discount: order.discount,
//             status: <p className={`${order.status === "Processing" ? "text-myRed" : order.status === "Shipped" ? "text-purple-500" : "text-green-500"} font-semibold `} >{order.status}</p> ,
//         })).slice(0,5);
//     }, [transactionData?.orders]);

    
//     return <>
//         <h1 className='heading' >Top Transaction </h1>
//         <ModularTableWithSkeleton
//             columns={columns}
//             data={fullData}
//             containerClassName="my-table-container"
//             showPagination={false}
//             isLoading={isLoading}
//         />
//     </>
// }
// export default DashboardTable









import { Column } from 'react-table';
import ModularTableWithSkeleton from './ModularTable';
import { ReactElement, useMemo } from 'react';
import { useAllOrdersQuery } from '../../redux/api/OrderApi';

interface DataType {
    user: string;
    date: string;
    amount: number;
    discount: number;
    status: ReactElement;
}

const DashboardTable = () => {
    const { data: transactionData, isLoading, error: transactionsQueryError } = useAllOrdersQuery("");

    console.log("transactionData", transactionData);

    const columns: Column<DataType>[] = [
        { Header: "User", accessor: "user" },
        { Header: "Date", accessor: "date" },
        { Header: "Amount", accessor: "amount" },
        { Header: "Discount", accessor: "discount" },
        { Header: "Status", accessor: "status" },
    ];

    // Transform and sort the orders data to get the top 5 by "total" amount
    const fullData: DataType[] = useMemo(() => {
        if (!transactionData?.orders) return [];

        // return transactionData.orders
        //     .sort((a, b) => b.total - a.total)  // Sort orders by "total" in descending order
        //     .slice(0, 5)  // Take the top 5
        //     .map(order => ({
        //         user: order.billingInfo.userId?.name.split(" ").pop(),
        //         date: order.createdAt.slice(0, 10),
        //         amount: order.total,
        //         discount: order.discount,
        //         status: (
        //             <p className={`${order.status === "Processing" ? "text-myRed" : order.status === "Shipped" ? "text-purple-500" : "text-green-500"} font-semibold`}>
        //                 {order.status}
        //             </p>
        //         ),
        //     }));


        return [...transactionData.orders]  // Clone the array to avoid modifying the original
            .sort((a, b) => b.total - a.total)  // Sort the cloned array
            .slice(0, 5)  // Take the top 5
            .map(order => ({
                user: order.billingInfo.userId?.name.split(" ").pop(),
                date: order.createdAt.slice(0, 10),
                amount: order.total,
                discount: order.discount,
                status: (
                    <p className={`${order.status === "Processing" ? "text-myRed" : order.status === "Shipped" ? "text-purple-500" : "text-green-500"} font-semibold`}>
                        {order.status}
                    </p>
                ),
            }));
        
        

        
    }, [transactionData?.orders]);

    return (
        <>
            <h1 className="heading">Top Transactions</h1>
            <ModularTableWithSkeleton
                columns={columns}
                data={fullData}
                containerClassName="my-table-container"
                showPagination={false}
                isLoading={isLoading}
            />
        </>
    );
};

export default DashboardTable;