import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./GetWawPro.css";

const GetWawPro = () => {
  return (
    <div className="getwawpro-wrapper">
      <div className="container">
        <h1>Choose your <span>WaWPRO</span> plan</h1>
        <p style={{textAlign: "center"}}>
          Enjoy the most famous blockbusters, the most outstanding stories and
          exclusive originals.
        </p>
        <div className="boxes">
          <div className="single-box d-flex justify-content-between">
            <h4>Pay monthly</h4>
            <span className="price">5.99€</span>
            <span className="monthly">5.99€ / month</span>
            <p className="cancellation">Scheduling plan cancellation anytime.</p>
            <button><Link to="/signinup" style={{color : "#fff"}}>Continue</Link></button>
          </div>
          <div className="single-box">
            <h4>Three months payment</h4>
            <span className="price">14.99€</span>
            <span className="monthly">4.99€ / month</span>
            <span className="save-up">Save up to 17%</span>
            <button><Link to="/signinup" style={{color : "#fff"}}>Continue</Link></button>
          </div>
          <div className="single-box">
            <h4>Six months payment</h4>
            <span className="price">23.99€</span>
            <span className="monthly">3.99€ / month</span>
            <span className="save-up">Save up to 34%</span>
            <button><Link to="/signinup" style={{color : "#fff"}}>Continue</Link></button>
          </div>
          <div className="single-box">
            <h4>Yearly payment</h4>
            <span className="price">35.99€</span>
            <span className="monthly">2.99€ / month</span>
            <span className="save-up">Save up to 50%</span>
            <button><Link to="/signinup" style={{color : "#fff"}}>Continue</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetWawPro;
