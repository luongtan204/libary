import React, { useEffect, useState } from "react";
import axios from "axios";
export default function useFetch(url) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          setError(err);
          setLoading(false);
        }
      });
  }, [url]);
  return { data, loading, error };
}
