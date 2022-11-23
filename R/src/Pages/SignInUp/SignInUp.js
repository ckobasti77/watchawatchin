import React, { useEffect, useState, useRef } from "react";
import useAuth from "../../CustomHooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useLocalStorage from "../../CustomHooks/useLocalStorage";

import "./SignInUp.css";
import axios from "../../axios";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useRefreshToken from "../../CustomHooks/useRefreshToken";

const REGISTER_URL = "/register";
const LOGIN_URL = "/auth";
const REFRESH_URL = "/refresh";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3,23}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;

const SignInUp = ({ setSignedIn }) => {
  const [right, setRight] = useState(false);
  // const [allUsers, setAllUsers] = useState([]);

  // REGISTRATION
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setmatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, pwd, matchPwd]);

  //REGISTER

  const userRef = useRef();
  const errRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    setUser({ username: username, email: email, password: pwd });
    console.log(user);
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user: username, email: email, pwd: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true
        }
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      // setErrMsg(error)
      if (err.response?.status === 423) {
        setErrMsg("Username and Email Already Taken");
      } else if (err.response?.status === 422) {
        setErrMsg("Email Already Taken");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Already Taken");
      }
      errRef.current.focus();
    }
  };

  // LOGIN
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/auth";

  const userRefLog = useRef();
  const errRefLog = useRef();

  const [userLog, setUserLog] = useState("");
  const [pwdLog, setPwdLog] = useState("");
  const [errMsgLog, setErrMsgLog] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsgLog("");
  }, [userLog, pwdLog]);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user: userLog, pwd: pwdLog }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("roles", accessToken);
      }
      setAuth({ userLog, pwdLog, roles, accessToken });
      setUserLog("");
      setPwdLog("");
      // setSuccessLog(true);
      navigate(from, { replace: true });
    } catch (err) {
      if (err.response?.status === 400) {
        setErrMsgLog("Fill the Blank Inputs");
      } else if (err.response?.status === 401) {
        setErrMsgLog("Invalid Username or Password");
      }
      errRefLog.current.focus();
    }
  };

  //Refresh

  const refresh = useRefreshToken();
  const [userInput, setUserInput] = useLocalStorage("userLog", "");

  // const togglePersist = () => {
  //   setPersist(prev => !prev)
  // }

  // useEffect(() => {
  //   localStorage.setItem("persist" persist)
  // }, [persist])

  return (
    <div className="signinup-wrapper">
      <div
        className={
          right ? "right-panel-active signinup-container" : "signinup-container"
        }
        id="container"
      >
        <>
          {success ? (
            <div className="form-container sign-up-container">
              <h1>Registration successfull!</h1>
              <button
                className="ghost"
                id="signIn2"
                onClick={() => setRight(false)}
              >
                Sign In
              </button>
            </div>
          ) : (
            <div className="form-container sign-up-container">
              <form onSubmit={handleSubmit}>
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <h1>Create Account for free</h1>
                <div>
                  <div>
                    <span className={validUsername ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={
                        validUsername || !username ? "hide" : "invalid"
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    aria-invalid={validUsername ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                    placeholder="Username"
                    style={{ width: "80%" }}
                    value={username}
                  />
                </div>
                <p
                  id="udidnote"
                  className={
                    usernameFocus && username && !validUsername
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters. <br />
                  Must begin with a letter. <br />
                  Letters, numbers and underscores allowed.
                </p>
                <div>
                  <div>
                    <span className={validEmail ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validEmail || !email ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </div>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="Email"
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                    style={{ width: "80%" }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />
                </div>
                <div>
                  <div>
                    <span className={validPwd ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </div>
                  <input
                    type="password"
                    id="password"
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    placeholder="Password"
                    style={{ width: "80%" }}
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                </div>
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters. <br />
                  Must include numbers and any type of letters.
                  <br />
                </p>
                <div>
                  <div>
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={validMatch || !matchPwd ? "hide" : "invalid"}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </div>
                  <input
                    type="password"
                    id="confirm_password"
                    placeholder="Confirm password"
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    style={{ width: "80%" }}
                    onChange={(e) => setmatchPwd(e.target.value)}
                    value={matchPwd}
                  />
                </div>
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match password above.
                  <br />
                </p>
                <button
                  style={{
                    marginLeft: 35
                  }}
                  disabled={
                    !validUsername || !validPwd || !validMatch ? true : false
                  }
                >
                  Sign Up
                </button>
              </form>
            </div>
          )}
        </>
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <p
              ref={errRefLog}
              className={errMsgLog ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsgLog}
            </p>
            <h1>Sign In</h1>
            <input
              type="text"
              id="username"
              ref={userRefLog}
              autoComplete="off"
              placeholder="Username"
              style={{ width: "100%" }}
              onChange={(e) => {
                setUserLog(e.target.value);
                setUserInput(e.target.value);
              }}
              value={userLog}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              style={{ width: "100%" }}
              onChange={(e) => setPwdLog(e.target.value)}
              value={pwdLog}
            />
            <button>Sign In</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="signinup-overlay">
            <div className="overlay-panel overlay-left">
              <h1>Already have an account?</h1>
              <p className="my-3">
                Sign in and dive into the Watcha Watchin? world again!
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setRight(false)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Don't have an account?</h1>
              <p className="my-3">
                Take your few minutes and sign up for absolute enjoyment!
              </p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setRight(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInUp;
