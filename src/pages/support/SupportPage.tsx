import { CircleCheck, CreditCard, FileQuestion, Mail, Phone, RefreshCcw, ShieldCheck, Store, Truck, UserRound } from "lucide-react"
import support from "./../../assets/images/support.svg"
import didNotFindAns from "./../../assets/images/didn'tFindAns.svg"

const SupportPage = () => {

  const todaySupports = [
    {
      title: "Track Order",
      icon: <Truck color="blue" />
    },
    {
      title: "Payment Options",
      icon: <CreditCard color="blue" />
    },
    {
      title: "Return Policy",
      icon: <RefreshCcw color="blue" />
    },
    {
      title: "Billing Issues",
      icon: <CreditCard color="blue" />
    },
    {
      title: "Warranty",
      icon: <ShieldCheck color="blue" />
    },
    {
      title: "FAQs",
      icon: <FileQuestion color="blue" />
    },
    {
      title: "Store Locator",
      icon: <Store color="blue" />
    },
    {
      title: "My Account",
      icon: <UserRound color="blue" />
    },
  ]

  return (
    <div className="w-[95%] md:w-[90%] mx-auto space-y-20 ">
      <section className="py-10 flex flex-col md:flex-row items-start justify-between gap-6 ">
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          className="flex-1">
          <img src={support} alt="about us image" className="w-full h-full rounded-r-md " />
        </div>
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          className="flex-1 section-grant p-4 ">
          <div className="flex items-center justify-end ">
            <h1 className="font-semibold text-xl bg-myBlue text-white p-3 rounded-tr-xl " >Customer Support</h1>
          </div>
          <p className="font-semibold text-xl">✨ Customer Support at Vistaralux✨</p>
          <p className="my-8" >We’re here to make your shopping experience smooth and enjoyable. From 24/7 support to a dedicated team ready to assist you, Vistaralux ensures customer satisfaction at every step. Reach out to us anytime for a seamless shopping journey!</p>

          <div className="flex items-center gap-2 mt-4  ">
            <div className="space-y-2">
              <CircleCheck color="white" fill="blue" />
              <CircleCheck color="white" fill="blue" />
              <CircleCheck color="white" fill="blue" />

            </div>
            <div className="space-y-2">
              <p><span className="font-semibold">24/7 Customer Support</span> – Always available to assist you.</p>
              <p><span className="font-semibold">600+ Dedicated Team Members</span> – Committed to serving you.</p>
              <p><span className="font-semibold">Global Presence</span> – Over 50 branches worldwide to meet your needs.</p>
            </div>
          </div>

        </div>
      </section>

      <section
        data-aos="zoom-in-up"
        data-aos-duration="1000"
      >
        <h1 className="heading" >What can we help you with today?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {
            todaySupports?.map((support, index) => <div key={index}
              data-aos="zoom-in-up"
              data-aos-duration="1000"
              className="shadow hover:shadow-md rounded-md p-4 flex items-center gap-4 hover:bg-gray-200 duration-300 ">
              <p>{support.icon} </p>
              <p className="font-semibold">{support.title} </p>
            </div> )
          }
        </div>
      </section>

      <section className="mt-16 p-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          className="flex-1 ">
          <img src={didNotFindAns} alt="email subscription alarm" className="w-full h-full" />
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          className="flex-1 space-y-6">
          <h1 className="font-semibold text-2xl ">Did not find your answer?</h1>
          <div className="section-grant p-4 group">
            <div className="flex items-center  gap-2">
              <Phone className="group-hover:text-myRed text-myBlue duration-300 "/>
              <h1 className="font-semibold text-xl" >Call Us now</h1>
            </div>
            <p className="text-sm mt-2 mb-4 ">Subscribe and stay connected with updates on premium products and luxury finds—right at your fingertips!</p>
            <a href="tel:+8801610195968" className="text-lg font-medium group-hover:text-myRed  duration-300" >+88 01610 195968</a>
          </div>
          <div className="section-grant p-4 group ">
            <div className="flex items-center  gap-2">
              <Mail className="group-hover:text-myRed text-myBlue duration-300 " />
              <h1 className="font-semibold text-xl" >Mail Us</h1>
            </div>
            <p className="text-sm mt-2 mb-4 ">Subscribe and stay connected with updates on premium products and luxury finds—right at your fingertips!</p>
            <a href="mailto:dev.m.ar.anas@gmail.com" className="text-lg font-medium group-hover:text-myRed duration-300 ">dev.m.ar.anas@gmail.com</a>
          </div>
        </div>
      </section> 

    </div>
  )
}

export default SupportPage