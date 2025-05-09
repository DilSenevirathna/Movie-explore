import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return defaultValue;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Failed to load from localStorage', e);
    return defaultValue;
  }
};

const initialState = {
  trendingMovies: [],
  searchResults: [],
  movieDetails: null,
  credits: null,
  loading: false,
  error: null,
  searchQuery: '',
  lastSearchQuery: loadFromLocalStorage('lastSearchQuery', ''),
  currentPage: 1,
  totalPages: 1,
  favorites: loadFromLocalStorage('favorites', []),
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchTrendingStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTrendingSuccess(state, action) {
      state.trendingMovies = action.payload;
      state.loading = false;
    },
    fetchTrendingFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    searchMoviesStart(state, action) {
      state.loading = true;
      state.error = null;
      state.searchQuery = action.payload;
      state.lastSearchQuery = action.payload;
      state.currentPage = 1;
    },
    searchMoviesSuccess(state, action) {
      state.searchResults = action.payload.results;
      state.totalPages = action.payload.total_pages;
      state.loading = false;
    },
    searchMoviesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loadMoreMoviesSuccess(state, action) {
      state.searchResults = [...state.searchResults, ...action.payload.results];
      state.currentPage = action.payload.page;
      state.loading = false;
    },
    fetchMovieDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMovieDetailsSuccess(state, action) {
      state.movieDetails = action.payload;
      state.loading = false;
    },
    fetchMovieDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCreditsSuccess(state, action) {
      state.credits = action.payload;
    },
    addToFavorites(state, action) {
      if (!state.favorites.some(movie => movie.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(movie => movie.id !== action.payload);
    },
    clearSearchResults(state) {
      state.searchResults = [];
      state.searchQuery = '';
      state.currentPage = 1;
      state.totalPages = 1;
    },
  },
});

export const {
  fetchTrendingStart,
  fetchTrendingSuccess,
  fetchTrendingFailure,
  searchMoviesStart,
  searchMoviesSuccess,
  searchMoviesFailure,
  loadMoreMoviesSuccess,
  fetchMovieDetailsStart,
  fetchMovieDetailsSuccess,
  fetchMovieDetailsFailure,
  fetchCreditsSuccess,
  addToFavorites,
  removeFromFavorites,
  clearSearchResults,
} = movieSlice.actions;
export default movieSlice.reducer;
