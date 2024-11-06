import electronics from "./../../assets/images/categories/electronics.webp"
import home from "./../../assets/images/categories/home.webp"
import baby from "./../../assets/images/categories/baby.webp"
import mens from "./../../assets/images/categories/mens.webp"
import womens from "./../../assets/images/categories/womens.webp"
import groceries from "./../../assets/images/categories/groceries.webp"
import footWear from "./../../assets/images/categories/footWear.webp"
import watches from "./../../assets/images/categories/watches.webp"
import { Link } from "react-router-dom"

const allCategories = [
    {
        title: "Electronics",
        route: "/",
        image: electronics
    },
    {
        title: "Household",
        route: "/",
        image: home
    },
    {
        title: "Men's Fashion",
        route: "/",
        image: mens
    },
    {
        title: "Women's Fashion",
        route: "/",
        image: womens
    },
    {
        title: "Baby Care",
        route: "/",
        image: baby
    },
    {
        title: "Groceries",
        route: "/",
        image: groceries
    }
]

const PopularCategories = () => {
    return (
        <>
            <h1 className="heading">Top Categories</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {
                    allCategories?.map((category, index) => <Link key={index} to={category.route} className="group  " >
                        <div className="w2/3 mx-auto ">
                            <img
                                loading="lazy"
                                src={category.image}
                                alt={category.title}
                                className="w-full h-full rounded-md group-hover:opacity-65 duration-300" />
                        </div>
                        <h1 className="subHeading text-center group-hover:font-semibold capitalize duration-300 hover: animate-bounce ">{category.title}</h1>
                    </Link>)
                }
            </div>
        </>
    )
}

export default PopularCategories