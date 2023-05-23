import React from 'react'
import { useSelector } from "react-redux";

function Footer({contact}) {
    const { theme } = useSelector((state) => state);

  return (
    <footer className="p-4   md:px-6 md:py-8 relative">
    <div className="flex items-center justify-between">
        <a href="#" className="flex items-center">
            <img src="/ottoanime.svg" className="mr-3 h-8" alt="Animex Logo"/>
            <span className={`self-center text-2xl font-semibold whitespace-nowrap ${theme.text.notselected}`}>AniMexStream</span>
        </a>
        <ul className="flex flex-wrap items-center justify-end mb-6 text-sm text-gray-500 sm:mb-0">
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
            </li>
            <li>
                <button  className="hover:underline" onClick={contact}>Contact</button>
            </li>
        </ul>
    </div>
    <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
    <span className="block text-sm text-gray-500 text-center ">© 2022 <a href="#" className="hover:underline">AnimexStream™</a>. All Rights Reserved.

    </span>
</footer>
  )
}

export default Footer