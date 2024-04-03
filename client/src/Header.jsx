// Header.jsx
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { titleStyle, mainButtonStyle, cornerButtonStyle } from './pagetheme'; // Assuming you have these styles defined in a separate file

{/* MUI AppBar HEADER COMPONENT */}
export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();
    const firstPathSegment = location.pathname.split('/')[1];

    return (
        <>
        <AppBar position="fixed" color="transparent" elevation={0} sx={{ height: '10vh', width: '100%', mt:'2vh', ml: '1vh', }}>
            <Toolbar>
                <Box 
                    sx={{
                        flexGrow: 1, 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        width: '100%',
                        color: 'black',
                        }}>
                    <Button color="inherit" onClick={() => navigate('/')}
                        className=""
                        sx={{...mainButtonStyle}}>
                        HOME
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button color="inherit" onClick={() => navigate(`/${firstPathSegment}`)}
                        sx={{...mainButtonStyle}}>
                        {firstPathSegment.toUpperCase()}
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
        </>
    )
}

