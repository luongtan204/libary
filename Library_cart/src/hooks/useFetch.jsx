import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          console.log("Request cancelled", err.message);
        } else {
          setError(err.message);
          setLoading(false);
        }
      });
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
