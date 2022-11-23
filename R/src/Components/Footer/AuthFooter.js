import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Footer.css";

const AuthFooter = () => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer-wrapper" style={{ zIndex: 9998 }}>
      <div className="container">
        <div className="row">
          <Link to="/auth" className="navbar-brand" onClick={() => scrollToTop()}>
            <img src="/./img/logo.png" alt="logo" className="footer-logo" />
          </Link>
        </div>
        <div className="row">
          <ul>
            <li className="nav-item">
              <NavLink
                to="/auth/movies+"
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
                to="/auth/series+"
                className={({ isActive }) =>
                  isActive ? "link nav-link active" : "link nav-link"
                }
                onClick={() => scrollToTop()}
              >
                tv series
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/auth/trending+"
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
                to="/auth/search+"
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
                to="/auth/more+"
                className={({ isActive }) =>
                  isActive ? "link nav-link active" : "link nav-link"
                }
                onClick={() => scrollToTop()}
              >
                more
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="row">
          <ul>
            <li>
              <NavLink
                to="/auth/about+"
                className={({ isActive }) =>
                  isActive ? "link nav-link active" : "link nav-link"
                }
                onClick={() => scrollToTop()}
              >
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/auth/getwawpro+"
                className={({ isActive }) =>
                  isActive ? "link nav-link active" : "link nav-link"
                }
                onClick={() => scrollToTop()}
              >
                GET WAW PRO
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="row">
          <ul>
            <li>
              <NavLink
                to="/auth/privacypolicy+"
                className={({ isActive }) =>
                  isActive ? "link nav-link active" : "link nav-link"
                }
                onClick={() => scrollToTop()}
              >
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/auth/termsofuse+"
                className={({ isActive }) =>
                  isActive ? "link nav-link active" : "link nav-link"
                }
                onClick={() => scrollToTop()}
              >
                Terms Of Use
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="row">
          <p className="text-center m-0">
            &copy; 2022 WatchaWatchin, Inc. All Rights Reserved
          </p>
          <p className="text-center m-0">
            This website may contain mature content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthFooter;
