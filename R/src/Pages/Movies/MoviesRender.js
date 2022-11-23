import React, { useState, useEffect } from "react";
import { BsArrowsAngleContract } from "react-icons/bs";
import "./Movies.css";
import Modal from "../../Components/Modal/Modal";
import SingleCard from "../../Components/SingleCard";
import ModalLatest from "../../Components/Modal/ModalLatest";

const MoviesRender = ({ selectedSort, selectedGenres }) => {
  const apiKey = `5dc8da9950191123fe0a706966b868bb`;
  const [movies, setMovies] = useState([]);
  const [modal, setModal] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [paginationLoader, setPaginationLoader] = useState(false);

  async function changeModal(id) {
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&page=1&append_to_response=videos`
    )
      .then((response) => response.json())
      .then((response) => setModal([response]));

    setOpenModal(!openModal);
  }

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedSort}?api_key=${apiKey}&language=en-US&page=${page}&with_genres=${selectedGenres.join(
            ","
          )}`
        );
        const dataJson = await res.json();
        const data = { ...dataJson }.results;
        setMovies((pre) => [...pre, ...data.slice(0, 18)]);
        // console.log(movies);
        // setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [offset, selectedSort, selectedGenres]);

  useEffect(() => {
    setMovies([]);
  }, [selectedSort, selectedGenres]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        setPaginationLoader(true);
        setPage(page + 1);
        setTimeout(() => {
          setOffset(offset + 5);
          setPaginationLoader(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  // if (loading === true)
  //   return (
  //     <div className="preloader-container">
  //       <h1>Loading . . .</h1>
  //     </div>
  //   );
  if (error) console.log(error);

  return (
    <div className="movies-wrapper">
      <div className="container-fluid">
        <div className="movies">
          {movies?.map((single) => {
            return (
              <SingleCard
                id={single.id}
                changeModal={changeModal}
                poster_path={single.poster_path}
                title={single.title}
                release_date={single.release_date.slice(0, 4)}
                vote_average={single.vote_average}
              />
            );
          })}
        </div>
        <div class="mini-loader mt-3" style={{opacity: paginationLoader ? "1" : "0"}}>
          <div class="krug"></div>
          <div class="krug"></div>
          <div class="krug"></div>
        </div>
        {openModal &&
          modal.map((one) => {
            return (
              <ModalLatest
                changeModal={changeModal}
                backdrop_path={one.backdrop_path}
                title={one.title}
                video={
                  one.videos.results.length > 0
                    ? one.videos.results[0].key
                    : "05DqIGS_koU"
                }
                overview={one.overview}
                release_date={one.release_date}
                original_language={one.original_language.toUpperCase()}
                runtime={one.runtime}
                budget={one.budget}
                genres={one.genres}
                vote_average={one.vote_average}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MoviesRender;
