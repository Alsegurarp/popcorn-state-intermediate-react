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

  function Search(){
      const [query, setQuery] = useState("");

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
            Found <strong>{movies}</strong> results
          </p>
    )

  }

  const myKey = "fe2d4d6"
  const query = "interstellar";
  const newAPI = `https://www.omdbapi.com/?apikey=${myKey}&s=${query}`


export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect( function (){
    async function fetchMovies(){
      setIsLoading(true);
    const res = await fetch(
      newAPI
    );
    const data = await res.json();
    setMovies(data.Search);
    setIsLoading(false);
    }
    fetchMovies();
  }, [])


  return (
    <>
      <Navbar >
          <Logo />
          <Search />
          <NumResultsMovies movies={movies} />   
      </Navbar> 
      <TotalMoviesContainer>
        <BoxConditional>
          <MapTotalMovies movies={movies} />
        </BoxConditional>

        <BoxConditional>
          <MoviesSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </BoxConditional>
      </TotalMoviesContainer>
    </>
  );
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

function MapTotalMovies({movies}){

  return(
  <ul className="list">
    {movies?.map((movie) => (
      <Movie movie={movie} key={movie.imdbID} />
    ))}
  </ul>
  )
}

function Movie({movie}){

  return(
         <li >
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


