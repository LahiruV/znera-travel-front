// src/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, MenuItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();
const Navbar = () => {
  const handleLogout = () => {
    // Logic for logout action
    console.log("User logged out");
  };

  const clickHome = () => {
    window.location.href = '/home';
  }

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
  };

  const activeStyle = {
    color: 'orange',
  };

  const getLinkStyle = ({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle);

  return (
    <ThemeProvider theme={defaultTheme}>
    <AppBar position="fixed">
      <Toolbar style={{ justifyContent: 'space-between', backgroundColor: '#282828' }}>
        <Typography variant="h6" component={NavLink} to="/" style={{ ...linkStyle, flexGrow: 1, fontWeight: 'bolder' }}>
          Zenra <span style={{ color: 'orange' }}>Travels</span>
        </Typography>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <MenuItem component={NavLink} to="/home" style={getLinkStyle} onClick={clickHome}>
            Home
          </MenuItem>
          <MenuItem component={NavLink} to="/profile" style={getLinkStyle}>
            Profile
          </MenuItem> 
          <Button variant="contained" color="warning" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
