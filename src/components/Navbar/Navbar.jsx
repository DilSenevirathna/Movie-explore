import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7, Favorite, Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import { logoutSuccess } from '../../store/slices/authSlice';
import { logout } from '../../api/auth';
import './Navbar.css';

const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.user?.username);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutSuccess());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar
      position="static"
      color="default"
      className={theme.palette.mode === 'dark' ? 'navbar-dark' : 'navbar-light'}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Movie Explorer
        </Typography>

        <Button color="inherit" component={Link} to="/">
          <Home sx={{ mr: 1 }} /> Home
        </Button>

        {isAuthenticated && (
          <Button color="inherit" component={Link} to="/favorites">
            <Favorite sx={{ mr: 1 }} /> Favorites
          </Button>
        )}

        <IconButton
          color="inherit"
          onClick={() => dispatch(toggleTheme())}
          sx={{ ml: 1 }}
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {isAuthenticated ? (
          <>
            <Typography variant="subtitle1" sx={{ mx: 2 }}>
              Welcome, {username}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}

      
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;