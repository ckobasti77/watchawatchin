import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((response) => setData({...response}.results))
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      });
  }, [url]);

  return {data, loading, error};
};

export default useFetch;
