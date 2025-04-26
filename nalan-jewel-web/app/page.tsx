"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper';
import { Autoplay } from "swiper/modules";
import Navbar from "./components/Navbar";
import { useRef } from "react";
import { Parisienne } from "@/public/fonts/fonts";
import CarouselForJewels from "./components/CarouselForJewels";
import { Text } from "@chakra-ui/react";
import CategoryNavigation from "./components/CategoryNavigationForHome";
import Footer from "./components/Footer";

export default function Home() {

  const imagesForFold = [
    "/images/Sample_Fold_1.png",
    "/images/Sample_Fold_2.png",
    "/images/Sample_Fold_3.png",
    "/images/Sample_Fold_4.png",
  ];

  const imagesForNewArrivals = [
    { image: "/images/Sample_Jewel_1.svg", jewelName: "Sample Jewel 1", price: "$1250", id: 1 },
    { image: "/images/Sample_Jewel_2.svg", jewelName: "Sample Jewel 2", price: "$2500", id: 2 },
    { image: "/images/Sample_Jewel_3.svg", jewelName: "Sample Jewel 3", price: "$3125", id: 1 },
    { image: "/images/Sample_Jewel_4.svg", jewelName: "Sample Jewel 4", price: "$5000", id: 2 },
  ];

  // To Control the Carousel in the fold
  const swiperRefForFold = useRef<SwiperType | null>(null);


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
      <main className="mt-[8vh]">
        {/* Different type of jewels */}
        <div className="h-[auto] w-full flex flex-col items-center justify-evenly">
          <CategoryNavigation />
        </div>
        {/* The Fold */}
        <div className="w-full relative">
          <Swiper
            loop
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSwiper={(swiper) => (swiperRefForFold.current = swiper)}
            className="w-full"
          >
            {imagesForFold.map((image, index) => (
              <SwiperSlide key={index} className="w-full">
                <div className="relative w-full">
                  <img
                    src={image}
                    alt=""
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Arrows For The Fold */}
          <button
            onClick={handlePrevClick}
            className="hidden md:flex absolute top-1/2 transform -translate-y-1/2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-80 w-8 md:w-12 h-8 md:h-12 items-center justify-center z-10 left-2 md:left-5 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={handleNextClick}
            className="hidden md:flex absolute top-1/2 transform -translate-y-1/2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-80 w-8 md:w-12 h-8 md:h-12 items-center justify-center z-10 right-2 md:right-5 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* New Arrivals Section */}

        <div className="h-auto w-full flex flex-col items-center justify-center mt-6 md:mt-10 select-none px-4 md:px-20 py-8 md:py-20">
          <Text
            style={Parisienne.style}
            className="text-3xl md:text-5xl mb-6 md:mb-10"
          >
            New Arrivals
          </Text>
          <CarouselForJewels dataArray={imagesForNewArrivals} />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}