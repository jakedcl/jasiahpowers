import React, { useState, useEffect } from 'react';
import { Box, Container, Modal } from '@mui/material';
import { Masonry } from '@mui/lab';
import { Image } from 'cloudinary-react';
import LazyLoad from 'react-lazyload';
import axios from 'axios';
import LoadingPage from '../LoadingPage/LoadingPage.jsx'; 
import '../../App.css'

function PhotosPage() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850); // example threshold for mobile


  const handleOpen = (imageUrl) => {
    console.log("Opening modal with image:", imageUrl); // Diagnostic log
    setSelectedItem(imageUrl);
    setOpen(true);
  };
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true); // Set loading to true when the request starts
      try {
        const response = await axios.get(`https://important-cloak-pig.cyclic.app/api/images`);
        if (response.data && Array.isArray(response.data.images)) {
          setItems(response.data.images);
          setLoading(false); // Set loading to false when the request ends
        } else {
          console.error('Invalid data structure:', response.data);
          setItems([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
      

    };
    fetchImages();
  }, []);

  if (loading) {
    return <LoadingPage/>;
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10vh', paddingBottom: '5vh', textAlign: 'center' }}>
      <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} spacing={0.6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', boxShadow: '0 0 30px .2px black', borderRadius: '10px'}}>
      {items.map((imagePublicId, index) => (
        <LazyLoad key={index} height={200} offset={100}>
          <Box
            sx={{
              display: 'block',
              width: 1,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={() => handleOpen(imagePublicId)}
          >
            <Image 
              cloudName={import.meta.env.VITE_CLOUDINARY_CLOUD_NAME} 
              publicId={imagePublicId} 
              crop="scale"

              style={{ width: '97%', marginRight: '1vh', marginBottom: '1vh', borderRadius: '10px',}}
            />
          </Box>
        </LazyLoad>
      ))}
      </Masonry>
       {/*}
        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image 
            cloudName={import.meta.env.VITE_CLOUDINARY_CLOUD_NAME} 
            publicId={selectedItem} // used to be publicId
            style={{
              outline: 'none',
              maxWidth: '90%',
              maxHeight: '90%',
              boxShadow: 24,
              borderRadius: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }} 
            crop="scale"
          />
        </Modal>
          */}
        {isMobile && (
          <Box sx={{ position: 'fixed', bottom: 0, px: '2vh', maxWidth: '80%', borderRadius: '.8rem', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.9)', backgroundColor: 'rgba(155,155,155,.6)', margin: '2vh', fontSize: '.8rem', fontWeight:'800'}}>HOLD PHOTO TO FOCUS</Box>
        )}
    </Container>
    </div>
  );
}

export default PhotosPage;
