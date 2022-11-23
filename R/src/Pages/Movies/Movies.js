import React, { useState, useEffect } from "react";
import MoviesRender from "./MoviesRender";
import MoviesSideNav from "./MoviesSideNav";
import "./Movies.css";

const Movies = () => {
  const [selectedSort, setSelectedSort] = useState("now_playing");
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <div className="d-flex" style={{justifyContent: "space-between"}}>
      <MoviesSideNav setSelectedSort={setSelectedSort} setSelectedGenres={setSelectedGenres}/>
      <MoviesRender selectedSort={selectedSort} selectedGenres={selectedGenres}/>
    </div>
  );
};

export default Movies;
