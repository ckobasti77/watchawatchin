import React, { useState } from "react";
import "./SeriesTrending.css";
import { BsArrowsAngleContract } from "react-icons/bs";
import useFetch from "../../../CustomHooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Controller } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import 'swiper'

const SeriesTrending = () => {
  const apiKey = `5dc8da9950191123fe0a706966b868bb`;
  const [modal, setModal] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  async function changeModal(id) {
    await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US&page=1&append_to_response=videos`
    )
      .then((response) => response.json())
      .then((response) => setModal([response]));
      console.log(modal);
    setOpenModal(!openModal);
  }

  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`
  );
  if (loading) return <div>Loading...</div>;
  if (error) return console.log(error);

  return (
    <div className="container-fluid p-4 justify-content-center series-trending">
      <div className="container">
        <h2 className="text-center">Trending series this Week</h2>
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className="mySwiper"
          slidesPerView={5.5}
          spaceBetween={20}
          breakpoints={{
            1200: {
                slidesPerView: 5.5
            },
            992: {
                slidesPerView: 4.5
            },
            768: {
                slidesPerView: 3.5
            },
            576: {
                slidesPerView: 2.5
            },
            320: {
                slidesPerView: 1.5
            }
          }}
        >
          {data?.map((single) => {
            return (
              <SwiperSlide className="single-card" onClick={() => changeModal(single.id)}>
                {/* <div className="single-card"> */}
                <div className="backface">
                  <h5>
                    Click to see more <br />
                    <span>
                      <img src="./img/logo.png" alt="see-more" />
                    </span>
                  </h5>
                </div>
                <img
                  src={`http://image.tmdb.org/t/p/w500${single.poster_path}`}
                  alt="single-pic"
                />
                <h5>{single.name}</h5>
                <div className="rate-div">
                  <span>{single.first_air_date.slice(0, 4)}</span>
                  <span>
                    {single.vote_average.toFixed(1)}
                    <img src="./img/rate-star.png" alt="rate-star" />
                  </span>
                </div>
                <div className="overlay"></div>
                {/* </div> */}
              </SwiperSlide>
            );
          })}
        </Swiper>
        {openModal &&
          modal.map((one) => {
            return (
              <div className="modal-container" style={{zIndex: 123456}} onClick={changeModal}>
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
                    <h2 style={{ letterSpacing: "1px", margin: 0 }}>{one.name}</h2>
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
                        <p className="last-air-date">
                          Last air date: {one.last_air_date}
                        </p>
                        <div className="runtime">
                          Episode runtime: {one.episode_run_time[0]} minutes
                        </div>
                        <p className="language">
                          Language: {one.original_language.toUpperCase()}
                        </p>
                        <p className="number-of-seasons" style={{textTransform: "uppercase"}}>
                          <span style={{fontSize: "1.2rem", color: "#752092"}}>{one.number_of_seasons}</span> seasons
                        </p>
                        <p className="number-of-episodes" style={{textTransform: "uppercase"}}>
                          <span style={{fontSize: "1.2rem", color: "#752092"}}>{one.number_of_episodes}</span> episodes
                        </p>
                      <div className="genres-vote d-flex justify-content-between align-items-end">
                        <ul
                          className="genres"
                          style={{ padding: 0, listStyleType: "none" }}
                        >
                          <span
                            style={{ fontSize: "1.3rem", fontWeight: "600" }}
                          >
                            Genres:
                          </span><br />
                          {one.genres.map((genre) => {
                            return <li style={{paddingLeft: 0, display: "block"}}> {genre.name}</li>;
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
          })}
      </div>
    </div>
  );
};

export default SeriesTrending;
