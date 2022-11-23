import React, { useState, useEffect } from "react";
import "../../Components/SideNavbar/SideNavbar.css";
import { BsFillCaretDownFill } from "react-icons/bs";

const TrendingSideNav = ({ setSelectedSort, setTimespan, setSelectedGenres }) => {
  const apiKey = `5dc8da9950191123fe0a706966b868bb`;
  const [open, setOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [timespanOpen, setTimespanOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(false);
  const [genres, setGenres] = useState(null)

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
    setOpen(!open);
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US&include_adult=true`)
    .then((response) => response.json())
    .then((response) => setGenres({...response}.genres))
  }, [])

  const selectedRadioButton = (sort) => {
    setSelectedSort(sort);
  };

  const selectedTimespan = (sort) => {
    setTimespan(sort);
  };

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
              Show
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
                height: sortOpen ? "75px" : 0,
                transition: "height 0.3s ease-in-out",
                overflow: "hidden",
              }}
            >
              <li className="sort-by-list-item">
                <input
                  className="sort-radio"
                  type="radio"
                  name="sort"
                  value="all"
                  id="all"
                  onClick={() => selectedRadioButton("all")}
                />
                <label style={{ marginLeft: 5 }} htmlFor="all">
                  All
                </label>
              </li>
              <li className="sort-by-list-item">
                <input
                  className="sort-radio"
                  type="radio"
                  name="sort"
                  value="movies"
                  id="movies"
                  onClick={() => selectedRadioButton("movie")}
                />
                <label style={{ marginLeft: 5 }} htmlFor="movies">
                  Movies
                </label>
              </li>
              <li className="sort-by-list-item">
                <input
                  className="sort-radio"
                  type="radio"
                  name="sort"
                  value="series"
                  id="series"
                  onClick={() => selectedRadioButton("tv")}
                />
                <label style={{ marginLeft: 5 }} htmlFor="series">
                  Series
                </label>
              </li>
            </ul>
          </div>
          <div className="timespan" style={{margin: 0}}>
            <h4
              onClick={() => setTimespanOpen(!timespanOpen)}
              style={{
                borderBottom: timespanOpen ? "2px solid var(--primary)" : 0,
                borderTop: timespanOpen ? 0 : "2px solid var(--primary)",
                transition: "border 0.3s ease-in-out",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Period
              <span
                style={{
                  transform: timespanOpen ? "rotateZ(-180deg)" : "",
                  transition: "transform 0.3s ease-in-out",
                  marginTop: 2,
                }}
              >
                <BsFillCaretDownFill />
              </span>
            </h4>
            <br />
            <ul
              className="timespan-list"
              style={{
                listStyleType: "none",
                paddingLeft: 0,
                height: timespanOpen ? 50 : 0,
                transition: "height 0.3s ease-in-out",
                overflow: "hidden",
              }}
            >
              <li>
                <input
                className="sort-radio"
                  type="radio"
                  name="timespan"
                  id="day"
                  onClick={() => selectedTimespan("day")}
                />
                <label style={{ marginLeft: 5 }} htmlFor="day">
                  Day
                </label>
              </li>
              <li>
                <input
                className="sort-radio"
                  type="radio"
                  name="timespan"
                  id="week"
                  onClick={() => selectedTimespan("week")}
                />
                <label style={{ marginLeft: 5 }} htmlFor="week">
                  Week
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSideNav;
