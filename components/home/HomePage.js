import dynamic from "next/dynamic";
import Loader from "../Loader/Loader";
import cheerio from "cheerio";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Discover } from "../../utils/data";
const HomeContainer = dynamic(() => import("../card/HomeContainer"), {
  ssr: false,
});
// import HomeContainer from "../card/HomeContainer";
const axios = require("axios");
import Container from "../card/Container";

const HomePage = () => {
  const [content, setContent] = useState([]);
  const [onGoingPopular,setOnGoingPopular] = useState([])

  const [dataRecently, setDataRecently] = useState([]);
  const [dataPopular, setDataPopular] = useState([]);
  const { theme, resumeId, myList, watchList } = useSelector((state) => state);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    Fetching();
    PopularFetch();
    FetchingOnGoing()
  }, []);

  const Fetching = async (e) => {
    let d = await axios.get(
      `https://ajax.gogo-load.com/ajax/page-recent-release.html?page=1&type=1`
    );
    d = d.data;
    const myList = [];
    var $ = cheerio.load(d);
    $(".items li").each(function (index, element) {
      let result = {};
      let id = $(this).children("div").children("a").attr("href").split("-episode")[0];
      let title = $(this).children("div").children("a").attr("title");
      let image_url = $(this).find("img").attr("src");
      let episode = $(this).children(".episode").text();

      result = { title, id, image_url, episode };
      myList.push(result);
      
    });
    setContent(myList);
    console.log(content)
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
      let url = $(this).children("a").attr("href").replace("/category/","");
      let title = $(this).children("a").attr("title");
      let image_url = $(this).children("a").children("div").attr("style").replace("background: url('","").replace("');","");

      result = { title, url, image_url };
      myList.push(result);
      
      
    });
    setOnGoingPopular(myList)
    console.log(myList)
  };



  // const recentlyFetch = async () => {
  //   let res = await axios.get("https://ottogo.vercel.app/api/latest/1/");
  //   setDataRecently(res.data.slice(0, 12));
  //   console.log(dataRecently);
  // };

  const PopularFetch = async () => {
    let res = await axios.get("https://ottogo.vercel.app/api/popular/1/");
    setDataPopular(res.data.slice(0, 17));
  };

  return (
    <div className={`mx-auto lg:px-[0.7rem] mt-20 2xl:px-[3.2rem]`}>
      {myList.length > 0 ? (
        <HomeContainer
          Data={myList}
          heading={"List"}
          Icon={Discover[2].icon}
          to={"myList"}
        />
      ) : (
        ""
      )}
      {watchList.length > 0 ? (
        <HomeContainer
          Data={watchList}
          heading={"Watch List"}
          Icon={Discover[4].icon}
          to={`recentlyWatched`}
        />
      ) : (
        ""
      )}
      <HomeContainer
        Data={content}
        heading={"Latest Uploads"}
        Icon={Discover[0].icon}
        to={`recentlyadded`}
      />
      <HomeContainer
        Data={onGoingPopular}
        heading={"Popular Ongoing"}
        Icon={Discover[0].icon}
        to={`recentlyadded`}
      />
      <HomeContainer
        Data={dataPopular}
        heading={"Trending"}
        Icon={Discover[1].icon}
        to={"popular"}
      />
    </div>
  );
};

export default HomePage;
