import React from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import TripNavbar from '../../Components/NavBar/TripNavBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import CardList from '../../Components/CardList';

const defaultTheme = createTheme();

const transport = [
  {
    id: 1,
    name: 'Transport 1',
    description: 'A beautiful place with stunning views.',
    image: 'https://via.placeholder.com/150', // replace with actual image URL
    price: 100,
  },
  {
    id: 2,
    name: 'Transport 2',
    description: 'A serene location perfect for relaxation.',
    image: 'https://via.placeholder.com/150', // replace with actual image URL
    price: 150,
  },
  {
    id: 3,
    name: 'Transport 3',
    description: 'An adventurous spot with lots of activities.',
    image: 'https://via.placeholder.com/150', // replace with actual image URL
    price: 200,
  },
];

export default function Transport() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <TripNavbar />
      <Container>
       <CardList props={transport} />
      </Container>
    </ThemeProvider>
  );
}
