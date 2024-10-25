import { useCategoriesQuery } from "../../redux/api/productApi"
import CategoryCard from "./CategoryCard"

const Categories = () => {

  const { data } = useCategoriesQuery("")

  return (

    <div className="bg-white mx-2 p-2 md:p-4 w-full lg:w-[92%] lg:mx-auto rounded-md  " >

      <h1 className="heading  ">Categories </h1>


      <div className=" flex items-center justify-center gap-4 ">
        {
          data && data.categories.map((category, index) => <CategoryCard key={index} category={category} />)
        }
      </div>
    </div>
  )
}

export default Categories