import React, { useEffect } from "react";

//skeleton

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

//

const SingleCard = (props) => {
  return (
    <div
      className="single-card"
      onClick={() => props.changeModal(props.id, props.media_type)}
    >
      <div className="backface">
        <h5 style={{ fontSize: "1.5rem" }}>
          Watch now
          <br />
          <span>
            <img src="./img/logo.png" alt="see-more" />
          </span>
        </h5>
      </div>
      <img
        src={
          props.poster_path
            ? `http://image.tmdb.org/t/p/w500${props.poster_path}`
            : "/./img/no-image-avaible.jpg"
        }
        alt="single-pic"
      />
      <h5>{<Skeleton /> || props.title ? props.title : props.name}</h5>
      <div className="rate-div">
        <span>
          {props.release_date ? props.release_date : props.first_air_date}
        </span>
        <span>
          {props.vote_average}
          <img src="./img/rate-star.png" alt="rate-star" />
        </span>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default SingleCard;
