import { useState, useRef, useEffect } from 'react';

import i1 from "./../../assets/images/banner/1.svg"
import i2 from "./../../assets/images/banner/2.svg"
import i3 from "./../../assets/images/banner/3.svg"
import i4 from "./../../assets/images/banner/4.svg"
import i5 from "./../../assets/images/banner/5.svg"
import i6 from "./../../assets/images/banner/6.svg"
import i7 from "./../../assets/images/banner/7.svg"
import i8 from "./../../assets/images/banner/8.svg"
import i9 from "./../../assets/images/banner/9.svg"
import i10 from "./../../assets/images/banner/10.svg"
import i11 from "./../../assets/images/banner/11.svg"
import i12 from "./../../assets/images/banner/12.svg"
import i13 from "./../../assets/images/banner/13.svg"
import i14 from "./../../assets/images/banner/14.svg"
import i15 from "./../../assets/images/banner/15.svg"

const Slider2 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const slides = [
        i9, i1, i10, i2, i11, i3, i12, i8, i4, i13, i5, i14, i6, i15, i7
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(slides.length / 2));
        }, 3000); // Automatic slide every 3 seconds

        return () => clearInterval(interval); // Clear interval on unmount
    }, [slides.length]);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(slides.length / 2));
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(slides.length / 2)) % Math.ceil(slides.length / 2));
    };

    return (
        <div className="relative w-full md:h-[77vh] sm:h-[40vh] overflow-hidden  border-gray-300 rounded-lg">
            <div
                ref={sliderRef}
                className={`flex ${window.innerWidth >= 768 ? "flex-col h-full" : "flex-row w-full"
                    } transition-transform duration-500 ease-in-out`}
                style={{
                    transform: `translate${window.innerWidth >= 768 ? 'Y' : 'X'}(-${currentIndex * 100}%)`
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`flex-shrink-0 rounded-md ${window.innerWidth >= 768 ? "w-full h-1/2" : "w-1/2 h-full"
                            }`}
                    >
                        <img
                            loading="lazy"
                            src={slide}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full rounded-md "
                        />
                    </div>
                ))}
            </div>

            {/* Controls */}
            {/* <div className="absolute bottom-4 flex flex-row items-center justify-center gap-4 w-full">
                <button
                    onClick={goToPrev}
                    className="p-2 bg-gray-800 text-white rounded-full"
                >
                    ❮
                </button>
                <button
                    onClick={goToNext}
                    className="p-2 bg-gray-800 text-white rounded-full"
                >
                    ❯
                </button>
            </div> */}
        </div>
    );
};

export default Slider2;
