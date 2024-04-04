// ProjectPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import projects from './projectsData.js';
import { titleStyle } from '../../pagetheme'; // Assuming this is the title style you want
import { Box, Container, Typography, Modal, Grid } from '@mui/material';
import { Masonry } from '@mui/lab';
import LoadingPage from '../LoadingPage/LoadingPage.jsx'; 


function ProjectPage() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id.toString() === projectId);
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');

  if (!project) {
    return <LoadingPage />;
  }

  const handleOpen = (imgSrc) => {
    setSelectedImg(imgSrc);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Modal style
  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={{backgroundColor: 'white'}}>
    <Container maxWidth="lg" sx={{ paddingTop: 10, paddingBottom: 2, textAlign: 'center', color: 'black', }}>
      <Typography sx={{...titleStyle, marginTop: '5vh', fontWeight: '900'}}>{project.name}</Typography>
      <Typography sx={{px: "10vw"}}>{project.description}<br/><br/></Typography>
      <Masonry columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{ paddingRight: '5vh', paddingLeft: '5vh', marginTop: '5vh', textAlign: 'center'}}>
        {project.photos && project.photos.length > 0 ? (
          project.photos.map((photo, index) => (
            <Box
              key={index}
              component="img"
              src={photo}
              alt={`Preview of ${project.name}`}
              sx={{
                width: '100%', // This will make the image responsive to the column width
                display: 'block', // This ensures that there's no extra space inside the box element
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.7,
                },
              }}
              onClick={() => handleOpen(photo)}
            />
          ))
        ) : (
          <Typography>{/*empty error*/}</Typography>
        )}
      </Masonry>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={modalStyle}
      >
        <Box
          component="img"
          src={selectedImg}
          sx={{
            outline: 'none',
            maxWidth: '90%',
            maxHeight: '90%',
            boxShadow: 24,
            borderRadius: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
      </Modal>
    </Container>
    </div>
  );
}

export default ProjectPage;
