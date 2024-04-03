// HomePage.jsx
import React from 'react'
import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import '/src/App.css'
import { mainButtonStyle, cornerButtonStyle } from '../../pagetheme'; 
import Footer from '../../Footer';
import './HomePage.css'

export default function HomePage() {

    

    {/* HOME PAGE */}
    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* HEADER */}
                <AppBar position="static" color="transparent" elevation={0} sx={{ height: '10vh', width: '100%', mt:'2vh', ml: '1vh'}}>
                    <Toolbar>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                color: 'black',
                            }}>
                            <Button
                                    component={Link}
                                    onClick={() => window.open("https://soundcloud.com/user-545490516/no-text-prod-by-shxrkz?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", "_blank")}
                                    color="inherit"
                                    sx={{ ...mainButtonStyle, mx:'auto', textAlign: 'center'}}
                                >🎵
                            </Button>
                            <Box sx={{ flexGrow: 1 }} />
                            <Button
                                    href="mailto:jasiahsteez@gmail.com?subject=Contact from Website&body=Hi Jasiah,"
                                    color="inherit"
                                    sx={{ ...mainButtonStyle, mx:'auto', textAlign: 'center'}}
                                >CONTACT 
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box component="main" sx={{  flex: '1 0 auto' }}>
                {/* ALL 'HERO' HOMEPAGE CONTENT */}
                <Container width="100%"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column', // Stack elements vertically
                        alignItems: 'center', // Centers on cross axis, which is perpendicular to flexDirection
                        width: '100%',
                        height: '80vh', // This sets the height of the hero section to fill the screen
                        mb: '10vh', // Padding bottom
                    }}>
                    {/* Logo Containerbox */}
                    <Box
                        component="img"
                        src={"./logo.png"}
                        alt="Client's Logo"
                        sx={{
                            display: 'flex',
                            alignContent: 'center',
                            maxWidth: '50vw',
                            maxHeight: '50vw',
                            minWidth: '100px',
                            minHeight: '100px',
                            mb: '2vh',
                            height: { xs: '14vw', md: '15vw', lg: '16vw', xl: '30vw' }, // Adjusts the size based on screen width for responsiveness
                        }}
                    />
                    {/* YouTube Video and Menu Container */}
                    <Box sx={{
                        backgroundColor: 'rgb(254,254,254)',
                        padding: '2vh',
                        borderRadius: '10px',
                        border: '3px solid rgb(243,232,232)',
                        display: 'block',
                        width: '80vw',
                        maxWidth: { sm:'95%', md:'60%', lg: '50%' },
                        paddingTop: '2vh',
                        paddingBottom: '2vh',
                        boxShadow: '0 0 11px 0 rgba(255, 157, 157, .35)',
                    }}>
                        {/* YouTube Video Containerbox */}
                        <Box
                            sx={{
                                position: 'sticky', // Needed to position the iframe absolutely inside
                                width: '100%', // Full width of the parent container
                                paddingTop: '56.25%', // Top padding to create the aspect ratio
                                height: 0, // Set height to 0 to let padding control the height
                                overflow: 'hidden', // Ensures no content can overflow
                                display: 'block',
                                '& > iframe': {
                                    position: 'absolute', // Absolute position for the iframe
                                    top: 0,
                                    left: 0,
                                    width: '100%', // Full width of the container
                                    height: '100%', // Full height of the container
                                    maxHeight: '60vh',
                                },
                            }}
                        >
                            <iframe
                                src="https://www.youtube.com/embed/nRStNn8KVcA?si=q0ojzw887pfUMsFL"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                            ></iframe>
                        </Box>
                        {/* Menu Container */}
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                color: 'black'
                            }}>
                            {/* Row 1 */}
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', pt: '5px' }}>
                                <Button
                                    className="button-basic"
                                    component={Link}
                                    to="/projects"
                                    color="inherit"
                                    sx={{ ...mainButtonStyle, }}
                                >PROJECTS
                                </Button>
                                <Button
                                    className="button-basic" 
                                    component={Link}
                                    to="/photos"
                                    color="inherit"
                                    sx={{ ...mainButtonStyle }}
                                >PHOTOS
                                </Button>
                            </Box>
                            {/* Row 2 */}
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                    className="button-basic" 
                                    component={Link}
                                    onClick={() => window.open("https://google.com", "_blank")}
                                    color="inherit"
                                    sx={{ ...mainButtonStyle }}
                                >PRINTS
                                </Button>
                                <Button
                                    className="button-basic" 
                                    component={Link}
                                    to="/video"
                                    color="inherit"
                                    sx={{ ...mainButtonStyle }}
                                >VIDEO
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </div>
    );
}
