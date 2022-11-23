import React, { useState, useEffect } from "react";
import SingleCard from "../../Components/SingleCard";
import ModalLatest from "../../Components/Modal/ModalLatest";

const SeriesRender = ({ selectedSort, selectedGenres }) => {
  const apiKey = `5dc8da9950191123fe0a706966b868bb`;
  const [series, setSeries] = useState([]);
  const [modal, setModal] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [paginationLoader, setPaginationLoader] = useState(false);


  async function changeModal(id) {
    await fetch(
      `
      https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
    )
      .then((response) => response.json())
      .then(
        (response) => response !== "undefined" && setModal((prev) => [response])
      );

    console.log(modal);
    setOpenModal((prev) => !prev);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${selectedSort}?api_key=${apiKey}&language=en-US&page=${page}&with_genres=${selectedGenres.join(
            ","
          )}`
        );
        const dataJson = await res.json();
        const data = { ...dataJson }.results;
        setSeries((pre) => [...pre, ...data.slice(0, 18)]);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [offset, selectedSort, selectedGenres]);

  useEffect(() => {
    setSeries([]);
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

  return (
    <div className="movies-wrapper">
      <div className="container-fluid">
        <div className="movies">
          {series?.map((single) => {
            return (
              <SingleCard
                id={single.id}
                changeModal={changeModal}
                poster_path={single.poster_path}
                title={single.name}
                release_date={single.first_air_date.slice(0,4)}
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
          modal
            .filter((m) => m != undefined)
            .map((one) => {
              return (
                <ModalLatest
                  changeModal={changeModal}
                  backdrop_path={one.backdrop_path}
                  name={one.name}
                  video={
                    one.videos.results.length > 0
                      ? one.videos.results[0].key
                      : "05DqIGS_koU"
                  }
                  overview={
                    one.overview ? one.overview : "No overview updated yet."
                  }
                  first_air_date={one.first_air_date}
                  last_air_dated={one.last_air_date}
                  episode_run_time={one.episode_run_time}
                  original_language={one.original_language.toUpperCase()}
                  number_of_seasons={one.number_of_seasons}
                  number_of_episodes={one.number_of_episodes}
                  genres={one.genres}
                  vote_average={one.vote_average}
                />
              );
            })}
      </div>
    </div>
  );
};

export default SeriesRender;

