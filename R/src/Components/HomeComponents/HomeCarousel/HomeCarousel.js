import React, { useState, useEffect } from "react";
import "./HomeCarousel.css";

const HomeCarousel = () => {
  const apiKey = `5dc8da9950191123fe0a706966b868bb`;
  const [first, setFirst] = useState([]);
  const [content, setContent] = useState([]);
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
        );
        const dataJson = await res.json();
        const data = { ...dataJson }.results;
        setData(data);
      } catch (error) {
        console.log(error);
      } 
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => setFirst(data.slice(0, 1)[0]), 500);
  }, [data]);

  useEffect(() => {
    setTimeout(() => setContent(data.slice(1)), 500);
  }, [data]);

  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="5000">
          <img
            src={`http://image.tmdb.org/t/p/w1280${{ ...first }.backdrop_path}`}
            className="d-block w-100"
            alt="..."
          />
          <div className="slide-content">
            <h2 className="slide-title">
              {{ ...first }.title ? { ...first }.title : { ...first }.name}
            </h2>
            <p className="slide-desc">{{ ...first }.overview}</p>
          </div>
          <div className="carousel-overlay"></div>
        </div>
        {content.map((single) => {
          return (
            <div className="carousel-item" data-bs-interval="5000">
              <img
                src={`http://image.tmdb.org/t/p/w1280${single.backdrop_path}`}
                className="d-block w-100"
                alt="..."
              />

              <div className="slide-content">
                <h2 className="slide-title">
                  {single.title ? single.title : single.name}
                </h2>
                <p className="slide-desc">{single.overview}</p>
              </div>
              <div className="carousel-overlay"></div>
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
        style={{ zIndex: 1000 }}
      >
        <div className="prev-arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
        style={{ zIndex: 1000 }}
      >
        <div className="next-arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HomeCarousel;
