// NotFoundPage.jsx
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { mainButtonStyle } from '../../pagetheme';

function NotFoundPage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/'); 
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', paddingTop: '15rem' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        404
      </Typography>
      <Typography  >
        This page doesn't exist (yet).
      </Typography>
      <Typography  sx={{padding: '5vh'}}>
        Maybe you made a typo on the address or the page was removed.
      </Typography>
      <Button variant="contained" sx={{...mainButtonStyle, color: 'black', '&:hover': { borderColor: 'black' , backgroundColor: 'rgb(250,250,250)'} }} onClick={goHome}>
        Go to the Homepage
      </Button>
    </Container>
  );
}

export default NotFoundPage;
