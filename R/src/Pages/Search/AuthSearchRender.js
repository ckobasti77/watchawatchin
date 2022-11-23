import React, { useState, useEffect } from "react";
import { BsArrowsAngleContract, BsXLg, BsSuitHeart } from "react-icons/bs";
import "./Search.css";
import "../Movies/Movies.css";

const SearchRender = ({ selectedSort, selectedGenres }) => {
  const apiKey = `5dc8da9950191123fe0a706966b868bb`;
  const [term, setTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [modal, setModal] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [paginationLoader, setPaginationLoader] = useState(false);

  async function changeModal(id) {
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&page=1&append_to_response=videos`
    )
      .then((response) => response.json())
      .then((response) => setModal([response]));

    setOpenModal(!openModal);
  }

  const handleSearch = async () => {
    if (term.length > 0) {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/${selectedSort}?api_key=${apiKey}&language=en-US&page=${page}&include_adult=true&query=${term}&with_genres=${selectedGenres.join(
            ","
          )}`
        );
        const dataJson = await res.json();
        const data = { ...dataJson }.results;
        // console.log(data);
        setMovies((pre) => [...pre, ...data.slice(0, 18)]);
      } catch (error) {
        setError(error);
      }
    }
  };
  useEffect(() => {
    handleSearch();
  }, [offset, selectedSort, selectedGenres]);

  const deleteInput = () => {
    setMovies([]);
    document.querySelector(".searchInput").value = "";
  };

  useEffect(() => {
    setMovies([]);
  }, [selectedSort, selectedGenres]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        setPaginationLoader(true);
        setPage(page + 1);
        setTimeout(() => {
          setOffset(offset + 5);
          setPaginationLoader(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  if (error) console.log(error);

  return (
    <div className="search-container">
      <form
        action=""
        onKeyUp={(e) => {
          e.preventDefault();
          handleSearch();
          setMovies([]);
        }}
      >
        <input
          className="searchInput"
          type="text"
          placeholder={
            selectedSort === "movie"
              ? "Search movies . . ."
              : "Search series . . ."
          }
          onChange={(e) => setTerm(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteInput();
          }}
        >
          <BsXLg />
        </button>
      </form>
      <div className="movies-wrapper">
        <div className="container-fluid">
          <div className="movies">
            {movies?.map((single) => {
              return (
                <div
                  className="single-card"
                  onClick={() => changeModal(single.id)}
                >
                  <div className="backface">
                    <h5>
                      Click to see more <br />
                      <span>
                        <img src="/./img/logo.png" alt="see-more" />
                      </span>
                    </h5>
                  </div>
                  <img
                    src={
                      single.poster_path
                        ? `http://image.tmdb.org/t/p/w500${single.poster_path}`
                        : "/./img/no-image-avaible.jpg"
                    }
                    alt="single-pic"
                  />
                  <h5>{single.title ? single.title : single.name}</h5>
                  <div className="rate-div">
                    <span className="first">
                      {single.release_date
                        ? single.release_date.slice(0, 4)
                        : single.first_air_date}
                    </span>

                    {/* <span className="second">
                      <img src="/./img/favorite.png" alt="fav" />
                    </span> */}

                    <span className="third">
                      {single.vote_average.toFixed(1)}
                      <img src="/./img/rate-star.png" alt="rate-star" />
                    </span>
                  </div>
                  <div className="overlay"></div>
                </div>
              );
            })}
          </div>
          <div
            class="mini-loader mt-3"
            style={{ opacity: paginationLoader ? "1" : "0" }}
          >
            <div class="krug"></div>
            <div class="krug"></div>
            <div class="krug"></div>
          </div>
          {openModal &&
            modal.map((one) => {
              return (
                <div
                  className="modal-container"
                  onClick={changeModal}
                  style={{ zIndex: 9999 }}
                >
                  <div
                    className="modal-body"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      background: `url("http://image.tmdb.org/t/p/w1280${one.backdrop_path}")`,
                      backgroundPosition: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="modal-header">
                      <h2 style={{ letterSpacing: "1px" }}>
                        {one.title ? one.title : one.name}
                      </h2>
                      <span onClick={changeModal}>
                        <BsArrowsAngleContract />
                      </span>
                    </div>
                    <div className="modal-content row">
                      <div className="modal-left col-xs-12 col-lg-8">
                        <iframe
                          id="ytplayer"
                          type="text/html"
                          width="840"
                          height="450"
                          src={`https://www.youtube.com/embed/${
                            one.videos.results.length > 0
                              ? one.videos.results[0].key
                              : "05DqIGS_koU"
                          }?rel=0&autoplay=1&allowfullscreen`}
                          frameborder="0"
                          style={{ borderRadius: "12.5px" }}
                          className="trailer"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="modal-right col-xs-12 col-lg-4 ">
                        <p className="overview">{one.overview}</p>
                        {one.release_date ? (
                          <p className="release-date">
                            Release date:{" "}
                            {one.release_date
                              ? one.release_date
                              : one.first_air_date}
                          </p>
                        ) : (
                          <p className="first-air-date">
                            First air date: {one.first_air_date}
                          </p>
                        )}
                        {one.last_air_date && (
                          <p className="last-air-date">
                            Last air date: {one.last_air_date}
                          </p>
                        )}
                        <p className="language">
                          Language: {one.original_language.toUpperCase()}
                        </p>
                        {one.runtime ? (
                          <p className="runtime">
                            Runtime: {one.runtime} minutes
                          </p>
                        ) : (
                          <p className="runtime">
                            Episode runtime:{" "}
                            {one.episode_run_time
                              ? one.episode_run_time[0]
                              : "0"}{" "}
                            minutes
                          </p>
                        )}
                        {one.number_of_seasons && (
                          <p
                            className="number-of-seasons"
                            style={{ textTransform: "uppercase" }}
                          >
                            <span
                              style={{ fontSize: "1.2rem", color: "#752092" }}
                            >
                              {one.number_of_seasons}
                            </span>{" "}
                            seasons
                          </p>
                        )}
                        {one.number_of_episodes && (
                          <p
                            className="number-of-episodes"
                            style={{ textTransform: "uppercase" }}
                          >
                            <span
                              style={{ fontSize: "1.2rem", color: "#752092" }}
                            >
                              {one.number_of_episodes}
                            </span>{" "}
                            episodes
                          </p>
                        )}
                        {one.budget ? (
                          <p className="budget">
                            Budget:
                            {one.budget === 0
                              ? "unknown"
                              : `${one.budget.toLocaleString()}€`}
                          </p>
                        ) : (
                          <p className="budget">
                            Budget:
                            {one.budget === 0 && `unknown`}
                          </p>
                        )}
                        <div className="genres-vote d-flex justify-content-between align-items-end">
                          <ul
                            className="genres"
                            style={{ padding: 0, listStyleType: "none" }}
                          >
                            <span
                              style={{ fontSize: "1.3rem", fontWeight: "600" }}
                            >
                              Genres:
                            </span>
                            <br />
                            {one.genres.map((genre) => {
                              return (
                                <li
                                  style={{ padding: "1px 0", display: "block" }}
                                >
                                  {" "}
                                  {genre.name}
                                </li>
                              );
                            })}
                          </ul>
                          <span
                            className="vote"
                            style={{
                              fontSize: "2rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <BsSuitHeart
                              style={{ marginRight: 5 }}
                              className="heart"
                            />
                            <span
                              style={{
                                marginRight: 25,
                                fontSize: "0.75rem",
                                textAlign: "center",
                              }}
                            >
                              save to <br />
                              <span
                                style={{
                                  color: "#a83f39",
                                  display: "inline-block",
                                }}
                              >
                                favorites
                              </span>
                            </span>
                            {one.vote_average.toFixed(1)}
                            <img src="/img/rate-star.png" alt="rate-star" />
                          </span>
                        </div>
                        <div className="watch-links">
                          <a
                            href={`https://gledalica.online/movies/${
                              one.title
                                ? one.title.split(" ").join("-")
                                : one.name.split(" ").join("-")
                            }/`}
                            className="watch-link"
                            target="_blank"
                          >
                            Link 1
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchRender;
