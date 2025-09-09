import { useState, useEffect } from "react";


export default function useMovies(query){
    
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

      useEffect( 
    function (){
      async function fetchMovies(){
        const controller = new AbortController();
    
    try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
        `https://www.omdbapi.com/?apikey=fe2d4d6&s=${query}`,
        {signal: controller.signal}
        );
        if(!res.ok)
          throw new Error("Something went wrong with fetching movies!")

        const data = await res.json();

        if(data.Response === "False") throw new Error ("Movie not found");
        // Just if the error is that the movie doesnt exist

        setMovies(data.Search);
        setError("");
      } catch(err) {
        if(err.name !== "AbortError"){
            setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if(query.length < 3){
      setMovies([]);
      setError("");
      return;
    } // Less than 3 characters, im not going to do the research


    fetchMovies();
      return function () {
        const controller = new AbortController();
        controller.abort();
      }
  }, [query]);

  return {movies, isLoading, error}
}