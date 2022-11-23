import { useState, useEffect } from "react";
import axios, { Axios } from "axios";

const usePagination = (page) => {
  const apiKey = `5dc8da9950191123fe0a706966b868bb`;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

//   useEffect(() => {
//     setMovies([])
//   }, [term])

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&`,
      params: {page: page},
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setData(prev => {
           return  [...new Set([...prev, response.data.results.map(b => b.poster_path)])]
        })
        setHasMore(response.data.results.length > 0);
        setLoading(false);
        console.log(data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [page]);
  return {data, loading, error, hasMore};
};

export default usePagination;
