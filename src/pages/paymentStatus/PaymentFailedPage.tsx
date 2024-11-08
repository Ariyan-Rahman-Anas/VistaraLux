import { Link } from "react-router-dom"
import orderSuccess from "./../../assets/images/order-failed.svg"

const PaymentFailedPage = () => {
  return (
    <div className="w-[95%] md:w-[90%] mx-auto my-8 flex flex-col md:flex-row items-center justify-between gap-6  ">
      <div
        data-aos="fade-right"
        data-aos-duration="1000"
        className="flex-1">
        <div className="w-full md:w-2/3 mx-auto ">
          <img src={orderSuccess} alt="Order success image" className="w-full h-full" />
        </div>
      </div>
      <div
        data-aos="fade-left"
        data-aos-duration="1000"
        className="flex-1 section-grant p-4 md:p-8 text-center ">
        <h1 className="text-2xl font-bold">Oops..</h1>
        <h2 className="text-3xl text-myRed font-bold animate-pulse ">Payment failed!</h2>
        <p className="mt-6 mb-8 ">Your order will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.</p>
        <Link to={"/shopping-cart"} className="secondary-btn">Let's try again</Link>
      </div>
    </div>
  )
}

export default PaymentFailedPage