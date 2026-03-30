'use client'

import { useState } from 'react'
import { titleStyle } from '@/pagetheme'
import { Box, Container, Typography, Modal } from '@mui/material'
import { Masonry } from '@mui/lab'
import { urlFor } from '@/lib/sanity'

export default function ProjectDetail({ project }) {
  const [open, setOpen] = useState(false)
  const [selectedImg, setSelectedImg] = useState(null)

  const handleOpen = (image) => {
    setSelectedImg(image)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  if (!project) {
    return null
  }

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: 10,
          paddingBottom: 2,
          textAlign: 'center',
          color: 'black',
        }}
      >
        <Typography sx={{ ...titleStyle, marginTop: '5vh', fontWeight: '900' }}>
          {project.name}
        </Typography>
        <Typography sx={{ px: '10vw' }}>
          {project.description}
          <br />
          <br />
        </Typography>
        <Masonry
          columns={{ xs: 2, sm: 2, md: 3, lg: 4 }}
          spacing={2}
          sx={{
            paddingRight: '5vh',
            paddingLeft: '5vh',
            marginTop: '5vh',
            textAlign: 'center',
          }}
        >
          {project.images && project.images.length > 0 ? (
            project.images.map((image, index) => (
              <Box
                key={index}
                component="img"
                src={urlFor(image).url()}
                alt={image.alt || `Preview of ${project.name}`}
                sx={{
                  width: '100%',
                  display: 'block',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.7,
                  },
                }}
                onClick={() => handleOpen(image)}
              />
            ))
          ) : (
            <Typography>No images available</Typography>
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
            src={selectedImg ? urlFor(selectedImg).url() : ''}
            alt={selectedImg?.alt || 'Selected image'}
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
  )
}
