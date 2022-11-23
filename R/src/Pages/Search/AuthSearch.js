import React, { useState, useEffect } from "react";
import SearchSideNav from "./SearchSideNav";
import AuthSearchRender from "./AuthSearchRender";
import "./Search.css";

const AuthSearch = () => {
  const [selectedSort, setSelectedSort] = useState("movie");
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <div className="d-flex">
      <SearchSideNav
        setSelectedSort={setSelectedSort}
        setSelectedGenres={setSelectedGenres}
        selectedSort={selectedSort}
      />
      <AuthSearchRender
        selectedSort={selectedSort}
        selectedGenres={selectedGenres}
      />
    </div>
  );
};

export default AuthSearch;
