import React, { useEffect, useRef, useState } from 'react';

interface CarouselProps {
    images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change slide every 1.5 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleIndicatorClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative overflow-hidden ">
            <div
                className="flex transition-transform duration-500"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
                ref={carouselRef}
            >
                {images.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-full h-full h64">
                        <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover rounded-md" />
                    </div>
                ))}
            </div>

            {/* Previous Button */}
            <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[2rem] h-[2rem] bg-primary hover:bg-myBlue text-white rounded-full p-2 shadow-md leading-4 duration-300 "
                onClick={goToPrevSlide}
            >
                &#10094;
            </button>

            {/* Next Button */}
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 w-[2rem] h-[2rem] bg-primary hover:bg-myBlue text-white rounded-full p-2 shadow-md leading-4 duration-300 "
                onClick={goToNextSlide}
            >
                &#10095;
            </button>

            {/* Indicators */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-myBlue' : 'bg-gray-300'}`}
                        onClick={() => handleIndicatorClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;