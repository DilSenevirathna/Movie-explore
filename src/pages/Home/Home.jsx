import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTrendingMovies, searchMovies, fetchMoviesByFilters } from '../../api/tmdb';
import MovieCard from '../../components/MovieCard/MovieCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import TrendingMovies from '../../components/TrendingMovies/TrendingMovies';
import './Home.css';

const genresList = [
  { id: '', name: 'All' },
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const yearsList = Array.from(new Array(50), (val, index) => new Date().getFullYear() - index);

const ratingsList = [0, 2, 4, 6, 8];

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (searchQuery) {
          data = await searchMovies(searchQuery, currentPage);
          setMovies(currentPage === 1 ? data.results : (prev) => [...prev, ...data.results]);
          setTotalPages(data.total_pages);
          setSearchResults(data.results);
        } else if (selectedGenre || selectedYear || selectedRating) {
          data = await fetchMoviesByFilters({
            genre: selectedGenre,
            year: selectedYear,
            rating: selectedRating,
            page: currentPage,
          });
          setMovies(currentPage === 1 ? data.results : (prev) => [...prev, ...data.results]);
          setTotalPages(data.total_pages);
          setSearchResults([]);
        } else {
          data = await fetchTrendingMovies();
          setMovies(data);
          setTotalPages(1);
          setSearchResults([]);
        }
      } catch (err) {
        setError('Failed to load movies.');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [searchQuery, selectedGenre, selectedYear, selectedRating, currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre('');
    setSelectedYear('');
    setSelectedRating('');
    setCurrentPage(1);
  };

  const handleSelect = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="home-container">
      <SearchBar onSearch={handleSearch} searchResults={searchResults} onSelect={handleSelect} />
      <TrendingMovies />
      <div className="content-wrapper">
        <aside className="filter-sidebar">
          <h3>Filters</h3>
          <div className="filter-group">
            <label htmlFor="genre-select">Genre</label>
            <select id="genre-select" value={selectedGenre} onChange={handleFilterChange(setSelectedGenre)}>
              {genresList.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="year-select">Year</label>
            <select id="year-select" value={selectedYear} onChange={handleFilterChange(setSelectedYear)}>
              <option value="">All</option>
              {yearsList.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="rating-select">Minimum Rating</label>
            <select id="rating-select" value={selectedRating} onChange={handleFilterChange(setSelectedRating)}>
              <option value="">All</option>
              {ratingsList.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}+
                </option>
              ))}
            </select>
          </div>
        </aside>
        <main className="movies-section">
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          {currentPage < totalPages && (
            <button className="load-more-button" onClick={loadMore}>
              Load More
            </button>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
