import styled from "styled-components";
import { useSelector } from "react-redux";
import Link from "next/link";
import { AiFillCalendar } from "react-icons/ai";
import { useState } from "react";
import Image from "next/image";

const MovieWrapper = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border-radius: 0.8rem;
  background-color: transparent;
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    transform: scale(1.03);
    color: ${({ card }) => card.texthover};
    ::after {
      transform: scaleY(1);
      opacity: 1;
    }
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.8rem;
    transform: scaleY(0);
    transform-origin: top;
    background-color: ${({ card }) => card.bghover};

    opacity: 0;
    z-index: -99;
    box-shadow: 0rem 2rem 5rem rgba(0, 0, 0, 0.2);
    transition: all 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;

const Episode = styled.span`
  padding: 0.3rem 0;
  color: #878080;
`;

const MovieImg = styled.div`
  width: 100%;
  max-height: 100%;
  object-fit: "contain";
  // filter: drop-shadow(2px 4px 6px black);

  border-radius: 0;
  
  // transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
  &:hover {
    filter: brightness(0.9);
  }
  ${MovieWrapper}:hover & {
    border-radius: 0.8rem 0.8rem 0rem 0rem;
  }
`;

const Title = styled.span`
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px #ffffff0f solid;
  border-top: none;
  width: 100%;
  // background: #ffffff0f;
  padding: 0.5rem 0;
  border-radius-bottom: 0.8rem;
`;

const Card = ({ title, id, url, heading, image_url, episode, released }) => {
  const theme = useSelector((state) => state.theme);
  return (
    <Link
      href={
        episode
          ? `/watching/${id.replace("/","")}/${episode.replace("Episode", "").replace(" ", "")}`
          : heading === "My List" || heading === "List" || heading === "Recommended Animes"
          ? `/details/${id}`
          : `/details/${url}`
      }
    >
      <MovieWrapper
        className={
           `relative ${theme.card.text} ${theme.card.bghover} cursor-pointer items-center rounded-xl w-full text-center justify-start flex flex-col  `
        }
        card={theme.card}
      >
        {/* <MovieImg
            className="w-full object-cover rounded-xl h-[11rem]  xl:h-70 md:h-72 lg:h-66"
            lazy="loading"
            src={image_url}
            alt={title}
          > */}
        <MovieImg className="w-full object-cover rounded-xl h-[11rem]  xl:h-[20rem] md:h-72 2xl:h-[20.5rem] lg:h-66">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image
              src={image_url ? image_url : "/bg-anime2"}
              layout="fill"
              objectFit="cover"
              
            />
          </div>
        </MovieImg>
        <DetailsWrapper className="justify-between h-24 md:h-28">
          <Title className="text-[13px] md:text-lg">{title}</Title>
          {heading == "Popular" ||
          heading == "Trending" ||
          heading == "New Season" ||
          heading == "Genres" ||
          heading == "My List" ||
          heading == "Showing Results for" ||
          heading == "Movies" ||
          heading == "Recommended Animes" ? (
            <Episode className="text-[13px] md:text-md">{heading == "Recommended Animes" || heading == "My List" || heading == "List" ? "Released "+ released : released  } </Episode>
          ) : (
            ""
          )}
          {heading == "Recently Added" ||
          heading == "Latest Uploads" ? (
            <>
              <Episode>{episode}</Episode>
            </>
          ) : (
            ""
          )}
          {heading == "Watch List" || heading == "Recently Watched" ? (
            <>
              <Episode>{"Episode " + episode}</Episode>
            </>
          ) : (
            ""
          )}
        </DetailsWrapper>
      </MovieWrapper>
    </Link>
  );
};

export default Card;
