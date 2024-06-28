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
          <MenuItem component={NavLink} to="https://www.ubereats.com/lk?utm_source=AdWords_Brand&utm_campaign=CM2224197-search-google-brand_163_-99_LK-National_e_web_acq_cpc_en_T1_Generic_BM_uber%20eats_kwd-111378724137_665313990421_149718752371_b_c&campaign_id=19098040052&adg_id=149718752371&fi_id=&match=b&net=g&dev=c&dev_m=&ad_id=665313990421&cre=665313990421&kwid=kwd-111378724137&kw=uber%20eats&placement=&tar=&gclsrc=aw.ds&gad_source=1&gclid=EAIaIQobChMIkfG10bH9hgMVQ6hmAh2A_A3PEAAYASAAEgLOx_D_BwE" style={getLinkStyle}>
            Food Zone
          </MenuItem>
          <MenuItem component={NavLink} to="/freindZone" style={getLinkStyle} >
            Friend Zone
          </MenuItem>
          <MenuItem component={NavLink} to="/profile" style={getLinkStyle}>
            Group Zone
          </MenuItem>
          <MenuItem component={NavLink} to="/profile" style={getLinkStyle}>
            Trip management
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
