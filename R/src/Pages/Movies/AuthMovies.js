import React, { useState, useEffect } from "react";
import AuthMoviesRender from "./AuthMoviesRender";
import MoviesSideNav from "./MoviesSideNav";
import "./Movies.css";

const AuthMovies = () => {
  const [selectedSort, setSelectedSort] = useState("now_playing");
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <div className="d-flex" style={{justifyContent: "space-between"}}>
      <MoviesSideNav setSelectedSort={setSelectedSort} setSelectedGenres={setSelectedGenres}/>
      <AuthMoviesRender selectedSort={selectedSort} selectedGenres={selectedGenres}/>
    </div>
  );
};

export default AuthMovies;
