import { Outlet } from "react-router-dom"
import AdminSidebar from "../../components/adminDashboard/AdminSidebar"

const AdminDashboardLayout = () => {
    return (
        <div className="flex flex-col md:flex-row items-start justify-between gap- ">
            <AdminSidebar />
            <Outlet></Outlet>
        </div>
    )
}

export default AdminDashboardLayout