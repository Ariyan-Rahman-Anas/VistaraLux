// import { ChevronDown, ChevronUp } from "lucide-react";
// import {
//     Column,
//     usePagination,
//     useSortBy,
//     useTable,
//     TableOptions,
// } from "react-table";

// type TableProps<T extends Object> = {
//     columns: Column<T>[];
//     data: T[];
//     containerClassName: string;
//     heading: string;
//     showPagination?: boolean;
// };

// function ModularTable<T extends Object>({
//     columns,
//     data,
//     containerClassName,
//     heading,
//     showPagination = false,
// }: TableProps<T>) {
    // const options: TableOptions<T> = {
    //     columns,
    //     data,
    //     initialState: {
    //         pageSize: 6,
    //     },
    // };

//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         page,
//         prepareRow,
//         nextPage,
//         previousPage,
//         state: { pageIndex },
//         pageCount,
//         canNextPage,
//         canPreviousPage,
//     } = useTable(options, useSortBy, usePagination);

//     return (
//         <div className={containerClassName}>
//             <h2 className="heading">{heading}</h2>
//             <table className="table border-collapse w-full h-full " {...getTableProps()}>
//                 <thead className="bg-gray-200 rounded-md ">
//                     {headerGroups.map((headerGroup) => (
//                         <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
//                             {headerGroup.headers.map((column) => (
//                                 <th
//                                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                                     key={column.id}
//                                     className="py-4 text-left align-middle font-medium text-base grid-cols-2 place-items-center "
//                                 >
//                                     <span className="flex items-center justify-center gap-1">
//                                         <span> {column.render("Header")} </span>
//                                         {column.isSorted && (
//                                             <span >
//                                                 {column.isSortedDesc ? (
//                                                     <ChevronDown size={14} />
//                                                 ) : (
//                                                     <ChevronUp size={14} />
//                                                 )}
//                                             </span>
//                                         )}
//                                     </span>
//                                 </th>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>
//                 <tbody {...getTableBodyProps()} className=" " >
//                     {page.map((row) => {
//                         prepareRow(row);
//                         return (
//                             <tr {...row.getRowProps()} key={row.id} className="border-b hover:bg-blue-200 duration-300 ">
//                                 {row.cells.map((cell) => (
//                                     <td {...cell.getCellProps()} key={cell.column.id} className="p-4">
//                                         {cell.render("Cell")}
//                                     </td>
//                                 ))}
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>

//             {showPagination && (
//                 <div className="table-pagination flex items-center justify-center gap-4 py-4" >
//                     <button
//                         aria-label="Previous page"
//                         disabled={!canPreviousPage}
//                         onClick={previousPage}
//                         className="primary-btn"
//                     >
//                         Previous
//                     </button>
//                     <span>{`${pageIndex + 1} of ${pageCount}`}</span>
//                     <button
//                         aria-label="Next page"
//                         disabled={!canNextPage}
//                         onClick={nextPage}
//                         className="primary-btn"
//                     >
//                         Next
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }




import { ChevronDown, ChevronUp } from "lucide-react";
import {
    Column,
    usePagination,
    useSortBy,
    useTable,
    TableOptions,
} from "react-table";

type TableProps<T extends Object> = {
    columns: Column<T>[];
    data: T[];
    containerClassName: string;
    heading: string;
    showPagination?: boolean;
    isLoading: boolean;
};

const SkeletonRow = ({ columnsCount }: { columnsCount: number }) => (
    <tr className="border-b">
        {[...Array(columnsCount)].map((_, i) => (
            <td key={i} className="p-4">
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
            </td>
        ))}
    </tr>
);

const ModularTableWithSkeleton = <T extends Object>({
    columns,
    data,
    containerClassName,
    showPagination,
    isLoading,
}: TableProps<T>) => {
    const options: TableOptions<T> = {
        columns,
        data,
        initialState: {
            pageSize: 6,
        },
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        state: { pageIndex },
        pageCount,
        canNextPage,
        canPreviousPage,
    } = useTable(options, useSortBy, usePagination);

    const columnsCount = columns.length;

    return (
        <div className={containerClassName}>
            <table className="table border-collapse w-full h-full" {...getTableProps()}>
                <thead className="bg-gray-200 rounded-md">
                    {headerGroups.map((headerGroup, index) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    key={column.id}
                                    className="py-4 text-left align-middle font-medium text-base"
                                >
                                    <span className="flex items-center justify-center gap-1">
                                        <span> {column.render("Header")} </span>
                                        {column.isSorted && (
                                            <span>
                                                {column.isSortedDesc ? (
                                                    <ChevronDown size={14} />
                                                ) : (
                                                    <ChevronUp size={14} />
                                                )}
                                            </span>
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {isLoading
                        ? // Render skeleton rows if loading
                        [...Array(6)].map((_, idx) => (
                            <SkeletonRow key={idx} columnsCount={columnsCount} />
                        ))
                        : // Render actual rows if not loading
                        page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={row.id} className="border-b hover:bg-blue-200 duration-300">
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()} key={cell.column.id} className="p-4">
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                </tbody>
            </table>

            {showPagination && !isLoading && (
                <div className="flex items-center justify-center gap-4 py-4">
                    <button
                        aria-label="Previous page"
                        disabled={!canPreviousPage}
                        onClick={previousPage}
                        className="primary-btn"
                    >
                        Previous
                    </button>
                    <span>{`${pageIndex + 1} of ${pageCount}`}</span>
                    <button
                        aria-label="Next page"
                        disabled={!canNextPage}
                        onClick={nextPage}
                        className="primary-btn"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ModularTableWithSkeleton;