import React from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, IconButton, Tooltip, Box } from '@mui/material';
import { Favorite, FavoriteBorder, Star } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../store/slices/movieSlice';
import { getPosterUrl } from '../../api/tmdb';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.movies.favorites);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <Card className="movie-card" elevation={3}>
        <div className="card-media-container">
          <CardMedia
            component="img"
            image={getPosterUrl(movie.poster_path) || '/placeholder-movie.png'}
            alt={movie.title}
            className="card-media"
          />
          <div className="rating-badge">
            <Star color="warning" fontSize="small" />
            <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
          </div>
        </div>
        <CardContent className="card-content">
          <Typography variant="h6" component="h3" className="movie-title" noWrap>
            {movie.title}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
            <Chip
              label={movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              size="small"
              className="year-chip"
            />
            <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
              <IconButton
                className="favorite-button"
                onClick={handleToggleFavorite}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                size="small"
              >
                {isFavorite ? (
                  <Favorite color="error" fontSize="small" />
                ) : (
                  <FavoriteBorder color="disabled" fontSize="small" />
                )}
              </IconButton>
            
            </Tooltip>
            
          </Box>
          <Typography variant="caption" className="movie-genre" sx={{ mt: 1 }}>
            {movie.genre_ids?.slice(0, 2).join(' • ') || 'Unknown'}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
