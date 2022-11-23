import React from "react";
import "./TheLastOfUs.css";

const TheLastOfUs = () => {
  return (
    <div className="tlou-wrapper">
      <div className="container">
          <div className="left">
            <iframe
              width="672"
              height="378"
              src="https://www.youtube.com/embed/rBRRDpQ0yc0"
              title="The last of Us"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="right">
            <span>Premieres 2023</span>
            <h2>The Last of Us</h2>
            <p>
              A series based on the critically acclaimed video game -- and
              starring Pedro Pascal and Bella Ramsey, among others -- is coming
              to WaW and Waw Pro.
            </p>
          </div>
      </div>
    </div>
  );
};

export default TheLastOfUs;
