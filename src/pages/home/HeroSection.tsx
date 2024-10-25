import heroImg from "./../../assets/images/cover.svg"

const HeroSection = () => {
    return (
        <div className="w-full ">
            <div className="bo relative w-full h-full ">
                <img
                    src={heroImg}
                    alt="Online shopping platform showcasing seamless e-commerce experience"
                    className="h-full w-full"
                    loading="lazy"
                />
                <div className="absolute top-4 md:top-1/3 left-2 md:left-8 tracking-wider w-2/3 md:w-2/4">
                    <h1
                        className="text-lg md:text-5xl text-black font-bold "
                        style={{ textShadow: '1px 1px 1px rgba(0, 0, 0, 0.150)' }}
                    >
                        The Future of E-Commerce, Delivered Today
                    </h1>
                    <p className="text-xs  md:text-base mt-2 md:mt-4 pr-10 "> Seamless shopping experience, from browsing to checkout. Fully integrated, scalable, and built to grow your business online.</p>
                </div>
            </div>

        </div>
    )
}
export default HeroSection