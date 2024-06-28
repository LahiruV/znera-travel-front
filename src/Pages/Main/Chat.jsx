import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function Chat () {


    return (
        <ThemeProvider theme={defaultTheme}>
             <Navbar />                               
        </ThemeProvider>
    );
}