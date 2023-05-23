import { useState } from "react";
import { useSelector } from "react-redux";
import { CgMenuHotdog } from "react-icons/cg";
import {FaArrowLeft} from "react-icons/fa";
import Sidenav from "./sidenav";
import Search from "./search";
import Image from "next/image";
import { useRouter } from 'next/router'

import Link from "next/link";
const Sidebar = ({ visit }) => {
  const { theme } = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const router = useRouter()


  return (
    <>
      <div
        className={`${theme.background} fixed w-full top-0 py-8 px-2 shadow-2xl justify-between z-50 lg:p-8 `}
      >
        <Sidenav
          visit={visit}
          onClick={() => {
            setShow(false);
          }}
          show={show}
        />

        <div id="sidemenu" className=" flex justify-center relative items-center  w-full ">
          <Link href="/">
            <div
              className={`${theme.text.selected} absolute cursor-pointer`}
            >
              <Image
                width={140}
                height={40}
                src={
                  theme.theme == "dark"
                    ? "/animexlogodarksidebar.svg"
                    : "/animexlogolightsidebar.svg"
                }
              />
            </div>
          </Link>
          <CgMenuHotdog
            size={32}
            onClick={() => {
              setShow(true);
            }}
            className={`${theme.button.background}  cursor-pointer ${theme.button.text} absolute left-0 rounded-full p-1 block  xl:hidden `}
          />
          <FaArrowLeft
            size={32}
            onClick={() => router.back()}
            className={`${theme.button.background} cursor-pointer ${theme.button.text} absolute left-[3rem] xl:left-0 rounded-full p-1  `}
          />
          <Search size={28}/>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
