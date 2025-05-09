import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingStart, fetchTrendingSuccess, fetchTrendingFailure } from '../../store/slices/movieSlice';
import { fetchTrendingMovies } from '../../api/tmdb';
import MovieCard from '../MovieCard/MovieCard';
import './TrendingMovies.css';

const TrendingMovies = () => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector((state) => state.movies.trendingMovies);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    const loadTrending = async () => {
      dispatch(fetchTrendingStart());
      try {
        const movies = await fetchTrendingMovies();
        dispatch(fetchTrendingSuccess(movies));
      } catch (err) {
        dispatch(fetchTrendingFailure(err.toString()));
      }
    };
    loadTrending();
  }, [dispatch]);

  if (loading) return <div>Loading trending movies...</div>;
  if (error) return <div>Error loading trending movies: {error}</div>;

  return (
    <div className="trending-movies">
      <h2>Trending Movies</h2>
      <div className="trending-movies-list">
        {trendingMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default TrendingMovies;
