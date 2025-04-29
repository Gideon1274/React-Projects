import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Avatar,
  CssBaseline,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress,
  Fade,
  Slide,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBack from '@mui/icons-material/ArrowBack';

// Styled Components
const FormContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[100]} 100%)`,
  padding: theme.spacing(4),
}));

const FormCard = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[6],
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 400,
  textAlign: 'center',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1.5),
  fontWeight: 600,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    transform: 'scale(1.05)',
    transition: 'transform 0.3s',
  },
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    // Hardcoded admin credentials
    const adminEmail = 'admin123@gmail.com';
    const adminPassword = 'admin123';

    setTimeout(() => {
      if (email === adminEmail && password === adminPassword) {
        setError('');
        navigate('/dashboard');
      } else {
        setError('Invalid email or password.');
        setIsLoading(false);
      }
    }, 1000); // Simulate API call delay
  };

  return (
    <FormContainer>
      <CssBaseline />
      <Slide direction="up" in={true} timeout={500}>
        <FormCard>
          <Fade in={true} timeout={800}>
            <Box>
              <IconButton
                onClick={() => navigate('/')}
                sx={{ position: 'absolute', top: 16, left: 16 }}
              >
                <ArrowBack />
              </IconButton>
              <Avatar sx={{ m: 'auto', bgcolor: 'primary.main', mb: 2 }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Sign In
              </Typography>
              {error && (
                <Fade in={true} timeout={300}>
                  <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                    {error}
                  </Alert>
                </Fade>
              )}
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!error && error.includes('email')}
                  helperText={error && error.includes('email') ? error : ''}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 8,
                      '&:hover fieldset': { borderColor: 'primary.main' },
                    },
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!error && error.includes('Password')}
                  helperText={error && error.includes('Password') ? error : ''}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 8,
                      '&:hover fieldset': { borderColor: 'primary.main' },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ textAlign: 'right', mt: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                    onClick={() => alert('Forgot Password functionality coming soon!')}
                  >
                    Forgot Password?
                  </Typography>
                </Box>
                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </StyledButton>
                <Typography variant="body2" align="center" color="text.secondary">
                  {"Don't have an account? "}
                  <Link to="/register" style={{ textDecoration: 'none', color: 'primary.main' }}>
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Fade>
        </FormCard>
      </Slide>
    </FormContainer>
  );
};

export default Login;
