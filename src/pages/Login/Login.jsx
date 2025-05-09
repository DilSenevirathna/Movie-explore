import React from 'react';
import { Box, Typography } from '@mui/material';
import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.css';

const Login = () => {
  return (
    <Box className="login-page">
      <Box className="login-content">
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Movie Explorer
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ mb: 4 }}>
          Discover your next favorite movie
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;