import Head from "next/head";
import {motion} from "framer-motion"

const Layout = ({ children, title = "Animex Stream",description }) => {
  return (
    <motion.div initial={{opacity:-0.5}} animate={{opacity:1}} className="w-full justify-center items-center min-h-screen mx-auto lg:h-full mt-[3rem] ml-0">
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key={title} />

        <meta property="og:description" content={description} />
      </Head>
      {children}
    </motion.div>
  );
};

export default Layout;
