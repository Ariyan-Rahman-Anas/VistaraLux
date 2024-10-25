import CustomersTable from "../../../components/adminDashboard/CustomersTable"
import { useGetAllUserQuery } from "../../../redux/api/userApi";

function Customers() {

  const { users, isLoading, isError, isSuccess } = useGetAllUserQuery();
  console.log("usersuser", users)
  console.log("isLoading", isLoading)
  console.log("isError", isError)
  console.log("isSuccess", isSuccess)

  return (
    <div className="dashboard-container pt-4">
      <div className="section-grant px-4 ">
        <div>
          <CustomersTable />
        </div>
      </div>
    </div>
  )
}

export default Customers