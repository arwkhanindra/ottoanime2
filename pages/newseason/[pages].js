import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/card/Container";
import Layout from "../../components/Layout";
import { asyncDataAction } from "../../redux/actions/asyncDataAction";
import { URL } from "../../utils/URLS";
import {Discover} from "../../utils/data"
const Season = () => {
  const { data } = useSelector((state) => state);
  const router = useRouter();
  const { pages } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    if (pages) {
      var NewSeasonURL = URL.SEASON + pages;

      dispatch(asyncDataAction(NewSeasonURL));
    }
    console.log(data)
  }, [pages]);

  return (
    <Layout title={"New Season"}>
      <Container Data={data} heading={"New Season"} Icon={Discover[1].icon} page={[pages]} len={data.length}/>
    </Layout>
  );
};

export default Season;
