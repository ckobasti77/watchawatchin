import { NavLink, Link } from "react-router-dom";
import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import useLogout from "../../CustomHooks/useLogout";
import {
  BsFillCaretDownFill,
  BsArrowBarRight,
  BsFillKeyFill,
  BsBookmarkCheckFill,
} from "react-icons/bs";
import useLocalStorage from "../../CustomHooks/useLocalStorage";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const [userInput, setUserInput] = useLocalStorage("userLog", "");

  const history = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    setUserInput(() => "");
    await logout();
    history("/");
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('roles')
  };

  return (
    <nav className="navbar navbar-expand-xl navbar-wrapper position-sticky p-0">
      <div className="container-fluid mx-5">
        <Link to="/auth" className="navbar-brand" onClick={() => scrollToTop()}>
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
            <span style={{ backgroundColor: "#752092" }}></span>
            <span></span>
            <span style={{ backgroundColor: "#752092" }}></span>
          </div>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" p>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
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
                series
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
            <li className="nav-item">
              <NavLink
                to="/auth/favorites+"
                className={({ isActive }) =>
                  isActive ? "link nav-link active" : "link nav-link"
                }
                onClick={() => scrollToTop()}
              >
                favorites
              </NavLink>
            </li>
          </ul>
          <div className="d-flex gap-3">
            <Link
              to="/auth/getwawpro+"
              className="pro-ver"
              onClick={() => scrollToTop()}
            >
              Get WaWPro
            </Link>
            <button className="user-dropdown" onClick={() => setOpen(!open)} style={{transform: open ? "rotateZ(180deg)" : "rotateZ(0deg)"}}>
              <BsFillCaretDownFill style={{ color: "#fff" }} />
            </button>
          </div>
        </div>
      </div>
        <div className="dropdown-list" style={{transform: open ? "translateX(0) scale(1)" : "translateX(200px) scale(0)", opacity: open ? "1" : "0"}}>
          <h5>{userInput}</h5>
          <hr />
          <NavLink to="/auth/settings+" className="menu-item">
            <span className="drop-icon">
              <BsFillKeyFill />
            </span>
            <span className="drop-text">Account</span>
          </NavLink>
          <NavLink to="/auth/favorites+" className="menu-item">
            <span className="drop-icon">
              <BsBookmarkCheckFill />
            </span>
            <span className="drop-text">Favorites</span>
          </NavLink>
          <a
            href="#"
            onClick={() => {
              signOut();
            }}
            className="menu-item"
          >
            
            <span className="drop-icon">
              <BsArrowBarRight />
            </span>
            <span className="drop-text">Sign out</span>
          </a>
        </div>
    </nav>
  );
};

export default Navbar;
