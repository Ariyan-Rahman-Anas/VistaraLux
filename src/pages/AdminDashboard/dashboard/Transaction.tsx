import TransactionTable from "../../../components/adminDashboard/TransactionTable"

function Transaction() {
  return (
    <div className="dashboard-container pt-4 " >
      <div className="section-grant px-4 ">
        <div >
          <TransactionTable />
        </div>
      </div>
    </div>
  )
}

export default Transaction