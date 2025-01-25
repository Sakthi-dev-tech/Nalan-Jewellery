"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper';
import { Autoplay } from "swiper/modules";
import "swiper/css"; // Import Swiper's core CSS
import 'swiper/css/navigation';
import Navbar from "./components/Navbar";
import { useRef } from "react";
import { Parisienne } from "@/public/fonts/fonts";

export default function Home() {

  const imagesForFold = [
    "/images/Sample_Fold_1.png",
    "/images/Sample_Fold_2.png",
    "/images/Sample_Fold_3.png",
    "/images/Sample_Fold_4.png",
  ];

  const imagesForNewArrivals = [
    "/images/Sample_Jewel_1.svg",
    "/images/Sample_Jewel_2.svg",
    "/images/Sample_Jewel_3.svg",
    "/images/Sample_Jewel_4.svg",
  ]

  // To Control the Carousel in the fold
  const swiperRefForFold = useRef<SwiperType | null>(null);
  const swiperRefForNewArrivals = useRef<SwiperType | null>(null);

  const handlePrevClick = () => {
    if (swiperRefForFold.current) {
      swiperRefForFold.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRefForFold.current) {
      swiperRefForFold.current.slideNext();
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="h-[90vh] w-autooverflow-auto">

          {/* The Fold */}
          <Swiper
            loop
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSwiper={(swiper) => (swiperRefForFold.current = swiper)}
            className="w-full h-full"
          >
            <div className="flex items-center justify-center h-full w-full">
              {imagesForFold.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>

          {/* Custom Arrows For The Fold */}
          <button
            onClick={handlePrevClick}
            className="absolute top-1/2 transform -translate-y-1/2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-80 w-12 h-12 flex items-center justify-center z-10 left-5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={handleNextClick}
            className="absolute top-1/2 transform -translate-y-1/2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-80 w-12 h-12 flex items-center justify-center z-10 right-5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* New Arrivals Section */}

        <div className="h-auto w-full flex flex-col items-center justify-center mt-10 select-none p-20">
          <text style={Parisienne.style} className="text-5xl">New Arrivals</text>

          <div className="flex items-center justify-center w-full mt-5">
            <button
              onClick={() => swiperRefForNewArrivals.current?.slidePrev()}
              className="rounded-full bg-black bg-opacity-50 hover:bg-opacity-80 w-12 h-12 flex items-center justify-center z-10 mr-5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <Swiper
              onSwiper={(swiper) => (swiperRefForNewArrivals.current = swiper)}
              slidesPerView={3}
              spaceBetween={10}
              className="w-[80vw] h-[auto]"
              speed={1500} // Slow down the swiper animation
            >
              {imagesForNewArrivals.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="h-[430px] justify-center items-center flex flex-col">
                    <img src={image} alt="" className="w-[400px] aspect-auto object-fill hover:w-[420px] transition-all duration-500" />
                  </div>
                  <text>Sample Jewel {index + 1}</text>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              onClick={() => swiperRefForNewArrivals.current?.slideNext()}
              className="rounded-full bg-black bg-opacity-50 hover:bg-opacity-80 w-12 h-12 flex items-center justify-center z-10 ml-5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}