import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import ProductsTable from "../../../components/adminDashboard/ProductsTable"

function Products() {
  return (
    <div className="dashboard-container pt-4 relative ">
      <div className="section-grant px-4 ">
        {/* <div className="px-4"> */}
        <ProductsTable />
        {/* </div> */}
        <Link to="/admin/products/new-product" className="absolute top-3 right-3 bg-myBlue text-white p-1 rounded-full hover:opacity-70 duration-500 " >
          <Plus />
        </Link>
      </div>
    </div>
  )
}
export default Products