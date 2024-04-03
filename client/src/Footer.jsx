//Footer.jsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const socialMediaLinks = {
  Instagram: "https://www.instagram.com/jasiahpowers",
  Twitter: "https://www.twitter.com",
  YouTube: "https://www.youtube.com",
  TikTok: "https://www.tiktok.com",
};

const Footer = () => {
  return (
    <Box 
      sx={{
        position: 'static',
        bottom: 0,
        width: '100%',
        display: 'block',
        textAlign: 'center',
        flexDirection: 'column', // Stack items vertically
        alignItems: 'center', // Center items horizontally
        justifyContent: 'center', // Center items vertically
        backgroundColor: 'transparent',
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', }}>
        {Object.entries(socialMediaLinks).map(([name, url]) => (
          <Link key={name} href={url} target="_blank" rel="noopener noreferrer" sx={{ margin: '0 10px' }}>
            <Box
              component="img"
              src={`/social_logos/${name.toLowerCase()}_logo.svg`}
              alt={name}
              sx={{ 
                width: { xs: '24px', sm: '24px', md: '24px', lg: '26px', xl: '28px' }, 
                height: { xs: '24px', sm: '24px', md: '24px', lg: '26px', xl: '28px' },
              }}
            />
          </Link>
        ))}
      </Box>
      <Typography variant="body2" color="text.primary">
        © JASIAH POWERS 2024
      </Typography>
    </Box>
  );
};

export default Footer;
