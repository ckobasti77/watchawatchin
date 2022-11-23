import React, { useState, useEffect } from "react";
import AuthSeriesRender from './AuthSeriesRender';
import SeriesSideNav from './SeriesSideNav'
import "./Series.css";

const AuthSeries = () => {
  const [selectedSort, setSelectedSort] = useState("on_the_air");
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <div className="d-flex">
      <SeriesSideNav setSelectedSort={setSelectedSort} setSelectedGenres={setSelectedGenres}/>
      <AuthSeriesRender selectedSort={selectedSort} selectedGenres={selectedGenres}/>
    </div>
  )
};

export default AuthSeries;
