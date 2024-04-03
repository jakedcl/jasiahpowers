// ProjectsPage.jsx is a list containing previews of projects, which can clicked on to view more details.
import React from 'react';
import '/src/App.css';
import { Link } from 'react-router-dom';
import { Grid, Box, Container, Typography, Card, CardActionArea } from '@mui/material';
import projectsData from './projectsData'; // Make sure this is your data file
import { titleStyle, mainButtonStyle, cornerButtonStyle } from '../../pagetheme'; // Assuming you have these styles defined in a separate file
import './ProjectsPage.css';

function ProjectsPage() {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: '15vh', paddingBottom: 2, textAlign: 'center', }}> 
      <Grid container spacing={0}> 
      {projectsData.map((project) => (
        // MUI Grid takes up 12 columns by default, so we split them.... {6} means 12/6, so 2 columns 
        <Grid item xs={12} sm={6} md={4} lg={4} key={project.id}> 
          <Container maxWidth="lg" 
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}> 
            <Card className="project-text" varied='outlined' key={project.id}  
              sx={{  
                width: '100%', 
                justifyContent: 'center', 
                color: 'black',
                backgroundColor: 'rgb(254, 251, 246)',
                border: '2px solid rgb(243,232,232)',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '1px 1px 10px 1px rgba(0,0,0,.2)',
                transition: 'all 0.3s',
                display: 'inline-block',
                my: '1.5vh',
                '&:hover' : {
                    color: 'black',
                },}}>
              <CardActionArea  component={Link} to={`/projects/${project.id}`} sx={{my: '1vh', '&:hover':{backgroundColor: 'inherit'}, }} >
                <Box  sx={{ 
                  fontSize: {
                    xs: '1.9rem', 
                    sm: '2.3rem',
                    md: '2.4rem', 
                    lg: '2.4rem', 
                  }, fontWeight: '700', color: 'black', paddingTop: '3%', paddingBottom: '2.5%', hover:{color:'black'}}}>{project.name}<br/>
                </Box>
                <Box sx={{ padding: '1vh'}}>
                  {project.photos && project.photos.length > 0 ? (
                    project.photos.slice(0, 8).map((photo, index) => ( // Only take the first 6 photos
                      <Box
                        key={index} // Add a key prop for unique identification of each element in the list
                        component="img"
                        src={photo} // Use `photo` which is the current item in the map function
                        alt={`Preview of ${project.name}`}
                        sx={{
                          minWidth: { xs: 70, sm: 60, md: 80 },
                          minHeight: { xs: 75, sm: 65, md: 85 },
                          maxWidth: { xs: 70, sm: 60, md: 80 },
                          maxHeight: { xs: 75, sm: 65, md: 85 },
                          paddingLeft: { xs: '1px', sm: '2px', md: '3px' },
                          paddingRight: { xs: '1px', sm: '2px', md: '3px' },
                          objectFit: 'cover',

                        }}
                      />
                    ))
                  ) : (
                    <div>{/* empty error msg */}</div> 
                  )}
                </Box>
              </CardActionArea>
            </Card>
          </Container>
        </Grid>
      ))}
      </Grid>
    </Container>
  );
}

export default ProjectsPage;

