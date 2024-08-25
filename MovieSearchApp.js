import React, { useState } from 'react';

const MovieApp = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const apiUrl = `https://www.omdbapi.com/?s=${query}&apikey=YOUR_API_KEY`;

  const searchMovies = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setMovies(data.Search);
      setSelectedMovie(null);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query) {
      searchMovies();
    }
  };

  return (
    <div className="movie-app">
      <h1>Movie Search App</h1>
      <SearchBar query={query} onChange={handleInputChange} onSearch={handleSearch} />
      <MovieList movies={movies} onSelectMovie={setSelectedMovie} />
      {selectedMovie && <MovieDetail movie={selectedMovie} />}
    </div>
  );
};

const SearchBar = ({ query, onChange, onSearch }) => (
  <div className="search-bar">
    <input
      type="text"
      value={query}
      onChange={onChange}
      placeholder="Search for movies..."
    />
    <button onClick={onSearch}>Search</button>
  </div>
);

const MovieList = ({ movies, onSelectMovie }) => (
  <div className="movie-list">
    {movies?.map((movie) => (
      <div key={movie.imdbID} className="movie-item" onClick={() => onSelectMovie(movie)}>
        <img src={movie.Poster} alt={movie.Title} />
        <h2>{movie.Title}</h2>
        <p>{movie.Year}</p>
      </div>
    ))}
  </div>
);

const MovieDetail = ({ movie }) => (
  <div className="movie-detail">
    <h2>{movie.Title}</h2>
    <img src={movie.Poster} alt={movie.Title} />
    <p>Release Year: {movie.Year}</p>
    <p>IMDb ID: {movie.imdbID}</p>
  </div>
);

export default MovieApp;

