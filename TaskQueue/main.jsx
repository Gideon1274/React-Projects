
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StateManagement from './App'; 
import { ThemeProvider, createTheme } from '@mui/material'; 
const theme = createTheme(); 

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <StateManagement />  {}
  </ThemeProvider>
);