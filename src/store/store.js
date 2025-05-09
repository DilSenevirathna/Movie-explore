import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import movieReducer from './slices/movieSlice';
import themeReducer from './slices/themeSlice';

const saveToLocalStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.warn('Failed to save to localStorage', e);
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    theme: themeReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveToLocalStorage('favorites', state.movies.favorites);
  saveToLocalStorage('lastSearchQuery', state.movies.lastSearchQuery);
});
