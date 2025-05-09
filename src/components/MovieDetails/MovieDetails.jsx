import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Button,
  Grid,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Favorite, FavoriteBorder, Star, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMovieDetailsStart,
  fetchMovieDetailsSuccess,
  fetchCreditsSuccess,
  addToFavorites,
  removeFromFavorites,
} from '../../store/slices/movieSlice';
import { fetchMovieDetails, fetchMovieCredits, getPosterUrl } from '../../api/tmdb';
import './MovieDetails.css';

const MovieDetails = ({ movieId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieDetails, credits, loading, error } = useSelector((state) => state.movies);
  const favorites = useSelector((state) => state.movies.favorites);
  const isFavorite = favorites.some((fav) => fav.id === movieDetails?.id);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchMovieDetailsStart());
      try {
        const details = await fetchMovieDetails(movieId);
        dispatch(fetchMovieDetailsSuccess(details));
        const creditsData = await fetchMovieCredits(movieId);
        dispatch(fetchCreditsSuccess(creditsData));
      } catch (err) {
        console.error('Error fetching movie details:', err);
      }
    };

    fetchData();
  }, [movieId, dispatch]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movieDetails.id));
    } else {
      dispatch(addToFavorites(movieDetails));
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading movie details: {error.message}
      </Alert>
    );
  }

  if (!movieDetails) {
    return null;
  }

  const director = credits?.crew?.find((person) => person.job === 'Director');
  const trailer = movieDetails.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <Box className="movie-details-container">
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box className="poster-container">
              <img
                src={getPosterUrl(movieDetails.poster_path, 'w500') || '/placeholder-movie.png'}
                alt={movieDetails.title}
                className="movie-poster"
              />
              <IconButton
                className="favorite-button"
                onClick={handleToggleFavorite}
                size="large"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? (
                  <Favorite color="error" fontSize="large" />
                ) : (
                  <FavoriteBorder color="action" fontSize="large" />
                )}
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" gutterBottom>
              {movieDetails.title}
              {movieDetails.release_date && (
                <Typography component="span" variant="h5" color="text.secondary" sx={{ ml: 2 }}>
                  ({new Date(movieDetails.release_date).getFullYear()})
                </Typography>
              )}
            </Typography>

            <Box display="flex" alignItems="center" mb={2}>
              <Star color="warning" />
              <Typography variant="h6" sx={{ ml: 1 }}>
                {movieDetails.vote_average?.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({movieDetails.vote_count} votes)
              </Typography>
            </Box>

            <Box mb={2}>
              {movieDetails.genres?.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>

            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>
            <Typography paragraph>
              {movieDetails.overview || 'No overview available.'}
            </Typography>

            {director && (
              <Typography paragraph>
                <strong>Director:</strong> {director.name}
              </Typography>
            )}

            {movieDetails.runtime && (
              <Typography paragraph>
                <strong>Duration:</strong> {Math.floor(movieDetails.runtime / 60)}h{' '}
                {movieDetails.runtime % 60}m
              </Typography>
            )}

            {trailer && (
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  component="a"
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Trailer
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>

      {credits?.cast?.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Cast
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List className="cast-list">
            {credits.cast.slice(0, 10).map((person) => (
              <ListItem key={person.id} className="cast-item">
                <ListItemAvatar>
                  <Avatar
                    src={getPosterUrl(person.profile_path, 'w185')}
                    alt={person.name}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={person.name}
                  secondary={`as ${person.character}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default MovieDetails;
