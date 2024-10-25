import { Link } from "react-router-dom"
import logo from "./../assets/logos/blue-white.svg"
import android from "./../assets/app/android.svg"
import ios from "./../assets/app/ios.svg"


const Footer = () => {

  const topCategories = [
    "Electronics",
    "Household",
    "Men's Fashions",
    "Women's Fashions",
    "Baby's Care",
    "Groceries",
  ]

  const quickLinks = [
    {title:"Home", link:"/"},
    {title:"Sign In", link:"/sign-in"},
    {title:"Shop Now", link:"/products"},
    {title:"Shop Now", link:"/products"},
    {title:"About Us", link:"/about"},
    {title:"FAQ", link:"/faq"},
    {title:"Support", link:"/support"},
  ]


  const today = new Date()
  const fullYear = today.getFullYear()


  return (
    <footer className="bg-black text-gray-300 " >
      <div className="px-4 md:px-8 pt-16 pb-8 flex flex-col lg:flex-row gap-10 ">
        <div id="support" className="space-y-4 w-full lg:w-[40%] " >
          <Link to={"/"} className="flex items-center justify-start gap-2">
            <div className="w-[5rem] ">
              <img src={logo} alt="vistaraLux's logo" className="w-full h-full" />
            </div>
            <p className="font-semibold text-2xl italic">VistaraLux</p>
          </Link>
          <div>
            <p className="text-gray-400">Any questions? Feel free to call us:</p>
            <a href="tel:+8801610195968" className="text-lg font-medium hover:text-myRed duration-300" >+88 01610 195968</a>
          </div>

          <div className="text-gray-400">
            <p>Khulshi, East Nasirabad,</p>
            <p>Khhulshi 4225, Chattogram, Bangladesh</p>
          </div>

          <div>
            <p className="text-gray-400">Any queries? Feel free to email us:</p>
            <a href="mailto:mohammadariyanrahmananas@gmail.com" className="text-lg font-medium hover:text-myRed duration-300 ">dev.m.ar.anas@gmail.com</a>
          </div>
        </div>


        <div className="w-full lg:w-[40%] flex items-start justify-between gap-8 ">
          <div id="top-categories" className=" flex-1 ">
            <h1 className="font-bold text-xl mb-5 "  >Top Categories</h1>
            <ul className="space-y-3 mb-3">
              {
                topCategories?.map((category, index) => <li key={index} className="hover:ml-4 hover:font-semibold hover:text-myRed duration-300" > <Link to={"/products"}>{category}</Link> </li>)
              }
            </ul>
            <Link to={"/products"} className="hover:ml-4 font-semibold text-myRed hover:text-gray-300 duration-300" >All Categories →</Link>
          </div>

          <div id="quick-links" className="flex-1 ">
            <h1 className="font-bold text-xl mb-5 " >Quick Links</h1>
            <ul className="space-y-3">
              {
                quickLinks?.map((link, index) => <li key={index} className="hover:ml-4 hover:font-semibold hover:text-myRed duration-300" > <Link to={link.link}>{link.title}</Link> </li>)
              }
            </ul>
          </div>
        </div>

        
        <div id="download-app" className="w-full lg:w-[20%] fle flex-row md:flex-col ">
          <h1 className="font-bold text-xl mb-5 ">Download App</h1>
          
          <div className="flex flex-row md:flex-col justify-between gap-4 w-full">
            <div className="flex items-center justify-center gap-6 bg-gray-700 border py-2 px-3 rounded-md w-full md:w-fit cursor-pointer hover:bg-gray-800 duration-300 ">
              <div className="w-[2rem] mx-aut ">
                <img src={ios} alt="android app" className="w-full h-full rounded-md " />
              </div>
              <div>
                <h1 className="text-xs">Get it now</h1>
                <p className="text font-bold">App Store</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 bg-gray-700 border py-2 px-3 rounded-md w-full md:w-fit md:mt-4 cursor-pointer hover:bg-gray-800 duration-300 ">
              <div className="w-[2rem] mx-aut ">
                <img src={android} alt="android app" className="w-full h-full rounded-md " />
              </div>
              <div>
                <h1 className="text-xs">Get it now</h1>
                <p className="text font-bold">Play Store</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="mb-6 border-gray-500 " />
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 pb-2 ">
        <p>All rights reserved by VistaraLux ©{fullYear} </p> 
        <p className="hidden md:block">|</p>
      <p>Developed by <Link to={"/"} className="hover:text-myRed duration-300" >Ariyan Rahman Anas</Link> </p>
      </div>   
    </footer>
  )
}
export default Footer