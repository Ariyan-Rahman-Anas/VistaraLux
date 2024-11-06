import Slider from "./Slider"
import Slider2 from "./Slider2"

const HeroSection = () => {
    return (
        <div className="w-[95%] md:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 mt-2 md:mt-6  ">


            <div className="w-full h-full md:w[65%] shadow rounded-md hover:shadow-md duration-300 col-span-8 md:col-span-8">
                <Slider controllerBtn={true} />
            </div>

            <div className="w-full md:w[35%] fle flex-col gap-2 md:gap-4 col-span-8 md:col-span-4 ">
                <Slider2  />
            </div>
       </div>

    )
}
export default HeroSection