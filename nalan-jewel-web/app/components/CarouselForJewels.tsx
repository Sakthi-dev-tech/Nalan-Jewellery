
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper';
import "swiper/css"; // Import Swiper's core CSS
import 'swiper/css/navigation';
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Define a type for the props
type CarouselForJewelsProps = {
  dataArray: Array<{ // Define the data prop as an array of maps
    image: string;
    jewelName: string;
    price: string;
    id: number;
  }>;
};

export default function CarouselForJewels({ dataArray }: CarouselForJewelsProps) {
  const swiperRefForNewArrivals = useRef<SwiperType | null>(null);

  return (
    <div className="flex items-center justify-center w-full mt-5 px-4 md:px-0">
      {/* Navigation Buttons - Hidden on mobile */}
      <button
        onClick={() => swiperRefForNewArrivals.current?.slidePrev()}
        className="hidden md:flex rounded-full bg-black bg-opacity-50 hover:bg-opacity-80 w-8 md:w-12 h-8 md:h-12 items-center justify-center z-10 mr-2 md:mr-5 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <Swiper
        onSwiper={(swiper) => (swiperRefForNewArrivals.current = swiper)}
        slidesPerView={1.5} // Show partial next slide on mobile
        spaceBetween={8}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 8,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        className="w-full md:w-[80vw]"
        speed={1500}
      >
        {dataArray.map((data, index) => (
          <SwiperSlide key={index} className="py-2 md:py-8 px-1 md:px-5">
            <Link href={`/product?product_id=${data.id}`}>
              <article
                itemScope
                itemType="https://schema.org/product"
                className="p-2 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-lg bg-white transform-gpu"
              >
                <div className="h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] justify-center items-center flex flex-col">
                  <img
                    src={data.image}
                    alt={data.jewelName}
                    className="w-full h-full object-contain transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col items-start justify-center mt-1 md:mt-4 px-1 md:px-4">
                  <text
                    style={{ fontFamily: 'Donegal_One' }}
                    className="text-base sm:text-lg md:text-2xl lg:text-3xl line-clamp-1 w-full"
                  >
                    {data.jewelName}
                  </text>
                  <text
                    style={{ fontFamily: 'NunitoSans' }}
                    className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-600 mt-0.5 md:mt-1"
                  >
                    {data.price}
                  </text>
                </div>
              </article>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Button - Hidden on mobile */}
      <button
        onClick={() => swiperRefForNewArrivals.current?.slideNext()}
        className="hidden md:flex rounded-full bg-black bg-opacity-50 hover:bg-opacity-80 w-8 md:w-12 h-8 md:h-12 items-center justify-center z-10 ml-2 md:ml-5 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  )
}