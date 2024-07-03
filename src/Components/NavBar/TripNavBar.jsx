// src/Navbar.js
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Button, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();
const TripNavbar = () => {
    const navigate = useNavigate();    

  return (
    <ThemeProvider theme={defaultTheme}>
       <AppBar position="static" color="warning" sx={{paddingTop:'50px'}}>
        <Toolbar>
          <Button color="inherit" onClick={()=>{navigate('/locations')}}>View Locations</Button>
          <Button color="inherit" onClick={()=>{navigate('/accomadations')}}>View Accommodations</Button>
          <Button color="inherit" onClick={()=>{navigate('/transport')}}>View Transports</Button>
          <Button color="inherit" onClick={()=>{navigate('/foodPackages')}}>View Food Packages</Button>
          <Button color="inherit" onClick={()=>{navigate('/trip')}}>Budget</Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default TripNavbar;
