import React, { useState, useEffect } from "react";
import { Box, Container, Modal } from "@mui/material";
import { Masonry } from "@mui/lab";
import { urlFor } from "../../lib/sanity";
import LazyLoad from "react-lazyload";
import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage.jsx";
import "../../App.css";

function PhotosPage() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850);
  const [loading, setLoading] = useState(true);

  const handleOpen = (photo) => {
    console.log("Opening modal with photo:", photo);
    setSelectedItem(photo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/photos`
        );
        if (response.data && Array.isArray(response.data.photos)) {
          setPhotos(response.data.photos);
        } else {
          console.error("Invalid data structure:", response.data);
          setPhotos([]);
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "13vh",
          paddingBottom: "5vh",
          textAlign: "center",
        }}
      >
        <Masonry
          columns={{ xs: 2, sm: 3, md: 4, lg: 5 }}
          spacing={0.6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            boxShadow: "0 0 30px .2px black",
            borderRadius: "10px",
          }}
        >
          {photos.map((photo, index) => (
            <LazyLoad key={photo._id || index} height={200} offset={100}>
              <Box
                sx={{
                  display: "block",
                  width: 1,
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
                onClick={() => handleOpen(photo)}
              >
                <img
                  src={urlFor(photo.image).width(400).url()}
                  alt={photo.image?.alt || photo.title || "Photo"}
                  style={{
                    width: "97%",
                    marginRight: "1vh",
                    marginBottom: "1vh",
                    borderRadius: "10px",
                  }}
                />
              </Box>
            </LazyLoad>
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
              outline: "none",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedItem && (
              <img
                src={urlFor(selectedItem.image).url()}
                alt={selectedItem.image?.alt || selectedItem.title || "Selected photo"}
                style={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  width: "auto",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            )}
          </Box>
        </Modal>
      </Container>
    </div>
  );
}

export default PhotosPage;
