import dynamic from "next/dynamic";
import Head from "next/head";
const HomePage = dynamic(() => import("../components/home/HomePage"));
const Header = dynamic(() => import("../components/home/Header"));
import styled from "styled-components";

const IndexContainer = styled.div`
    width: 100%;
    height:100%;
    
        background-position: center top;
    background-size: cover;
    overflow:hidden;
  
   
}
  
    
  }
`;

export default function Home() {
  return (
    <>
    <Head>
        
        <title>AniMex Stream</title>
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:title" content="AniMex Stream | Watch HD Animes." />
        <meta name="keywords" content="animexstream,animex stream,ottoanime,otto anime,watch anime, anime online,animex stream , free anime, english anime, sites to watch anime" />
        <meta name="apple-mobile-web-app-title" content="Otto Anime Stream" />
        <meta property="og:site_name" content="Otto Anime"/>

        <meta property="og:image" content="/ottoanime192.svg " />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:description"
          content="Watch Anime for free in HD quality with English subbed or dubbed."
        />
         <meta
          property="description"
          content="Watch Anime for free in HD quality with English subbed or dubbed."
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3357173685448212"
     crossOrigin="anonymous"></script>
        
      </Head>
    <IndexContainer>


      <HomePage />
    </IndexContainer>
    </>
  );
}
