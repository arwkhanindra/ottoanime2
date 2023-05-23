import dynamic from "next/dynamic";
const Card = dynamic(() => import("./Card"), {
  ssr: false,
});
// import Card from "./Card";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import Link from "next/link";
import { EffectFade } from 'swiper';


// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade"
import Loader from "../Loader/Loader";
SwiperCore.use([Navigation, Pagination]);

function HomeContainer({ Data = [], heading, page, Icon, to }) {
  const {theme} = useSelector(state => state)
  return (
    <div className="py-8 xl:px-12 xl:py-0 relative">
      <div className="flex justify-between">
        <span
          className={` px-2 flex  ${theme.text.selected} font-semibold items-center  text-2xl`}
        >
          {/* {Icon ? (
            <Icon
              size={15}
              style={{
                margin: "0px 10px 0px 0px",
                color: heading == "My List" ? "red" : theme.text.selected,
              }}
            />
          ) : (
            ""
          )} */}
          {heading}
        </span>
        <Link
          href={
            heading == "Latest Uploads" || heading == "Trending"
              ? `/${to}/1`
              : `/${to}`
          }
        > 
        {heading == "Watch List" || heading == "Latest Uploads" || heading == "Trending" || heading == "List" ? (
          <span
            className={` px-2 flex  font-light items-center cursor-pointer text-2xl hover:font-bold ${theme.text.selected}`}
          >
            <a> ALL</a>
          </span>

         ) : ""}
          
        </Link>
      </div>
      <div className={`bg-gray-400 rounded-full h-0.5 mx-2 w-[2rem]`} />

      <Swiper
         
        navigation
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          480: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4.2,
            spaceBetween: 10,
          },
          720: {
            slidesPerView: 4.5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5.1,
            spaceBetween: 10,
          },
          1224: {
            slidesPerView: 4.3,
            spaceBetween: 10,
          },
          1424: {
            slidesPerView: 5.3,
            spaceBetween: 10,
          },
          1624: {
            slidesPerView: 6.3,
            slidesPerGroup: 6,
            spaceBetween: 10,
            speed:700,
            
          },
        }}
       
      >
        <div className="">
          {Data?.map((item, index) => (
            <SwiperSlide key={index} >
              <Card {...item} heading={heading} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}

export default HomeContainer;
