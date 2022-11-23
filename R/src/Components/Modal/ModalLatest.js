import React from "react";
import { BsArrowsAngleContract } from "react-icons/bs";

const ModalLatest = (props) => {
  return (
    <div className="modal-container" onClick={props.changeModal} style={{zIndex:1234567}}>
      <div
        className="modal-body"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `url("http://image.tmdb.org/t/p/w1280${props.backdrop_path}")`,
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="modal-header">
          <h2 style={{ letterSpacing: "1px" }}>
            {props.title ? props.title : props.name}
          </h2>
          <span onClick={props.changeModal}>
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
              src={`https://www.youtube.com/embed/${
                props.video
              }?rel=0&autoplay=1&allowfullscreen`}
              frameborder="0"
              style={{ borderRadius: "12.5px" }}
              className="trailer"
              allowFullScreen
            ></iframe>
          </div>
          <div className="modal-right col-xs-12 col-lg-4 ">
            <p className="overview">{props.overview}</p>
            {props.release_date ? (
              <p className="release-date">
                Release date:{" "}
                {props.release_date ? props.release_date : props.first_air_date}
              </p>
            ) : (
              <p className="first-air-date">
                First air date: {props.first_air_date}
              </p>
            )}
            {props.last_air_date && (
              <p className="last-air-date">
                Last air date: {props.last_air_date}
              </p>
            )}
            <p className="language">Language: {props.original_language}</p>
            {props.runtime ? (
              <p className="runtime">Runtime: {props.runtime} minutes</p>
            ) : (
              <p className="runtime">
                Episode runtime: {props.episode_run_time[0]} minutes
              </p>
            )}
            {props.number_of_seasons && (
              <p
                className="number-of-seasons"
                style={{ textTransform: "uppercase", display: "flex", alignItems: "center" }}
              >
                <span style={{ fontSize: "1.5rem", color: "#752092",
                    fontWeight: "700", marginRight: 5, }}>
                  {props.number_of_seasons} 
                </span>
                {props.number_of_seasons > 1 ? 'seasons' : 'season'}
              </p>
            )}
            {props.number_of_episodes && (
              <p
                className="number-of-episodes"
                style={{ textTransform: "uppercase", display: "flex", alignItems: "center" }}
              >
                <span
                  style={{
                    fontSize: "1.5rem",
                    color: "#752092",
                    fontWeight: "700",
                    marginRight: 5
                  }}
                >
                  {props.number_of_episodes}
                </span>
                {props.number_of_episodes > 1 ? 'episodes' : 'episode'}
              </p>
            )}
            {props.budget && (
              <p className="budget">
                Budget:
                {props.budget === 0
                  ? "unknown"
                  : ` ${props.budget.toLocaleString()}€`}
              </p>
            )
            }
            <div className="genres-vote d-flex justify-content-between align-items-end">
              <ul
                className="genres"
                style={{ padding: 0, listStyleType: "nprops" }}
              >
                <span style={{ fontSize: "1.3rem", fontWeight: "600" }}>
                  Genres:
                </span>
                <br />
                {props.genres.map((genre) => {
                  return (
                    <li style={{ paddingLeft: 0, display: "block" }}>
                      {" "}
                      {genre.name}
                    </li>
                  );
                })}
              </ul>
              <span className="vote" style={{ fontSize: "2rem" }}>
                {props.vote_average.toFixed(1)}
                <img src="./img/rate-star.png" alt="rate-star" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLatest;
