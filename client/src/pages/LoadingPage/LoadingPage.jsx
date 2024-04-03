// LoadingPage.jsx
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { mainButtonStyle } from '../../pagetheme';

function LoadingPage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/'); // assuming the root of your app is the home page
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', paddingTop: '15rem' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Loading...
      </Typography>
      <Typography  >
        Taking too long? Maybe there's a problem.
      </Typography>
      <Typography  sx={{padding: '5vh'}}>
        
      </Typography>
      <Button variant="contained" sx={{...mainButtonStyle, color: 'black', '&:hover': { borderColor: 'black' , backgroundColor: 'rgb(250,250,250)'} }} onClick={goHome}>
        Go to the Homepage
      </Button>
    </Container>
  );
}

export default LoadingPage;
