// main.jsx
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.jsx'; 

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> {/* Apply the theme globally */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);