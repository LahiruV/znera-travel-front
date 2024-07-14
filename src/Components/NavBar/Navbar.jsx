import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, MenuItem, Menu, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const defaultTheme = createTheme();
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('user', ''); 
    sessionStorage.setItem('receiver', '');
    window.location.href = '/';
  };

  const clickHome = () => {
    window.location.href = '/home';
  };

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
  };

  const activeStyle = {
    color: 'orange',
  };

  const getLinkStyle = ({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
            <div>
              <MenuItem
                aria-controls="friends-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
                style={linkStyle}
              >
                Friends
                <ArrowDropDownIcon />
              </MenuItem>
              <Menu
                id="friends-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem component={NavLink} to="/friendsList" style={getLinkStyle} onClick={handleMenuClose}>
                  Friends
                </MenuItem>
                <MenuItem component={NavLink} to="/suggestions" style={getLinkStyle} onClick={handleMenuClose}>
                  Suggestions
                </MenuItem>
                <MenuItem component={NavLink} to="/friendRequests" style={getLinkStyle} onClick={handleMenuClose}>
                  FriendRequests
                </MenuItem>
              </Menu>
            </div>
            <MenuItem component={NavLink} to="/trip" style={getLinkStyle}>
              Trip management
            </MenuItem>
            <MenuItem component={NavLink} to="/aiChat" style={getLinkStyle}>
              Chat With AI Bot
            </MenuItem>
            <MenuItem component={NavLink} to="/mytrip" style={getLinkStyle}>
              My Trips
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
