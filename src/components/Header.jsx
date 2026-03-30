'use client'

import { usePathname } from 'next/navigation'
import { AppBar, Toolbar, Box, Button } from '@mui/material'
import { mainButtonStyle } from '@/pagetheme'

export default function Header() {
  const pathname = usePathname()
  const firstPathSegment = pathname.split('/')[1] || ''

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{ height: '10vh', width: '100%', mt: '2vh', ml: '1vh' }}
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
            color="inherit"
            href="/"
            sx={{ ...mainButtonStyle }}
          >
            HOME
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          {firstPathSegment ? (
            <Button
              color="inherit"
              href={`/${firstPathSegment}`}
              sx={{ ...mainButtonStyle }}
            >
              {firstPathSegment.toUpperCase()}
            </Button>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
