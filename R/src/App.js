import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./Components/SharedLayout";
import Home from "./Pages/Home";
import Series from "./Pages/Series/Series";
import More from "./Pages/More/More";
import Trending from "./Pages/Trending/Trending";
import SignInUp from "./Pages/SignInUp/SignInUp";
import GetWawPro from "./Pages/GetWawPro/GetWawPro";
import Search from "./Pages/Search/Search";
import Movies from "./Pages/Movies/Movies";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfUse from "./Pages/TermsOfUse/TermsOfUse";
import About from "./Pages/About/About";
import { BsChevronBarUp } from "react-icons/bs";
import { useState, useEffect } from "react";

//Auth imports

import RequireAuth from "./Components/RequireAuth";
import AuthSharedLayout from "./Components/AuthSharedLayout";
import AuthMovies from "./Pages/Movies/AuthMovies";
import AuthSeries from "./Pages/Series/AuthSeries";
import AuthTrending from "./Pages/Trending/AuthTrending";
import AuthSearch from "./Pages/Search/AuthSearch";

//Persist
import PersistLogin from "./Components/PersistLogin";
import Favorites from "./Pages/Favorites/Favorites";
import Settings from "./Components/Account/Account";

function App() {

  
  // PRELOADER

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(true);
    const timeoutID = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeoutID);
  }, []);

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight >= 3000) {
        setShowScrollToTop(true);
      } else if (currentHeight < 3000) {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="app">
      {loading ? (
        <div class="stage">
          <div class="campfire">
            <div class="sparks">
              <div class="spark"></div>
              <div class="spark"></div>
              <div class="spark"></div>
              <div class="spark"></div>
              <div class="spark"></div>
              <div class="spark"></div>
              <div class="spark"></div>
              <div class="spark"></div>
            </div>
            <div class="logs">
              <div class="log">
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
              </div>
              <div class="log">
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
              </div>
              <div class="log">
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
              </div>
              <div class="log">
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
              </div>
              <div class="log">
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
              </div>
              <div class="log">
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
              </div>
              <div class="log">
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
                <div class="streak"></div>
              </div>
            </div>
            <div class="sticks">
              <div class="stick"></div>
              <div class="stick"></div>
              <div class="stick"></div>
              <div class="stick"></div>
            </div>
            <div class="fire">
              <div class="fire__red">
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
              </div>
              <div class="fire__orange">
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
              </div>
              <div class="fire__yellow">
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
              </div>
              <div class="fire__white">
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
                <div class="flame"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <SharedLayout setSignedIn={setSignedIn} signedIn={signedIn} />
              }
            >
              <Route index element={<Home />} />
              <Route path="movies" element={<Movies />} />
              <Route path="series" element={<Series />} />
              <Route path="trending" element={<Trending />} />
              <Route path="more" element={<More />} />
              <Route path="search" element={<Search />} />
              <Route
                path="signinup"
                element={<SignInUp setSignedIn={setSignedIn} />}
              />
              <Route path="getwawpro" element={<GetWawPro />} />
              <Route path="privacypolicy" element={<PrivacyPolicy />} />
              <Route path="termsofuse" element={<TermsOfUse />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route
                  path="/auth"
                  element={<AuthSharedLayout setSignedIn={setSignedIn} />}
                >
                  <Route index element={<Home />} />
                  <Route path="movies+" element={<AuthMovies />} />
                  <Route path="series+" element={<AuthSeries />} />
                  <Route path="trending+" element={<AuthTrending />} />
                  <Route path="more+" element={<More />} />
                  <Route path="search+" element={<AuthSearch />} />
                  <Route path="favorites+" element={<Favorites />} />
                  <Route path="settings+" element={<Settings />} />
                  <Route path="getwawpro+" element={<GetWawPro />} />
                  <Route path="privacypolicy+" element={<PrivacyPolicy />} />
                  <Route path="termsofuse+" element={<TermsOfUse />} />
                  <Route path="about+" element={<About />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      )}
      <button
        className="scrollToTop"
        onClick={() => scrollToTop()}
        style={{ visibility: showScrollToTop ? "visible" : "hidden" }}
        title="Scroll To Top"
      >
        <BsChevronBarUp />
      </button>
    </div>
  );
}

export default App;
