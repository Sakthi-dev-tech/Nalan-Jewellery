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
    { image: "/images/Sample_Jewel_1.svg", jewelName: "Sample Jewel 1", price: "$1250" },
    { image: "/images/Sample_Jewel_2.svg", jewelName: "Sample Jewel 2", price: "$2500" },
    { image: "/images/Sample_Jewel_3.svg", jewelName: "Sample Jewel 3", price: "$3125" },
    { image: "/images/Sample_Jewel_4.svg", jewelName: "Sample Jewel 4", price: "$5000" },
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
        <div className="h-[8vh] w-full flex flex-col items-center justify-evenly">
          <CategoryNavigation />
        </div>
        {/* The Fold */}
        <div className="h-[84vh] w-auto overflow-auto relative">
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
          <Text style={Parisienne.style} className="text-5xl">New Arrivals</Text>
          <CarouselForJewels dataArray={imagesForNewArrivals} />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}