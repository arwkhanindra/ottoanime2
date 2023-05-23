import Image from "next/image";
import Link from "next/link";
import NavContainer from "./nav_container/navcontainer";
import { Discover, Genre } from "../../utils/data";
import Toggle from "./Toggle";
import { useSelector } from "react-redux";
const Navbar = ({ visit }) => {
  const { theme } = useSelector((state) => state);
  return (
    <div
      className={`flex flex-col w-[22rem] overflow-hidden ${theme.background} ${theme.border.notselected} border-r justify-start items-center border-opacity-50 mt-[4rem] hidden xl:flex`}
    >
      <Link href="/recentlyadded/1">
        <div
          className={`${theme.text.selected}  cursor-pointer text-4xl  justify-center flex-col  flex items-center text-center`}
        >
          <Image
            width={300}
            height={250}
            objectFit="contain"
            src={
              theme.theme == "dark"
                ? "/ss.png"
                : "/kk.png"
            }
          />
        </div>
      </Link>
      <Toggle />
      <a href="https://www.buymeacoffee.com/ottoprogrammer"  rel="noreferrer"
          target="_blank">
      <img src="/coffe1.svg" className="pt-[1rem] cursor-pointer"/>
      </a>

      <NavContainer links={Discover} heading={"Discover"} />
      <NavContainer links={Genre} heading={"Genres"} />
      <span
        className={`${theme.text.notselected} text-lg px-10  w-full justify-start  flex items-center `}
      >
        Visits:&nbsp;
        <span className={`${theme.text.selected} text-xl font-bold`}>
          {visit}
        </span>
      </span>
    </div>
  );
};
export default Navbar;
