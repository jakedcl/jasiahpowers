'use client'

import { Container, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { mainButtonStyle } from '@/pagetheme'

export default function ComingSoon() {
  const router = useRouter()

  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: '12rem',
        padding: '5vh',
        border: '3px solid rgb(243,232,232)',
        boxShadow: '0 0 11px 0 rgba(255, 157, 157, .35)',
        borderRadius: '10px',
        backgroundColor: 'white',
        maxWidth: '75vw',
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Coming Soon
      </Typography>
      <Typography>Loading... Stay Tuned!</Typography>
      <Typography sx={{ padding: '5vh' }} />
      <Button
        variant="contained"
        sx={{
          ...mainButtonStyle,
          color: 'black',
        }}
        onClick={() => router.push('/')}
      >
        Go to the Homepage
      </Button>
    </Container>
  )
}
