
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper';
import "swiper/css"; // Import Swiper's core CSS
import 'swiper/css/navigation';
import { useRef } from "react";
import Image from "next/image";

// Define a type for the props
type CarouselForJewelsProps = {
    dataArray: Array<{ // Define the data prop as an array of maps
        image: string;
        jewelName: string;
        price: string;
    }>;
};

export default function CarouselForJewels({ dataArray }: CarouselForJewelsProps) {
    const swiperRefForNewArrivals = useRef<SwiperType | null>(null);

    return(
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
              {dataArray.map((data, index) => (
                <SwiperSlide key={index}>
                  <div className="h-[430px] justify-center items-center flex flex-col">
                    <img src={data.image} alt="" className="w-[400px] aspect-auto object-fill hover:w-[420px] transition-all duration-500" />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <text style={{fontFamily: 'Donegal_One'}} className="text-3xl px-12">{data.jewelName}</text>
                    <text style={{fontFamily: 'NunitoSans'}} className="text-xl px-12 text-gray-600">{data.price}</text>
                  </div>
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
    )
    
}