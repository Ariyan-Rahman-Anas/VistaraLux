import { useState, useRef, useEffect } from 'react';

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
import i16 from "./../../assets/images/banner/16.jpg"
import i17 from "./../../assets/images/banner/17.jpg"
import i18 from "./../../assets/images/banner/18.jpg"

const BannerSlider = ({ controllerBtn }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const sliderRef = useRef(null);
    const slideWidth = useRef(0);
    const autoSlideInterval = useRef(null);

    const slides = [
        i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13, i14, i15,i16,i17,i18
    ];

    useEffect(() => {
        slideWidth.current = sliderRef.current?.children[0]?.offsetWidth || 0;

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            const x = e.clientX;
            const walk = (x - startX);

            const moveBy = Math.round(walk / slideWidth.current);
            sliderRef.current.scrollLeft = scrollLeft - moveBy * slideWidth.current;
        };

        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging, startX, scrollLeft]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const goToPrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
        );
    };

    // Automatic sliding effect
    useEffect(() => {
        autoSlideInterval.current = setInterval(goToNext, 3000); // Slide every 3 seconds

        return () => clearInterval(autoSlideInterval.current); // Clear interval on component unmount
    }, []);

    return (
        <div className="relative h-full border4">
            {/* Slider Container */}
            <div
                ref={sliderRef}
                className="flex overflow-hidden cursor-pointer rounded-md"
                onMouseDown={handleMouseDown}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`flex-shrink-0 w-full ease-in-out transition-transform duration-1000`}
                        style={{ transform: `translateX(${currentIndex * -100}%)` }}
                    >
                        <img loading='lazy' src={slide} alt={`Slide ${index + 1}`} className="w-full h-auto rounded-md" />
                    </div>
                ))}
            </div>

            {
                controllerBtn && <div className='absolute bottom-0 flex flex-row items-center justify-end gap-10 w-full pr-2'>
                    {/* Prev/Next Controls */}
                    <button
                        className="h-8 w-8 text-white text-lg font-semibold bg-primary shadow-md shadow-black/50 rounded-full hover:opacity-100"
                        onClick={goToPrev}
                    >
                        ❮
                    </button>
                    <button
                        className="h-8 w-8 text-white bg-primary text-lg font-semibold shadow-md shadow-black/50 rounded-full hover:opacity-100"
                        onClick={goToNext}
                    >
                        ❯
                    </button>
                </div>
            }
        </div>
    );
};

export default BannerSlider;