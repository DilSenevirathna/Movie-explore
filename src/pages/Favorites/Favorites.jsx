import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Favorites.css';

const Favorites = () => {
  const favorites = useSelector((state) => state.movies.favorites);

  return (
    <div className="favorites-container">
      <h2> Your Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p>You have no favorite movies yet.</p>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
