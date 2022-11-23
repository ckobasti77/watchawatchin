import React from "react";
import { BsArrowsAngleContract } from "react-icons/bs";
import "./Modal.css";

const Modal = (props) => {
  return (
    <div
      className="modal-container"
      onClick={props.changeModal}
    >
      <div
        className="modal-body"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `url("http://image.tmdb.org/t/p/original${props.backdrop_path}")`,
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="modal-header">
          <h2 style={{ letterSpacing: "1px" }}>{props.title}</h2>
          <span onClick={props.changeModal}>
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
                props.video.length > 0
                  ? props.video[0].key
                  : "none"
              }?rel=0&autoplay=1&allowfullscreen`}
              frameborder="0"
              style={{ borderRadius: "12.5px" }}
              className="trailer"
              allowFullScreen
            ></iframe>
          </div>
          <div className="modal-right col-xs-12 col-lg-4 ">
            <p className="overview">{props.overview}</p>
            <p className="release-date">Release date: {props.release_date}</p>
            <p className="language">
              Language: {props.original_language.toUpperCase()}
            </p>
            <p className="runtime">Runtime: {props.runtime} minutes</p>
            <p className="budget">
              Budget:{" "}
              {props.budget === 0 ? "unknown" : `${props.budget.toLocaleString()}€`}
            </p>
            <div className="genres-vote d-flex justify-content-between align-items-end">
              <ul
                className="genres"
                style={{ padding: 0, listStyleType: "one" }}
              >
                <span style={{ fontSize: "1.3rem", fontWeight: "600" }}>
                  Genres:
                </span>
                <br />
                {props.genres.map((genre) => {
                  return (
                    <li style={{ paddingLeft: 0, display: "block" }}>
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

export default Modal;
