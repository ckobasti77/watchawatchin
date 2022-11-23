import React, { useState, useEffect } from "react";

const M3gan = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = "Januar, 13, 2023";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tlou-wrapper">
      <div className="container">
        <div className="left">
          <h2>M3GAN</h2>
          <p>
            A robotics engineer at a toy company builds a life-like doll that
            begins to take on a life of its own ...
          </p>
          <h5>Premieres</h5>
          <div className="timer" role="timer">
            <div className="col-3">
              <div className="box">
                <p id="day">{days < 10 ? "0" + days : days}</p>
                <span className="text">Days</span>
              </div>
            </div>
            <div className="col-3">
              <div className="box">
                <p id="hour">{hours < 10 ? "0" + hours : hours}</p>
                <span className="text">Hours</span>
              </div>
            </div>
            <div className="col-3">
              <div className="box">
                <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
                <span className="text">Minutes</span>
              </div>
            </div>
            <div className="col-3">
              <div className="box">
                <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
                <span className="text">Seconds</span>
              </div>
            </div>
          </div>
          {/* <button>Find out more</button> */}
        </div>
        <div className="right">
          <iframe
            width="672"
            height="378"
            src="https://www.youtube.com/embed/BRb4U99OU80"
            title="M3GAN"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default M3gan;
