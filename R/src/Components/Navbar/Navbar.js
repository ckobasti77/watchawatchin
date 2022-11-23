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
  
  // const history = useNavigate();

  // const logOut = () => {
  //   window.localStorage.removeItem("token");
  //   window.localStorage.removeItem("isLoggedIn");
  //   setSignedIn(false);
  // }
  // let loggedIn = window.localStorage.getItem("isLoggedIn");

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
            {/* <li className="nav-item">
              <NavLink
                to="/featured"
                className={({ isActive }) =>
                  isActive ? "link nav-link active" : "link nav-link"
                }
              >
                featured
              </NavLink>
            </li> */}
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
            {/* <span className="search-field"> */}
            {/* <input
              type="text"
              className="search"
              placeholder="Search . . ."
              required
            /> */}

              {/* <BsSearch className="search-icon" style={{color: "#752092"}}/> */}
              {/* </span> */}
            {/* <button onClick={() => history("/")} className="logout" style={{display: signedInFlag ? 'inline-block' : 'none'}}>Sign out</button>
            <Link to="signinup" className="login" style={{display: signedInFlag ? 'none' : 'inline-block'}}>Sign In</Link> */}
            <Link to="signinup" className="login">Sign In</Link>
            {/* <SignInUp /> */}
            <Link to="getwawpro" className="pro-ver" onClick={() => scrollToTop()}>Get WaWPro</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
