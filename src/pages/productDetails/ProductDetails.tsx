import { Heart, ShoppingCart } from "lucide-react"
import { useLocation } from "react-router-dom"
import payments from "./../../assets/images/payments.svg"
import OrderFeatures from "../../components/OrderFeatures"

const ProductDetails = () => {

    const location = useLocation()
    const product = location?.state?.product
    const { name, category, price, stock, photo, description, createdAt }  =product || {}

  return (
      <div className="p-2 md:p-4 md:pb-20 w-full md:w-[90%] mx-auto space-y-16  ">
          <div className=" flex flex-col md:flex-row items-start justify-between gap-8">
              <div className="product-media section-grant p-4 flex-1 ">
                  <img src={photo} alt={name} loading="lazy" />
              </div>
              <div className="product-info flex-1 space-y-6 ">
                  <div className="section-grant p-4 ">
                      <h1 className="text-4xl mb-4" >{name}</h1>
                      <div className="flex items-start justify-between font-semibold text-gray-600 ">
                          <div className="space-y-2">
                              <p>Brand: <span className="text-black">Brand's name</span> </p>
                              <p>Category: <span className="capitalize text-black ">{category}</span> </p>
                              <p>Release Date: <span className="capitalize text-black">{createdAt.slice(0, 10)}</span> </p>
                          </div>
                          <div className="space-y-2">
                              <p>Availability: <span className={`${stock <= 10 ? "text-myRed" : "text-green-500"}`} >{stock <= 10 ? "Low Stock" : "In Stock"}</span> </p>
                              <p>Seller: <span className="capitalize text-black" >Seller's Name</span> </p>
                          </div>
                      </div>
                      <p className="text-2xl font-bold text-myBlue my-2" >${price}</p>
                      <p className="tex mt-2 mb-4 " >{description}</p>
                      <div className="flex flex-col-reverse md:flex-row items-center gap-5">
                          <button className="flex items-center gap-1 secondary-btn ">
                              <Heart /> <span>Add to wishlist</span>
                          </button>
                          <button className="flex items-center gap-1 primary-btn">
                              <ShoppingCart /><span>Add to Cart</span>
                          </button>
                      </div>
                  </div>

                  <div className="section-grant p-4 space-y-2 ">
                      <h1 className="font-semibold"><span className="text-myBlue text-2xl font-bold " >100%</span> Guaranteed safe checkout</h1>
                      <div>
                          <img src={payments} alt="payment methods" className="w-full h-full" />
                      </div>
                  </div>

              </div>
          </div>

          <div className="description section-grant p-4 flex flex-col md:flex-row items-start justify-between text-left ">
              <div className="border-2">
                  <h1>Description</h1>
                  <p>{description} </p>
              </div>
              <div>
                  <h1>Features</h1>
                  <ul>
                      
                  </ul>
              </div>
              <div>
                  <h1>Shipping Information</h1>
              </div>
          </div>

          
          <OrderFeatures />

      </div>
  )
}
export default ProductDetails