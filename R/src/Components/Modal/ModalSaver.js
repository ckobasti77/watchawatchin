import React from "react";

const ModalSaver = () => {
  return (
    <div className="modal-container" onClick={changeModal}>
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
          <h2 style={{ letterSpacing: "1px" }}>{one.name}</h2>
          <span onClick={changeModal}>
            <BsArrowsAngleContract />
          </span>
        </div>
        <div className="modal-content row">
          <div className="modal-left col-xs-12 col-md-8">
            <iframe
              id="ytplayer"
              type="text/html"
              width="840"
              height="450"
              src={`https://www.youtube.com/embed/${one.videos.results[0].key}?rel=0&autoplay=1&allowfullscreen`}
              frameborder="0"
              style={{ borderRadius: "12.5px" }}
              className="trailer"
              allowFullScreen
            ></iframe>
          </div>
          <div className="modal-right col-xs-12 col-md-4 ">
            <p className="overview">{one.overview}</p>
            <p className="first-air-date">
              First air date: {one.first_air_date}
            </p>
            <p className="last-air-date">Last air date: {one.last_air_date}</p>
            <div className="runtime">
              Episode runtime: {one.episode_run_time[0]} minutes
            </div>
            <p className="language">
              Language: {one.original_language.toUpperCase()}
            </p>
            <p
              className="number-of-seasons"
              style={{ textTransform: "uppercase" }}
            >
              <span style={{ fontSize: "1.2rem", color: "#752092" }}>
                {one.number_of_seasons}
              </span>{" "}
              seasons
            </p>
            <p
              className="number-of-episodes"
              style={{ textTransform: "uppercase" }}
            >
              <span style={{ fontSize: "1.2rem", color: "#752092" }}>
                {one.number_of_episodes}
              </span>{" "}
              episodes
            </p>
            <div className="genres-vote d-flex justify-content-between align-items-end">
              <ul
                className="genres"
                style={{ padding: 0, listStyleType: "none" }}
              >
                <span style={{ fontSize: "1.3rem", fontWeight: "600" }}>
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
              <span className="vote" style={{ fontSize: "2rem" }}>
                {one.vote_average.toFixed(1)}
                <img src="./img/rate-star.png" alt="rate-star" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSaver;
