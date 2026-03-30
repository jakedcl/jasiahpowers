'use client'

import { AppBar, Toolbar, Button, Box, Container } from '@mui/material'
import Link from 'next/link'
import { mainButtonStyle } from '@/pagetheme'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div>
      <div
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: '1 0 auto',
          }}
        >
          <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{
              height: { xs: '12vh', sm: '12vh', md: '10vh', lg: '0vh' },
              width: '100%',
              mt: '2vh',
            }}
          >
            <Toolbar>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  color: 'black',
                }}
              >
                <Button
                  onClick={() =>
                    window.open(
                      'https://music.apple.com/us/album/cc4ever/1743533951',
                      '_blank'
                    )
                  }
                  color="inherit"
                  sx={{ ...mainButtonStyle, mx: 'auto', textAlign: 'center' }}
                >
                  🎵
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  href="mailto:jasiahsteez@gmail.com?subject=Contact from Website&body=Hi Jasiah,"
                  color="inherit"
                  sx={{ ...mainButtonStyle, mx: 'auto', textAlign: 'center' }}
                >
                  CONTACT
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
        <Box component="main" sx={{ flex: '1 0 auto' }}>
          <Container
            width="100%"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              height: '80vh',
              mb: '10vh',
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Jasiah Powers"
              sx={{
                display: 'flex',
                alignContent: 'center',
                backgroundSize: 'cover',
                maxWidth: '50vw',
                maxHeight: '50vw',
                minWidth: '100px',
                minHeight: '100px',
                mb: '2vh',
                borderRadius: '60%',
                border: '3px solid rgb(243,232,232)',
                height: { xs: '14vw', md: '15vw', lg: '16vw', xl: '30vw' },
                boxShadow: '0 0 11px 0 rgba(255, 157, 157, .35)',
              }}
            />
            <Box
              sx={{
                backgroundColor: 'rgb(254,254,254)',
                padding: '2vh',
                borderRadius: '10px',
                border: '3px solid rgb(243,232,232)',
                display: 'block',
                width: '80vw',
                maxWidth: { sm: '75%', md: '60%', lg: '50%' },
                paddingTop: '2vh',
                paddingBottom: '2vh',
                boxShadow: '0 0 11px 0 rgba(255, 157, 157, .35)',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  '& iframe': {
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                  },
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/nRStNn8KVcA?rel=0"
                  title="YouTube video player"
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: 'black',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt: '5px',
                  }}
                >
                  <Button
                    className="button-basic"
                    component={Link}
                    href="/projects"
                    color="inherit"
                    sx={{ ...mainButtonStyle }}
                  >
                    PROJECTS
                  </Button>
                  <Button
                    className="button-basic"
                    component={Link}
                    href="/photos"
                    color="inherit"
                    sx={{ ...mainButtonStyle }}
                  >
                    PHOTOS
                  </Button>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    className="button-basic"
                    component={Link}
                    href="/prints"
                    color="inherit"
                    sx={{ ...mainButtonStyle }}
                  >
                    PRINTS
                  </Button>
                  <Button
                    className="button-basic"
                    component={Link}
                    href="/video"
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
  )
}
