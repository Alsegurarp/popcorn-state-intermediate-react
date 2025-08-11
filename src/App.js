import { useState, useEffect } from "react";


const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Navbar({children}){

  return(
        <nav className="nav-bar">
          {children}
      </nav>
  )
}

  function Logo(){

    return(
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
    )
  }

  function Search({query, setQuery}){

      return(
              <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
    )
  }

  function NumResultsMovies({movies}){
    return(
          <p className="num-results">
            Found <strong>{movies.length}</strong> results
          </p>
    )

  }

//  const myKey = "fe2d4d6";

  
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSelectedMovie(id){
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie(){
    setSelectedId(null);
  }

  useEffect( function (){
    async function fetchMovies(){
    
    try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
        `https://www.omdbapi.com/?apikey=fe2d4d6&s=${query}`
        );
        if(!res.ok)
          throw new Error("Something went wrong with fetching movies!")

        const data = await res.json();

        if(data.Response === "False") throw new Error ("Movie not found");

        setMovies(data.Search);
      } catch(err) {
        setError(err.message)
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
  }, [query]);

  return (
    <>
      <Navbar >
          <Logo />
          <Search query={query} setQuery={setQuery} />
          <NumResultsMovies movies={movies} />   
      </Navbar>

      <TotalMoviesContainer>
        <BoxConditional>
          { isLoading && <Loader /> } 
          {!isLoading && !error && <MapTotalMovies movies={movies} handleSelectedMovie={handleSelectedMovie} />}
          {error && <ErrorMessage message={error} />}

        </BoxConditional>

        <BoxConditional>
          { selectedId ? 
          <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} /> : 
          (<>
            <MoviesSummary watched={watched} />
            <WatchedMoviesList watched={watched} />
          </>)
          }
        </BoxConditional>
      </TotalMoviesContainer>
    </>
  );
}

function Loader(){

  return(
    <p className="loader">Loading...</p>
  )
}

function ErrorMessage({message}){

  return(
    <p className="error">
      <span>🔴</span>
      {message}
      <span>🔴</span>
    </p>
  )
}

function TotalMoviesContainer({children}){

  return(
    <main className="main">
        {children}
    </main>
  )
}

function BoxConditional({ children }){
  const [isOpen, setIsOpen] = useState(true);

  return(
    <div className="box">
      <button
      className="btn-toggle"
      onClick={() => setIsOpen((open) => !open)}
      >
      {isOpen ? "–" : "+"}
      </button>
    {isOpen && children}
    </div>

  )
}

function MapTotalMovies({movies, handleSelectedMovie}){

  return(
  <ul className="list list-movies">
    {movies?.map((movie) => (
      <Movie movie={movie} key={movie.imdbID} handleSelectedMovie={handleSelectedMovie} />
    ))}
  </ul>
  )
}

function Movie({movie, handleSelectedMovie}){

  return(
         <li onClick={() => handleSelectedMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
  )
}

function MovieDetails({selectedId, onCloseMovie}){

  return(
    <div className="details">
      <p>
        {selectedId}  
      </p>  
    
      <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
    </div>
  )
}

function MoviesSummary({watched}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));


  return(
    <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                  </p>
                </div>
              </div>
    )
}

function WatchedMoviesList({watched}){

  return(
    <ul className="list">
        {watched.map((movie) => (
        <WatchedMovieUnit movie={movie} key={movie.Title}/>
      ))}
    </ul>

  )
}

function WatchedMovieUnit({movie}){

  return(
        <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  )
}


