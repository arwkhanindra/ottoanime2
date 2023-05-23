import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { AiFillPlayCircle } from "react-icons/ai";
import dynamic from 'next/dynamic'
const EpisodeContainer = dynamic(() => import('./EpisodeContainer'))
const Loader = dynamic(() => import('../Loader/Loader'))


import {
  addToMyList,
  removeFromMyList,
} from "../../redux/actions/myLIstDataAction";

import { useEffect, useState } from "react";
import Lottie from "lottie-react-web";
import Heart from "../../public/heart.json";
import Recommended from "../../pages/recommended";
import Container from "../card/Container";


const DetailsContainer = ({ id }) => {
  const [click, setClick] = useState(false);
  const { data , theme, myList, loading } = useSelector((state) => state);
  const [randomData, setRandomData] = useState([])
  const [expand,setExpand] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    fetchRecommended();
    const current = myList.filter((item) => item.id == id);
    current.length > 0 ? setClick(true) : setClick(false);

  }, [id]);

  function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
  
    return shuffled.slice(0, num);
  }
  

const fetchRecommended = async () => {
    let req = await fetch('/recommended.json')
    let res = await req.json()
    setRandomData(res)
    

}
  const handleClick = () => {
    if (click) {
      setClick(false);
      dispatch(removeFromMyList(id));
    } else {
      dispatch(addToMyList({ id: id, image_url: data.image_url, title: data.title,released: data.year }));
      setClick(true);
    }
  };
  return loading ? ( <Loader /> ) : (
    <>
    <div className="overflow-hidden relative">
      <img src={data.image_url} alt="data" className=" absolute lg:flex object-cover h-full  bg-center blur-[9px] brightness-[0.3] w-full "/>

      <div
        className={`background-transparent w-full text-white py-2 lg:py-8 flex justify-center  mt-[4.8rem] md:mt-0  `}
      >
        <div className={`w-full flex flex-col justify-center items-center lg:flex-row lg:justify-center lg:items-stretch z-[1] `}>
          <div className="rounded-lg w-8/12 lg:w-auto h-fit my-1 lg:my-0 shadow-2xl">
            <img
              src={data.image_url}
              alt={data.title}
              className=" w-[226px] h-[319px] rounded-lg mx-auto object-cover"
            />
            <div className="hidden lg:flex lg:flex-col py-3 items-center ">
                <span className="font-bold text-xl ">Released</span>
                <span className={`${theme.text.notselected} capitalize px-2`}>
                  {data.year}
                </span>
              </div>
          </div>
          <div className=" flex flex-col w-11/12 px-0 lg:w-8/12  lg:px-10">
            <div className="flex w-full justify-between py-2">
              <span className="font-bold text-2xl  md:text-[2rem]  ">
                {data.title}
                <div
                  className={`${theme.line} h-0.5 mx-2 my-1 w-1/3 rounded-full`}
                />
              </span>
              <span
                className={`text-white  capitalize w-30 text-base font-bold text-end`}
              >
                {data.type?.replaceAll("-", " ")}
              </span>
            </div>

            <div className="flex flex-col w-full ">
              <span className="flex text-blue-500 justify-between w-full items-end font-bold text-3xl">
                Synopsis
                <span
                  className={`${theme.text.notselected} w-12 h-12 hover:scale-110 transform transition-all duration-200`}
                  onClick={handleClick}
                >
                  <Lottie
                    options={{
                      animationData: Heart,
                      loop: false,
                    }}
                    direction={click ? 1 : -1}
                  />
                </span>
              </span>
              <span className="text-base  font-light p-2">{data.plot_summary}
     </span>
            </div>
            <div className="flex w-full justify-between items-center">
              <div className="flex flex-col py-3 lg:hidden">
                <span className="font-bold text-xl ">Released</span>
                <span className={`${theme.text.notselected} capitalize px-2`}>
                  {data.year}
                </span>
              </div>
              <div className="hidden lg:flex lg:flex-col py-2">
              <span className="text-xl font-bold">Episodes</span>
              <span className="text-sm font-bold p-2">
                {data.episodes == "0" ? "NA" : data.episodes}
              </span>
            </div>

              <div className="flex flex-col py-3">
                <span className="font-bold text-xl ">Status</span>
                <span className={`${theme.text.notselected} capitalize`}>
                  {data.status}
                </span>
              </div>
            </div>
            <div className="py-2 w-10/12">
              <span className="text-xl font-bold">The Genres</span>
              <span
                className={`${theme.text.notselected} flex flex-row flex-wrap justify-start w-full items-center`}
              >
                {console.log(data?.genre) ||
                  data.genre?.replaceAll("'", "")
                  .replace("[", "")
                  .replace("]", "")
                  .split(", ").map((Item, index) => (
                    <Link
                      href={`/genre/${Item.split(" ").join("-")}/1`}
                      key={index}
                    >
                      <span className=" py-1 mr-2 cursor-pointer flex justify-center whitespace-nowrap items-center transform hover:scale-110 transition-transform duration-200">
                        <AiFillPlayCircle
                          size={13}
                          style={{ margin: "0px 10px" }}
                          className="text-blue-500"
                        />

                        {Item}
                      </span>
                    </Link>
                  ))}
              </span>
            </div>
            <div className="flex flex-col py-2 lg:hidden">
              <span className="text-xl font-bold">Episodes</span>
              <span className="text-sm font-bold p-2">
                {data.episodes == "0" ? "NA" : data.episodes}
              </span>
            </div>
          </div>
        </div>
        
      </div>
      </div>

      

      <EpisodeContainer
        title={data.title}
        number={data.episodes}
        id={id}
        image={data.image_url}
      />
      
      <Container Data={getMultipleRandom(randomData,10)} heading={"Recommended Animes"}  />

    </>
  )
};

export default DetailsContainer;
