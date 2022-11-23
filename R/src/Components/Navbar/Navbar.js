import { NavLink, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import './Navbar.css';
import { useNavigate } from "react-router-dom";

const Navbar = ({signedInFlag}) => {
  const [active, setActive] = useState(false);

  
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <nav className="navbar navbar-expand-xl navbar-wrapper position-sticky p-0">
      <div className="container-fluid mx-5">
        <Link to="/" className="navbar-brand" onClick={() => scrollToTop()}>
          <img src="/./img/logo.png" alt="logo" className="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setActive(!active)}
        >
          <div id="burger" className={active ? "active-burger" : ""}>
            <span style={{backgroundColor:"#752092"}}></span>
            <span></span>
            <span style={{backgroundColor:"#752092"}}></span>
          </div>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" p>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  isActive ? "link nav-link active" : "link nav-link"
                }
                onClick={() => scrollToTop()}
              >
                movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/series"
                className={({ isActive }) =>
                  isActive ? "link nav-link active" : "link nav-link"
                }
                onClick={() => scrollToTop()}
              >
                series
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/trending"
                className={({ isActive }) =>
                  isActive ? "link nav-link active" : "link nav-link"
                }
                onClick={() => scrollToTop()}
              >
                trending
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  isActive ? "link nav-link active" : "link nav-link"
                }
                onClick={() => scrollToTop()}
              >
                search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/more"
                className={({ isActive }) =>
                  isActive ? "link nav-link active" : "link nav-link"
                }
                onClick={() => scrollToTop()}
              >
                more
              </NavLink>
            </li>
          </ul>
          <div className="d-flex gap-3">
            <Link to="signinup" className="login">Sign In</Link>
            <Link to="getwawpro" className="pro-ver" onClick={() => scrollToTop()}>Get WaWPro</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
