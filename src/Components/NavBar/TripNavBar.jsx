// src/Navbar.js
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
          <Button color="inherit" href='https://www.uber.com/us/en/ride/'>View Transports</Button>
          <Button color="inherit" href='https://www.ubereats.com/lk?utm_source=AdWords_Brand&utm_campaign=CM2224197-search-google-brand_163_-99_LK-National_e_web_acq_cpc_en_T1_Generic_BM_uber%20eats_kwd-111378724137_665313990421_149718752371_b_c&campaign_id=19098040052&adg_id=149718752371&fi_id=&match=b&net=g&dev=c&dev_m=&ad_id=665313990421&cre=665313990421&kwid=kwd-111378724137&kw=uber%20eats&placement=&tar=&gclsrc=aw.ds&gad_source=1&gclid=EAIaIQobChMIkfG10bH9hgMVQ6hmAh2A_A3PEAAYASAAEgLOx_D_BwE'>View Food Packages</Button>
          <Button color="inherit" onClick={()=>{navigate('/trip')}}>Budget</Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default TripNavbar;
