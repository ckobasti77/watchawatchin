import React, { useState, useEffect } from "react";
import SearchRender from "./SearchRender";
import SearchSideNav from "./SearchSideNav";
import "./Search.css";

const Search = () => {
  const [selectedSort, setSelectedSort] = useState("movie");
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <div className="d-flex">
      <SearchSideNav
        setSelectedSort={setSelectedSort}
        setSelectedGenres={setSelectedGenres}
        selectedSort={selectedSort}
      />
      <SearchRender
        selectedSort={selectedSort}
        selectedGenres={selectedGenres}
      />
    </div>
  );
};

export default Search;
