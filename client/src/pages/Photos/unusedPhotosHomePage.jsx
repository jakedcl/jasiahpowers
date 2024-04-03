import React from 'react';
import '/src/App.css';
import { Link } from 'react-router-dom';
import { Grid, Box, Button, Container, Typography, Card, CardActionArea } from '@mui/material';
import { titleStyle, mainButtonStyle, cornerButtonStyle } from '../../pagetheme'; // Assuming you have these styles defined in a separate file

function MediaPage() {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '85vh',
        }}
      >  
        <Button
          component={Link}
          variant="h1"
          to="/media/portraits"
          color="inherit"
          sx={{
            paddingBottom: '60px',
            color: 'black',
              ...mainButtonStyle
          }}>PORTRAITS
          </Button>
          <Button
              component={Link}
              variant="h1"
              to="/media/studio"
              color="inherit"
              sx={{
                paddingBottom: '60px',
                color: 'black',
                  ...mainButtonStyle
              }}>STUDIO
            </Button>
          <Button
                component={Link}
                variant="h2"
                to="/media/commercial"
                color="inherit"
                sx={{
                  paddingBottom: '60px',
                  color: 'black',
                    ...mainButtonStyle
                }}>COMMERCIAL
              </Button>
      </Container>
    </>
  );
}

export default MediaPage;
