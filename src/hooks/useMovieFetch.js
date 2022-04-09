import { useState, useEffect, useCallback } from "react";

//  API
import API from "../API";

const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMovie = useCallback(async () => {
    try {
      setError(false);
      setLoading(false);

      const movie = await API.fetchMovie(movieId);
      const credits = await API.fetchCredits(movieId);

      //  Get directors
      const directors = credits.crew.filter(
        (member) => member.job === "Director"
      );

      setState({
        ...movie,
        actors: credits.cast,
        directors,
      });
    } catch (error) {
      setError(true);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovie();
  }, [movieId, fetchMovie]);

  return { state, loading, error };
};

export default useMovieFetch;