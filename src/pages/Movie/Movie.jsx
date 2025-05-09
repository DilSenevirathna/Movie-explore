import React from 'react';
import { useParams } from 'react-router-dom';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import './Movie.css';

const Movie = () => {
  const { movieId } = useParams();

  return (
    <div className="movie-page">
      <MovieDetails movieId={movieId} />
    </div>
  );
};

export default Movie;