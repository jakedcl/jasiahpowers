import React, { useState, useEffect } from "react";
import "/src/App.css";
import { Link } from "react-router-dom";
import { Grid, Box, Container, Card, CardActionArea } from "@mui/material";
import { urlFor } from "../../lib/sanity";
import axios from "axios";
import "./ProjectsPage.css";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/projects`
        );
        setProjects(response.data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{ paddingTop: "15vh", paddingBottom: 2, textAlign: "center" }}
      >
        <div>Loading projects...</div>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ paddingTop: "15vh", paddingBottom: 2, textAlign: "center" }}
    >
      <Grid container spacing={0}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={project._id}>
            <Container
              maxWidth="lg"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                className="project-text"
                varied="outlined"
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  color: "black",
                  backgroundColor: "rgb(254, 251, 246)",
                  border: "2px solid rgb(243,232,232)",
                  borderRadius: "5px",
                  cursor: "pointer",
                  boxShadow: "0 0 11px 0 rgba(255, 157, 157, .25)",
                  transition: "all 0.3s",
                  display: "inline-block",
                  my: "1.5vh",
                  "&:hover": {
                    color: "black",
                  },
                }}
              >
                <CardActionArea
                  component={Link}
                  to={`/projects/${project.slug?.current || project._id}`}
                  sx={{ my: "1vh", "&:hover": { backgroundColor: "inherit" } }}
                >
                  <Box
                    sx={{
                      fontSize: {
                        xs: "1.9rem",
                        sm: "2.3rem",
                        md: "2.4rem",
                        lg: "2.4rem",
                      },
                      fontWeight: "700",
                      color: "black",
                      paddingTop: "3%",
                      paddingBottom: "2.5%",
                      hover: { color: "black" },
                    }}
                  >
                    {project.name}
                    <br />
                  </Box>
                  <Box sx={{ padding: "1vh" }}>
                    {project.images && project.images.length > 0 ? (
                      project.images.slice(0, 5).map((image, index) => (
                        <Box
                          key={index}
                          component="img"
                          src={urlFor(image).width(80).height(85).url()}
                          alt={image.alt || `Preview of ${project.name}`}
                          sx={{
                            minWidth: { xs: 70, sm: 60, md: 80 },
                            minHeight: { xs: 75, sm: 65, md: 85 },
                            maxWidth: { xs: 70, sm: 60, md: 80 },
                            maxHeight: { xs: 75, sm: 65, md: 85 },
                            paddingLeft: { xs: "1px", sm: "2px", md: "3px" },
                            paddingRight: { xs: "1px", sm: "2px", md: "3px" },
                            objectFit: "cover",
                          }}
                        />
                      ))
                    ) : (
                      <div>{/* no images */}</div>
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
