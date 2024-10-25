import OrderedItemsTable from "./OrderedItemsTable";

const UserOrdersPage = () => {
  return (
    <div className="dashboard-container mt4 ">
      <main className=" mt-4">
          {/* <h2 className="subHeading">Welcome, UserBro!</h2>
          <p className="ml-28">Here you can see all your orders with all the details you might need to see. If you have any questions, please contact us. We are happy to help you.</p> */}
          <div className="section-grant p-4">
            <OrderedItemsTable />
          </div>
      </main>
    </div>
  )
}
export default UserOrdersPage