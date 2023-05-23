import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loader from "../Loader/Loader";
import dynamic from "next/dynamic";
const EpisodePagiNation = dynamic(() => import("../EpisodePagiNation"));
const Container = dynamic(() => import("../card/Container"));
import cheerio from "cheerio";

import { resumeAction } from "../../redux/actions/resumeAction";
import Link from "next/link";
import { addToWatchList } from "../../redux/actions/recentlyWatchedAction";
// import EpisodePagiNation from "../EpisodePagiNation";
var Buffer = require("buffer/").Buffer; // note: the trailing slash is important!
import { BsPlay } from "react-icons/bs";

const axios = require("axios");

const WatchingContainer = ({ data, slug, frame }) => {
  const Myref = useRef(null);
  const { theme, loading, resumeId, watchList } = useSelector((state) => state);
  const [animeData, setAnimeData] = useState([]);
  const [image, setImage] = useState("");
  const [val, setVal] = useState(null);

  const [title, setTitle] = useState("");
  const [light, setLight] = useState(false);
  const dispatch = useDispatch();
  const [ep, setEp] = useState([]);
  const [schedule, setSchedule] = useState("");
  const [ifr, setIfr] = useState("");
  const [dataIfr, setDataIfr] = useState("");
  const [onGoingPopular, setOnGoingPopular] = useState([]);
  const violationRef = useRef(null);
  const scrollHere = useRef(null);


  
 


  var myArray = [];
  const myFunc = () => {
    for (let i = ep; i >= 1; i--) {
      myArray.push(i);
    }
  };

  var r =
    "https://animixplay.to/api/live" +
    window.btoa(dataIfr + "LTXs3GrU8we9O" + window.btoa(dataIfr));

  // const ImageContainer = styled.div`
  //   background: linear-gradient(rgb(0 0 0 / 86%), rgb(0 0 0 / 90%)),
  //     url(${image}) 0% 0% / cover no-repeat fixed;
  //   height: 100vh;
  //   width: 100%;
  //   filter: blur(7.5px) drop-shadow(2px 4px 14px black);
  //   /* z-index: 1; */
  //   position: fixed;

  //   background-position: center;
  // `;

  useEffect(() => {
    let offsetTop = scrollHere?.current?.offsetTop;
    violationRef?.current?.scrollTo(0, offsetTop);

    FetchingOnGoing();
    const ifry =  setIfr(
      `https://animixplay.to/api/live` +
        window.btoa(data.epid + "LTXs3GrU8we9O" + window.btoa(data.epid))
    );
    setDataIfr(data.epid);
    fetchEpisodesList();
    dispatch(
      addToWatchList({
        id: slug[0],
        image_url: image,
        title: title,
        episode: slug[1],
      })
    );

    dispatch(
      resumeAction({
        data: slug,
        time: 0,
      })
    );
    fetchSchedule();
    
    fetchSchedule();

    return () => {
      ifry
    }

   
  }, [data, image]);

  const fetchEpisodesList = async () => {
    let res = await axios.get(
      `https://ottogo.vercel.app/api/details/${slug[0]}/`
    );
    setAnimeData(res?.data);
    setImage(res.data.image_url);
    setTitle(res.data.title);
    setEp(res.data.episodes);
  };

  const FetchingOnGoing = async (e) => {
    let d = await axios.get(
      `  https://ajax.gogo-load.com/ajax/page-recent-release-ongoing.html?page=1
      `
    );
    d = d.data;
    const myList = [];
    var $ = cheerio.load(d);
    $(".added_series_body ul li").each(function (index, element) {
      let result = {};
      let url = $(this).children("a").attr("href").replace("/category/", "");
      let title = $(this).children("a").attr("title");
      let image_url = $(this)
        .children("a")
        .children("div")
        .attr("style")
        .replace("background: url('", "")
        .replace("');", "");

      result = { title, url, image_url };
      myList.push(result);
    });
    setOnGoingPopular(myList.slice(1, 7));
    console.log(myList);
  };
  const fetchSchedule = async () => {
    let res = await axios.get(
      `https://ottogo.vercel.app/api/schedule/${slug[0]}/`
    );

    setSchedule(res.data?.time || "");
  };
  console.log(val);
  console.log(myArray.length);
  console.log(myArray);

  return (
    <>
      <div
        className={
          light ? `fixed left-0 top-0 right-0 bottom-0 bg-black z-50` : ""
        }
      />

      <div className="relative flex justify-center items-center mx-auto text-center flex-col lg:h-full w-full lg:w-[1100px] xl:w-[1145px] 2xl:w-[1345px] px-2 ">
        <div
          className={` flex flex-col pb-2 xl:w-full justify-between items-center w-full ${theme.text.selected}   my-4`}
        >
          <div className="w-full py-4 uppercase flex flex-col items-start lg:items-start">
            <Link href={`/details/${slug[0]}`}>
              <span
                className={`text-1xl lg:text-3xl ml-0 lg:ml-10 cursor-pointer text-blue-500`}
              >
                {slug[0].replaceAll("-", " ")}
              </span>
            </Link>
            <div
              className={`bg-gray-400 rounded-full h-0.5 ml-0 lg:ml-11 w-1/12`}
            />
          </div>
          <div className="flex w-full justify-between items-end">
            <span
              className={`text-blue-600 ml-0 lg:ml-10 text-1xl lg:text-2xl`}
            >
              {ep == slug[1] ? schedule && "Next: " + schedule : null}
            </span>
          </div>
        </div>

        <div
          className={`ifr-container md:pb-[6.5em] flex w-full ${
            light ? "z-50" : ""
          } justify-center items-center p-0 md:p-4 flex-col-reverse`}
        >
          <div className="flex flex-col-reverse md:flex-row w-full drop-shadow-2xl	">
            <div className=" w-full md:block md:w-[12.5rem] lg:w-[16rem] bg-[#100f0f] md:bg-[#00000087]">
              <div className="flex flex-col text-white h-[350px] md:h-[500px] lg:h-[619px] xl:h-[610px] overflow-y-scroll" ref={violationRef}>
                <div className="flex justify-between p-2 font-bold border-b-2 border-slate-600 border-double items-center">
                  Episodes
                  <input
                    type="text"
                    className="text-blue-400 bg-transparent p-1 w-[6rem] outline outline-[#363333] outline-1 outline-solid focus:outline-blue-500 "
                    placeHolder="Filter eps.."
                    onChange={(e) => setVal(e.target.value)}
                  />
                </div>
                {val <= parseInt(ep) && val > 0 ? (
                  <Link key={val} href={`/watching/${slug[0]}/${val}`} >
                    <div className="m-[1px]">
                      <span
                        className={
                          slug[1] == ep
                            ? "bg-blue-500 p-3 cursor-pointer flex justify-between font-bold "
                            : `p-2 cursor-pointer flex justify-between font-light bg-[#8080801a]
              hover:bg-[#8080802b] hover:font-bold `
                        }
                      >
                        <h2>Episode {val} </h2>{" "}
                        <span>
                          <BsPlay
                            strokeWidth={0}
                            size={25}
                            className={
                              slug[1] == ep ? "text-white " : "text-blue-500"
                            }
                          />
                        </span>
                      </span>
                    </div>
                  </Link>
                ) : (
                  (myFunc(),
                  myArray.reverse().map((ep) => (
                    <Link key={ep} href={`/watching/${slug[0]}/${ep}`} ref={scrollHere}>
                      <div className="m-[1px]">
                        <span
                          className={
                            slug[1] == ep
                              ? "bg-blue-500 p-3 cursor-pointer flex justify-between font-bold "
                              : `p-2 cursor-pointer flex justify-between font-light bg-[#8080801a]
                  hover:bg-[#8080802b] hover:font-bold `
                          } 
                        >
                          <h2>Episode {ep} </h2>{" "}
                          <span>
                            <BsPlay
                              strokeWidth={0}
                              size={25}
                              className={
                                slug[1] == ep ? "text-white " : "text-blue-500"
                              }
                            />
                          </span>
                        </span>
                      </div>
                    </Link>
                  )))
                )}
              </div>
            </div>
            <iframe
              className="w-full h-[225px] md:h-[500px] lg:h-[619px] xl:h-[610px] drop-shadow-xl "
              src={frame}
              frameBorder="0"
              allowFullScreen
              ref={Myref}
            ></iframe>
          </div>

          <EpisodePagiNation
            page={[slug[0], slug[1]]}
            heading={"Ep"}
            total={ep}
            episodeid={data.epid}
            light={() => setLight(!light)}
            reload={() => (Myref.current.src += "")}
            change={() =>
              Myref.current.src == frame
                ? (Myref.current.src = data.iframe)
                : Myref.current.src == data.iframe
                ? (Myref.current.src = frame)
                : ""
            }
          />
        </div>
      </div>
      <Container Data={onGoingPopular} heading={"Popular Ongoing"} />
    </>
  );
};

export default WatchingContainer;
