import { useLocation, useNavigate } from "react-router-dom"
import { OrderItemType } from "../../../types"
import { useUpdateOrderMutation } from "../../../redux/api/OrderApi"
import { toast } from "sonner"
import { useEffect } from "react"


const TransactionManagement = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const order = location?.state?.order
  console.log("order data is:", order)
  console.log("order id is:", order._id)

  const billingInfo = order.billingInfo.userId
  const shippingInfo = order.shippingInfo
  const othersInfo = order

  const { name, photo, email, gender } = billingInfo
  const { address, city, state, country, zipCode, mobile } = shippingInfo
  const {  status, subtotal, discount, shippingCharge, tax, total, } = othersInfo

  const [updateOrder, {data, isLoading, isSuccess, error }] = useUpdateOrderMutation()

  const statusUpdateHandler = async (id) => {
    try {
      await updateOrder(id)
    } catch (error) {
      toast.error("Failed to process order status")
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message)
      navigate("/admin/transactions")
    }
    if (error?.data) {
      toast.error(error?.data?.message)
    }
  }, [data?.message, isSuccess, error?.data, navigate])

  return (
    <div className="dashboard-container">
      <main className=" mt-4 flex flex-col md:flex-row items-start justify-center gap-6">
        <section className="section-grant p-4 w-full ">
          <h2 className="heading">Ordered Items</h2>
          {
            order.orderedItems?.map(item => <div key={item._id}>
              <TransactionProductItem name={item.name} photo={item.photo} price={item.price} quantity={item.quantity} _id={item._id} />
            </div>)
          }
        </section>

        <article className="section-grant p-4 w-full text- space-y-5 ">
          <div className="space-y-1">
            <h1 className="heading">Ordered Info</h1>
            <h5 className="subHeading">User Info</h5>
            <p>Name: {name}</p>
            <p>Address: {`${address}, ${city}, ${zipCode}, ${state}, ${country}`}</p>
            <p>Contact: {mobile}</p>
          </div>

          <div className="space-y-1">
            <h5 className="subHeading">Amount Info</h5>
            <p>Subtotal: {subtotal}</p>
            <p>Shipping Charge: {shippingCharge}</p>
            <p>Tax: {tax}</p>
            <p>Discount: {discount}</p>
            <p>Total: {total}</p>
          </div>

          <div>
            <h5 className="subHeading">Status Info</h5>
            <p className="font-semibold ">Status: <span className={status === "Processing" ? "text-myRed" : status === "Shipped" ? "text-purple-500" : "text-green-500"} >{status}</span> </p>
            <button
              onClick={() => statusUpdateHandler(order?._id)}
              disabled={isLoading}
              className="full-w-btn mt-5 "
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="spinner"></div>
                  <p>
                    Processing
                  </p>
                </div>
              ) : (
                "Process Product Status"
              )}
            </button>
          </div>
        </article>
      </main>
    </div>
  )
}

const TransactionProductItem = ({ name, photo, price, quantity }: OrderItemType) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-1 border- w-fit">
      <div className="w-[25%] ">
        <img src={photo} alt={name} loading="lazy" className="w-full h-full rounded-md " />
      </div>
      <span>{name}</span>
    </div>
    <span className="w-full text-right" >${price} X {quantity} = ${price * quantity}</span>
  </div>
)

export default TransactionManagement