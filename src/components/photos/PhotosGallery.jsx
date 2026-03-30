'use client'

import { useState } from 'react'
import { Box, Container, Modal } from '@mui/material'
import { Masonry } from '@mui/lab'
import { urlFor } from '@/lib/sanity'

export default function PhotosGallery({ photos }) {
  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleOpen = (photo) => {
    setSelectedItem(photo)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedItem(null)
  }

  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  if (!photos?.length) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: '13vh',
          paddingBottom: '5vh',
          textAlign: 'center',
        }}
      >
        <p>No photos in the gallery yet.</p>
      </Container>
    )
  }

  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '13vh',
          paddingBottom: '5vh',
          textAlign: 'center',
        }}
      >
        <Masonry
          columns={{ xs: 2, sm: 3, md: 4, lg: 5 }}
          spacing={0.6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            boxShadow: '0 0 30px .2px black',
            borderRadius: '10px',
          }}
        >
          {photos.map((photo, index) => (
            <Box
              key={photo._key || index}
              sx={{
                display: 'block',
                width: 1,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
              onClick={() => handleOpen(photo)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(photo.image).width(400).url()}
                alt={photo.alt || photo.caption || 'Photo'}
                loading="lazy"
                style={{
                  width: '97%',
                  marginRight: '1vh',
                  marginBottom: '1vh',
                  borderRadius: '10px',
                }}
              />
            </Box>
          ))}
        </Masonry>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={modalStyle}
        >
          <Box
            sx={{
              outline: 'none',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {selectedItem && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={urlFor(selectedItem.image).url()}
                alt={
                  selectedItem.alt || selectedItem.caption || 'Selected photo'
                }
                style={{
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  width: 'auto',
                  height: 'auto',
                  borderRadius: '10px',
                }}
              />
            )}
          </Box>
        </Modal>
      </Container>
    </div>
  )
}
