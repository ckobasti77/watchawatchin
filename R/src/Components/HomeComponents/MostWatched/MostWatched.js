import React from "react";
import "./MostWatched.css";
import MostWatchedData from "./MostWatchedData";

const MostWatched = () => {
  return (
    <div className="toprated-wrapper">
      <div className="container">
        <h2>Greatest of all Time</h2>
        <div className="toprated-cards">
          {MostWatchedData.map((single) => {
            return (
              <div className="single-card">
                <img src={single.image} alt="single-pic" />
                <h4>{single.title}</h4>
                <p>{single.desc}</p>
                <div className="button-rate-div">
                  <span>{single.year}</span>
                  <span>
                    {single.rate}
                    <img src="./img/rate-star.png" alt="rate-star" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MostWatched;
