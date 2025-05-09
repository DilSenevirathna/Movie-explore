import axios from 'axios';

const API_KEY = '9f555cefbb2afc1e074fa1c069be457b'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchTrendingMovies = async (timeWindow = 'week') => {
  try {
    const response = await tmdb.get('/trending/movie/' + timeWindow);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdb.get('/search/movie', {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const fetchMoviesByFilters = async ({ genre, year, rating, page = 1 }) => {
  try {
    const params = {
      page,
      with_genres: genre || undefined,
      primary_release_year: year || undefined,
      'vote_average.gte': rating || undefined,
      sort_by: 'popularity.desc',
    };
    const response = await tmdb.get('/discover/movie', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by filters:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await tmdb.get('/movie/' + movieId, {
      params: {
        append_to_response: 'videos,credits',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchMovieCredits = async (movieId) => {
  try {
    const response = await tmdb.get('/movie/' + movieId + '/credits');
    return response.data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};

export const getPosterUrl = (path, size = 'w500') => {
  return path ? 'https://image.tmdb.org/t/p/' + size + path : null;
};

export const getBackdropUrl = (path, size = 'original') => {
  return path ? 'https://image.tmdb.org/t/p/' + size + path : null;
};
