import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import focusedSvg from '../assets/undraw_focused_m9bj.svg';
import todoSvg from '../assets/undraw_to-do-list_o3jf.svg';
import { 
  Box, 
  Button, 
  Container, 
  IconButton, 
  InputAdornment, 
  Stack, 
  TextField, 
  Typography, 
  Divider,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';

import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    alert("Form is valid!");
  };

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Google login failed.");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            alignItems: 'center'
          }}
        >
          
          {/* login form - left side */}
          <Box>
            <Box sx={{ maxWidth: 400, mx: 'auto' }}>
              <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                Welcome back!
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
                Simplify your workflow and boost your productivity with <b>Tuga's App</b>. Get started for free.
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
              )}

              <form onSubmit={handleLogin}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': { borderRadius: '30px' }
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': { borderRadius: '30px' }
                    }}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography 
                      variant="body2" 
                      color="text.primary" 
                      sx={{ cursor: 'pointer', fontWeight: 500 }}
                    >
                      Forgot Password?
                    </Typography>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: 'black',
                      color: 'white',
                      borderRadius: '30px',
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      '&:hover': { bgcolor: '#333' }
                    }}
                  >
                    Login
                  </Button>
                </Stack>
              </form>

              <Divider sx={{ my: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  or continue with
                </Typography>
              </Divider>

              <Stack direction="row" spacing={2} sx={{ mb: 4, justifyContent: 'center' }}>
                <IconButton 
                  onClick={handleGoogleLogin}
                  sx={{ bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#333' } }}
                >
                  <GoogleIcon />
                </IconButton>
                <IconButton sx={{ bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#333' } }}>
                  <AppleIcon />
                </IconButton>
                <IconButton sx={{ bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#333' } }}>
                  <FacebookIcon />
                </IconButton>
              </Stack>

              <Typography align="center" variant="body2">
                Not a member? <span style={{ color: '#4caf50', fontWeight: 'bold', cursor: 'pointer' }}>Register now</span>
              </Typography>
            </Box>
          </Box>

          
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box
              sx={{
                bgcolor: '#f4f9f4',
                borderRadius: '40px',
                p: 6,
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <Box sx={{ position: 'relative', mb: 4, width: '100%' }}>
                <Box
                  component="img"
                  src={focusedSvg}
                  alt="Focused illustration"
                  sx={{ width: '80%', maxWidth: 320, mb: 2 }}
                />
                <Box
                  component="img"
                  src={todoSvg}
                  alt="To-do list illustration"
                  sx={{
                    width: '50%',
                    maxWidth: 180,
                    position: 'absolute',
                    bottom: -30,
                    right: '5%',
                    filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.15))'
                  }}
                />
              </Box>

              <Typography variant="h5" gutterBottom sx={{ px: 4, fontWeight: 'medium' }}>
                Make your work easier and organized with <b>Tuga's App</b>
              </Typography>
              
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Box sx={{ width: 8, height: 8, bgcolor: 'grey.400', borderRadius: '50%' }} />
                <Box sx={{ width: 24, height: 8, bgcolor: 'black', borderRadius: '10px' }} />
                <Box sx={{ width: 8, height: 8, bgcolor: 'grey.400', borderRadius: '50%' }} />
              </Stack>
            </Box>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
