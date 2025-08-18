// HomePage.jsx
import { AppBar, Toolbar, Button, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import "/src/App.css";
import { mainButtonStyle } from "../../pagetheme";
import Footer from "../../Footer";
import "./HomePage.css";

export default function HomePage() {
  {
    /* HOME PAGE */
  }
  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {" "}
        {/* Adjust this div */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: "1 0 auto",
          }}
        >
          {" "}
          {/* HEADER and content */}
          {/* HEADER */}
          <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{
              height: { xs: "12vh", sm: "12vh", md: "10vh", lg: "0vh" },
              width: "100%",
              mt: "2vh",
            }}
          >
            <Toolbar>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  color: "black",
                }}
              >
                <Button
                  component={Link}
                  onClick={() =>
                    window.open(
                      "https://music.apple.com/us/album/cc4ever/1743533951",
                      "_blank"
                    )
                  }
                  color="inherit"
                  sx={{ ...mainButtonStyle, mx: "auto", textAlign: "center" }}
                >
                  🎵
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  href="mailto:jasiahsteez@gmail.com?subject=Contact from Website&body=Hi Jasiah,"
                  color="inherit"
                  sx={{ ...mainButtonStyle, mx: "auto", textAlign: "center" }}
                >
                  CONTACT
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
        <Box component="main" sx={{ flex: "1 0 auto" }}>
          {/* ALL 'HERO' HOMEPAGE CONTENT */}
          <Container
            width="100%"
            sx={{
              display: "flex",
              flexDirection: "column", // Stack elements vertically
              alignItems: "center", // Centers on cross axis, which is perpendicular to flexDirection
              width: "100%",
              height: "80vh", // This sets the height of the hero section to fill the screen
              mb: "10vh", // Padding bottom
            }}
          >
            {/* Logo Containerbox */}
            <Box
              component="img"
              src={"./logo.png"}
              alt="Client's Logo"
              sx={{
                display: "flex",
                alignContent: "center",
                backgroundSize: "cover",
                maxWidth: "50vw",
                maxHeight: "50vw",
                minWidth: "100px",
                minHeight: "100px",
                mb: "2vh",
                borderRadius: "60%",
                border: "3px solid rgb(243,232,232)",
                height: { xs: "14vw", md: "15vw", lg: "16vw", xl: "30vw" },
                boxShadow: "0 0 11px 0 rgba(255, 157, 157, .35)",
              }}
            />
            {/* YouTube Video and Menu Container */}
            <Box
              sx={{
                backgroundColor: "rgb(254,254,254)",
                padding: "2vh",
                borderRadius: "10px",
                border: "3px solid rgb(243,232,232)",
                display: "block",
                width: "80vw",
                maxWidth: { sm: "75%", md: "60%", lg: "50%" },
                paddingTop: "2vh",
                paddingBottom: "2vh",
                boxShadow: "0 0 11px 0 rgba(255, 157, 157, .35)",
              }}
            >
              {/* YouTube Video Containerbox */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%", // Full width of the parent container
                  paddingTop: "56.25%", // Aspect ratio of 16:9
                  height: 0, // Set height to 0 to let padding control the height
                  overflow: "hidden", // Ensures no content can overflow
                  "& iframe": {
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "100%", // Full width of the container
                    height: "100%", // Full height of the container
                  },
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/nRStNn8KVcA?rel=0"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>

              {/* Menu Container */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "black",
                }}
              >
                {/* Row 1 */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    pt: "5px",
                  }}
                >
                  <Button
                    className="button-basic"
                    component={Link}
                    to="/projects"
                    color="inherit"
                    sx={{ ...mainButtonStyle }}
                  >
                    PROJECTS
                  </Button>
                  <Button
                    className="button-basic"
                    component={Link}
                    to="/photos"
                    color="inherit"
                    sx={{ ...mainButtonStyle }}
                  >
                    PHOTOS
                  </Button>
                </Box>
                {/* Row 2 */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    className="button-basic"
                    component={Link}
                    to="/prints"
                    //onClick={() => window.open("https://google.com", "_blank")}
                    color="inherit"
                    sx={{ ...mainButtonStyle }}
                  >
                    PRINTS
                  </Button>
                  <Button
                    className="button-basic"
                    component={Link}
                    to="/video"
                    color="inherit"
                    sx={{ ...mainButtonStyle }}
                  >
                    VIDEO
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </div>
      <Footer />
    </div>
  );
}
