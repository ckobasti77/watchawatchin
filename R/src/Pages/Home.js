import React, { useEffect, useState } from "react";
import HomeCarousel from "../Components/HomeComponents/HomeCarousel/HomeCarousel";
import Gallery from "../Components/HomeComponents/Gallery/Gallery";
import MostWatched from "../Components/HomeComponents/MostWatched/MostWatched";
import Mockups from "../Components/HomeComponents/Mockups/Mockups";
import Avatar from "../Components/HomeComponents/Avatar/Avatar";
import HotListToday from "../Components/HomeComponents/HotListToday/HotListToday";
import "../Components/Preloader.css";

const Home = () => {
  return (
    <>
      <HomeCarousel />
      <h1
        className="text-light text-center m-0 py-5"
        style={{ backgroundColor: "#17181c", fontSize: "4.5rem" }}
      >
        Watcha Watchin?
      </h1>
      <HotListToday />
      <Gallery />
      <Avatar />
      <MostWatched />
      <Mockups />
    </>
  );
};

export default Home;
