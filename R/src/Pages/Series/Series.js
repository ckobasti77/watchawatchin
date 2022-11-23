import React, { useState, useEffect } from "react";
import SeriesRender from './SeriesRender';
import SeriesSideNav from './SeriesSideNav'

const Series = () => {
  const [selectedSort, setSelectedSort] = useState("on_the_air");
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <div className="d-flex">
      <SeriesSideNav setSelectedSort={setSelectedSort} setSelectedGenres={setSelectedGenres}/>
      <SeriesRender selectedSort={selectedSort} selectedGenres={selectedGenres}/>
    </div>
  )
};

export default Series;
