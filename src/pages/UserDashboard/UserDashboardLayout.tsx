import { Outlet } from 'react-router-dom';
import UserDashboardSidebar from './UserDashboardSidebar';

const UserDashboardLayout = () => {
  return (
      <div className="flex flex-col md:flex-row items-start justify-between gap- ">
          <UserDashboardSidebar />
          <Outlet></Outlet>
      </div>
  )
}

export default UserDashboardLayout