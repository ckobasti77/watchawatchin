import React, { useState, useEffect } from "react";
import TrendingSideNav from "./TrendingSideNav";
import TrendingRender from "./TrendingRender";

const Trending = () => {
  const [selectedSort, setSelectedSort] = useState("all");
  const [timespan, setTimespan] = useState("day");
  const [selectedGenres, setSelectedGenres] = useState([]);


  return (
    <div className="d-flex">
      <TrendingSideNav
        setSelectedSort={setSelectedSort}
        setTimespan={setTimespan}
        setSelectedGenres={setSelectedGenres}
      />
      <TrendingRender
        selectedSort={selectedSort}
        timespan={timespan}
        selectedGenres={selectedGenres}
      />
    </div>
  );
};

export default Trending;
