import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import dynamic from "next/dynamic";
const WatchingContainer = dynamic(() =>
  import("../../components/watch/watchingContainer")
);
import { asyncDataAction } from "../../redux/actions/asyncDataAction";
const axios = require("axios");

import { URL } from "../../utils/URLS";
const Recently = () => {
  const [data, setData] = useState([]);
  const [frame,setFrame]=useState("")
  // const { data } = useSelector((state) => state);
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    // if (slug) {
    //   var WatchingURL = URL.EPLINK + slug[0] + "/episode/" + slug[1];
    //   dispatch(asyncDataAction(WatchingURL));
    // }
    fetchEpisode();
  }, [slug]);

  const fetchEpisode = async () => {
    let WatchingURL = URL.EPLINK + slug[0] + "/episode/" + slug[1];
    let res = await axios.get(WatchingURL);
    setData(res.data);
    setFrame(`https://animixplay.to/api/live` +
    window.btoa(res.data.epid + "LTXs3GrU8we9O" + window.btoa(res.data.epid)))


  };

  return  (
    <Layout title={"Watching " + slug?.[0]}>
      {slug && <WatchingContainer data={data} slug={slug} frame={frame} />}
    </Layout>
  );
};

export default Recently;
