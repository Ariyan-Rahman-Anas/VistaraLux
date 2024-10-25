import { ReactElement, useEffect, useMemo, useState } from "react"
import { Column } from "react-table"
import { Trash, UserRoundPen } from "lucide-react"
import ModularTableWithSkeleton from "./ModularTable"
import { Link } from "react-router-dom"
import { useDeleteUserMutation, useGetAllUserQuery } from "../../redux/api/userApi"
import { toast } from "sonner"

interface DataType {
    avatar: ReactElement
    name: string
    gender: string
    email: string
    role: string
    action: ReactElement
}

const CustomersTable = () => {

    const { data, isLoading } = useGetAllUserQuery("");
    const [deleteUser, { data: deletedUserData, isSuccess, error }] = useDeleteUserMutation()
    
    const deleteHandler = (id) => {
        deleteUser(id)
    }

    useEffect(() => {
        if (error?.data) {
            toast.error(error?.data?.message)
        }
        if (isSuccess) {
            toast.success(deletedUserData?.message)
        }
    }, [deletedUserData?.message, error?.data, isSuccess])


    // Memoize the columns to prevent unnecessary re-renders
    const columns: Column<DataType>[] = useMemo(() => [
        {
            Header: "Avatar",
            accessor: "avatar"

        },
        {
            Header: "Name",
            accessor: "name"

        },
        {
            Header: "Gender",
            accessor: "gender"

        },
        {
            Header: "Email",
            accessor: "email"

        },
        {
            Header: "Role",
            accessor: "role"

        },
        {
            Header: "Action",
            accessor: "action"

        }
    ], []);

    // Transform the products data from API into the required format
    const fullData: DataType[] = useMemo(() => {
        if (!data?.users) return [];

        return data.users.map(user => ({
            avatar: <img src={user.photo} alt={user.name} className='table-img' />,
            name: user.name,
            gender: user.gender,
            email: user.email,
            role: user.role,
            action: <div className='flex items-center justify-center gap-4 w-fit mx-auto text-right '>
                <Link to={`/admin/customers/${user._id}`} state={{ user }} >
                    {/* <Eye size={17} /> */}
                <UserRoundPen size={17} />
                </Link>
                <Trash
                    size={17}
                    onClick={() => deleteHandler(user._id)}
                    className='cursor-pointer hover:text-myRed duration-300 ' />
            </div>
        }));
    }, [data]);


    return <>
        <h1 className="heading">Customers</h1>
        <ModularTableWithSkeleton
            columns={columns}
            data={fullData}
            containerClassName="my-table-container"
            heading="Customers"
            showPagination={true}
        isLoading={isLoading} 
        />
    </>
}

export default CustomersTable