import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import PagiNation from "../PagiNation";
import Loader from "../Loader/Loader";
import { clearMyWatchList } from "../../redux/actions/recentlyWatchedAction";
import { AiFillDelete } from "react-icons/ai";
import dynamic from "next/dynamic";

import Zoom from 'react-reveal/Zoom';


function Container({ Data = [], heading, page, Icon, len }) {
  const { theme, loading, watchList } = useSelector((state) => state);
  console.log(Data);
  const dispatch = useDispatch();
  const clearWatch = () => {
    dispatch(clearMyWatchList());
  };
  return Data?.length > 0 ? (
    <>
      <div className="my-5 relative pt-[2rem] w-full lg:px-[2rem]">
        <span
          className={`${theme.text.selected} px-2 flex  font-bold items-center  text-2xl md:text-3xl`}
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
        <div className={`bg-gray-400 rounded-full h-0.5 mx-2 w-[2rem]`} />
        <span className={`text-blue-500  capitalize px-16 font-thin text-xl`}>
          {heading == "Showing Results for"
            ? page?.[0]
            : heading == "Genres"
            ? page?.[0]
            : "Anime"}
        </span>
        {heading == "Recently Watched" ? (
          <div className="absolute cursor-pointer px-4 top-[2rem] right-0">
            <div
              className={`${theme.button.background} ${theme.button.text} h-10 w-10  rounded-full flex  p-2.5 shadow-2xl relative right-0`}
              id="deletewatchlist"
              onClick={clearWatch}
            >
              {" "}
              <AiFillDelete size={20} />
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-3  w-full px-2 my-6  gap-[0.5rem]  justify-center  md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-5 lg:px-[0.5rem] lg:my-16 lg:mt-0  2xl:grid-cols-6 xl:gap-[0.6rem] 2xl:px-[4.3rem]">
        {Data?.map((item, index) => ( 
          
        
          <Card key={index} {...item}  heading={heading} />
        
        ))}
      </div>
      {page ? <PagiNation page={page} heading={"Page"} len={len} /> : null}
    </>
  ) : (
    <Loader />
  );
}

export default Container;
