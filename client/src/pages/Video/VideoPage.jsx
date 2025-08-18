import React, { useState, useEffect } from "react";
import { Container, Box, Grid } from "@mui/material";
import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage.jsx";

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/videos`
        );
        setVideos(response.data.videos || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: "15vh", textAlign: "center" }}>
      <Grid container spacing={2} justifyContent="center">
        {videos.map((video, index) => (
          <Grid item key={video._id || index} xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                border: "3px solid rgb(243,232,232)",
                boxShadow: "0 0 11px 0 rgba(255, 157, 157, .35)",
                borderRadius: "5px",
                backgroundColor: "black",
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%", // 16:9 aspect ratio
                height: 0,
                "& > iframe": {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "99%",
                  height: "98%",
                },
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VideoPage;
