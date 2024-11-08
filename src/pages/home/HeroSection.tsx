import BannerSlider from "./BannerSlider"


import i1 from "./../../assets/images/banner/1.jpg"
import i2 from "./../../assets/images/banner/2.jpg"
import i3 from "./../../assets/images/banner/3.jpg"
import i4 from "./../../assets/images/banner/4.jpg"
import i5 from "./../../assets/images/banner/5.jpg"
import i6 from "./../../assets/images/banner/6.jpg"
import i7 from "./../../assets/images/banner/7.jpg"
import i8 from "./../../assets/images/banner/8.jpg"
import i9 from "./../../assets/images/banner/9.jpg"
import i10 from "./../../assets/images/banner/10.jpg"
import i11 from "./../../assets/images/banner/11.jpg"
import i12 from "./../../assets/images/banner/12.jpg"
import i13 from "./../../assets/images/banner/13.jpg"
import i14 from "./../../assets/images/banner/14.jpg"
import i15 from "./../../assets/images/banner/15.jpg"
import { useEffect, useState } from "react"


const images = [
    i9, i1, i10, i2, i11, i3, i12, i8, i4, i13, i5, i14, i6, i15, i7
];

const HeroSection = () => {


    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [fade, setFade] = useState(false); // State for controlling the fade effect

    // Cycle through images every 3 seconds with a fade-in animation
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true); // Trigger fade-out
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(false); // Trigger fade-in
            }, 500); // Duration of fade-out, must match CSS timing
        }, 3000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="w-[95%] md:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 mt-2 md:mt-6  ">

            <div className="w-full h-full md:w[65%] rounded-md col-span-8 md:col-span-8">
                <BannerSlider controllerBtn={true} />
            </div>

            <div className="w-full flex flex-row md:flex-col gap-2 md:gap-4 col-span-8 md:col-span-4 overflow-hidden ">
                <div className="w-[50%] md:w-full overflow-hidden">
                    <img
                        src={images[currentImageIndex]}
                        alt={`banner-${currentImageIndex + 1}`}
                        className={`w-full md:w-full rounded-md transition-transform duration-[800ms] ease-in-out ${fade ? "scale-90 opacity-80" : "scale-100 opacity-100"}`}
                    />
                </div>
                <div className="w-[50%] md:w-full overflow-hidden">
                    <img
                        src={images[(currentImageIndex + 1) % images.length]}
                        alt={`banner-${(currentImageIndex + 2)}`}
                        className={`w-full rounded-md transition-transform duration-[800ms] ease-in-out ${fade ? "scale-90 opacity-80" : "scale-100 opacity-100"}`}
                    />
                </div>
            </div>
        </div>
    )
}
export default HeroSection