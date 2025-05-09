// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';

// Make sure these are all default imports
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Movie from './pages/Movie/Movie';
import Favorites from './pages/Favorites/Favorites';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'; // Important!
import Footer from './components/Footer/Footer';

const App = () => {
  const mode = useSelector((state) => state.theme.mode);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movie/:movieId" element={<Movie />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute> {/* Now correctly referenced */}
                <Favorites />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
