import React, { useState, useEffect } from "react";
import "./Trending.css";
import { BsArrowsAngleContract, BsSuitHeart } from "react-icons/bs";

//Auth

import AuthSingleCard from "../../Components/AuthSingleCard";

const TrendingRender = ({ selectedSort, timespan, selectedGenres }) => {
  const apiKey = `5dc8da9950191123fe0a706966b868bb`;
  const [trending, setTrending] = useState([]);
  const [modal, setModal] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [paginationLoader, setPaginationLoader] = useState(false);

  async function changeModal(id, media_type) {
    await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
    )
      .then((response) => response.json())
      .then((response) => setModal([response]));

    setOpenModal(!openModal);
  }

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/${selectedSort}/${timespan}?api_key=${apiKey}&page=${page}&with_genres=${selectedGenres.join(
            ","
          )}`
        );
        const dataJson = await res.json();
        const data = { ...dataJson }.results;
        setTrending((pre) => [...pre, ...data.slice(0, 18)]);
        // console.log(trending);
        // setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [offset, selectedSort, timespan, selectedGenres]);

  useEffect(() => {
    setTrending([]);
  }, [selectedSort, timespan, selectedGenres]);

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

  // if (loading === true)
  //   return (
  //     <div className="preloader-container">
  //       <h1>Loading . . .</h1>
  //     </div>
  //   );
  if (error) console.log(error);

  return (
    <div className="movies-wrapper">
      <div className="container-fluid">
        <div className="movies">
          {trending?.map((single) => {
            return (
              <AuthSingleCard
                media_type={single.media_type}
                id={single.id}
                changeModal={changeModal}
                poster_path={single.poster_path}
                title={single.title ? single.title : single.name}
                release_date={
                  single.release_date
                    ? single.release_date.slice(0, 4)
                    : single.first_air_date.slice(0, 4)
                }
                vote_average={single.vote_average.toFixed(1)}
              />
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
                        title="video"
                        id="ytplayer"
                        type="text/html"
                        width="840"
                        height="450"
                        quality="144p"
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
                          Episode runtime: {one.episode_run_time[0]} minutes
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
                          </span>
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
                            : ` ${one.budget.toLocaleString()}€`}
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
                              <li style={{ paddingLeft: 0, display: "block" }}>
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
  );
};

export default TrendingRender;
