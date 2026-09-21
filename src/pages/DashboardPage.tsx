import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
       
        const idToken = await user.getIdToken();
        setToken(idToken);
        setLoading(false);
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom>
            Login Successful 🎉
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your Access Token:
          </Typography>
          <Box
            sx={{
              mt: 2,
              mb: 4,
              p: 2,
              bgcolor: 'grey.100',
              borderRadius: 2,
              wordBreak: 'break-all',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              maxHeight: 200,
              overflow: 'auto',
              textAlign: 'left'
            }}
          >
            {token}
          </Box>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleLogout}
            sx={{ borderRadius: 8, px: 4, py: 1 }}
          >
            Logout
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default DashboardPage;
