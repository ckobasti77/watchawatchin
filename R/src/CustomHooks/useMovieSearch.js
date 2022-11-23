import { useState, useEffect } from "react";
import axios, { Axios } from "axios";

const useMovieSearch = (term, page) => {
  const apiKey = `5dc8da9950191123fe0a706966b868bb`;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setMovies([])
  }, [term])

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&include_adult=false`,
      params: {query: term, page: page},
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setMovies(prev => {
           return  [...new Set([...prev, response.data.results.map(b => b.poster_path)])]
        })
        setHasMore(response.data.results.length > 0);
        setLoading(false);
        console.log(movies);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [term, page]);
  return {movies, loading, error, hasMore};
};

export default useMovieSearch;
