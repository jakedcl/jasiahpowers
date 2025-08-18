// NotFoundPage.jsx
import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mainButtonStyle } from "../../pagetheme";

function NotFoundPage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        justifyContent: "center",
        marginTop: "12rem",
        padding: "5vh",
        border: "3px solid rgb(243,232,232)",
        boxShadow: "0 0 11px 0 rgba(255, 157, 157, .35)",
        borderRadius: "10px",
        backgroundColor: "white",
        maxWidth: "75vw",
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        404
      </Typography>
      <Typography>This page doesn't exist (yet).</Typography>
      <Typography sx={{ paddingTop: "3vh" }}>
        Maybe you made a typo or the page is old news.
      </Typography>
      <Typography sx={{ padding: "3vh" }}>Peace!</Typography>
      <Button
        variant="contained"
        sx={{
          ...mainButtonStyle,
          color: "black",
        }}
        onClick={goHome}
      >
        Go to the Homepage
      </Button>
    </Container>
  );
}

export default NotFoundPage;
