// Layout.jsx
import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export default function Layout() {
    return (
        <div>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flex: '1 0 auto' }}>
                <Outlet />
            </Box>
        </Box>
        <Footer />
        </div>
    );
}
