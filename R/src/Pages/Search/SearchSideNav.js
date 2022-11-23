import React, { useState, useEffect } from "react";
import "../../Components/SideNavbar/SideNavbar.css";
import { BsFillCaretDownFill } from "react-icons/bs";
import useFetch1 from "../../CustomHooks/useFetch1";

const SearchSideNav = ({ setSelectedSort, setSelectedGenres, selectedSort }) => {
  const apiKey = `5dc8da9950191123fe0a706966b868bb`;
  const [open, setOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(false);
  const [sortSelect, setSortSelect] = useState("");
  const [genres, setGenres] = useState([]);


  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
    setOpen(!open);
  };

  const sidebarStyle = {
    width: openSidebar ? "205px" : "45px",
    transitionDelay: openSidebar ? "0.3s" : 0,
  };

  const selectedRadioButton = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/${selectedSort}/list?api_key=${apiKey}&language=en-US&include_adult=true`)
    .then((response) => response.json())
    .then((response) => setGenres({...response}.genres))
  }, [selectedSort])


  const handleChange = (e) => {
    const {value, checked} = e.target;

    if (checked) {
      setSelectedGenres(prev => [...prev, value])
    } else {
      setSelectedGenres(prev => prev.filter((e) => e !== value))
    }
  }

  return (
    <div className="kontenjer">
      <div
        className="sidebar"
        style={{
          width: openSidebar ? "205px" : "45px",
          transitionDelay: openSidebar ? "0s" : "0.3s",
        }}
      >
        <div className="bars">
          <div
            id="burger1"
            onClick={toggleSidebar}
            className={open ? "open" : ""}
          >
            <div className="icon"></div>
          </div>
        </div>

        <div
          className="filters"
          style={{
            opacity: openSidebar ? "1" : "0",
            transitionDelay: !openSidebar ? "0s" : "0.5s",
          }}
        >
          <div className="sort-by">
            <h4
              onClick={() => setSortOpen(!sortOpen)}
              style={{
                borderBottom: sortOpen ? "2px solid var(--primary)" : 0,
                borderTop: sortOpen ? 0 : "2px solid var(--primary)",
                transition: "border 0.3s ease-in-out",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Search
              <span
                style={{
                  transform: sortOpen ? "rotateZ(-180deg)" : "",
                  transition: "transform 0.3s ease-in-out",
                  marginTop: 2,
                }}
              >
                <BsFillCaretDownFill />
              </span>
            </h4>
            <ul
              className="sort-by-list"
              style={{
                listStyleType: "none",
                paddingLeft: 0,
                height: sortOpen ? 50 : 0,
                transition: "height 0.3s ease-in-out",
                overflow: "hidden",
              }}
            >
              <li className="sort-by-list-item">
                <input
                  className="sort-radio"
                  type="radio"
                  name="sort"
                  value="now_playing"
                  id="now_playing"
                  onClick={() => {
                    selectedRadioButton("movie");
                  }}
                />
                <label style={{ marginLeft: 5 }} htmlFor="now_playing">
                  Movies
                </label>
              </li>
              <li className="sort-by-list-item">
                <input
                  className="sort-radio"
                  type="radio"
                  name="sort"
                  value="popular"
                  id="popular"
                  onClick={() => {
                    selectedRadioButton("tv");
                    // setSortSelect("tv");
                  }}
                />
                <label style={{ marginLeft: 5 }} htmlFor="popular">
                  Series
                </label>
              </li>
            </ul>
          </div>
          <div className="genres">
            <h4
              onClick={() => setGenresOpen(!genresOpen)}
              style={{
                borderBottom: genresOpen ? "2px solid var(--primary)" : 0,
                borderTop: genresOpen ? 0 : "2px solid var(--primary)",
                transition: "border 0.3s ease-in-out",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Genres
              <span
                style={{
                  transform: genresOpen ? "rotateZ(-180deg)" : "",
                  transition: "transform 0.3s ease-in-out",
                  marginTop: 2,
                }}
              >
                <BsFillCaretDownFill />
              </span>
            </h4>
            <br />
            <ul
              className="genres-list"
              style={{
                height: genresOpen ? 475 : 0,
                transition: "height 0.3s ease-in-out",
                overflow: "hidden",
              }}
            >
              {genres?.map((genre) => {
                return (
                  <li style={{ padding: 0, fontSize: 15 }}>
                    <input
                      className="genre"
                      type="checkbox"
                      name={genre.name.toLowerCase()}
                      id={genre.name.toLowerCase()}
                      value={genre.id}
                      onChange={handleChange}
                    />
                    <label
                      style={{ marginLeft: 5 }}
                      htmlFor={genre.name.toLowerCase()}
                    >
                      {genre.name}
                    </label>
                    <br />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSideNav;
