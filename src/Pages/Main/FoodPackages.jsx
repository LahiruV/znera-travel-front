import React from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import TripNavbar from '../../Components/NavBar/TripNavBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import CardList from '../../Components/CardList';

const defaultTheme = createTheme();

const foodpackages = [
  {
      id: 1,
      name: 'Full Board',
      description: 'Includes breakfast, lunch, and dinner. Perfect for travelers who prefer having all meals provided.',
      image: 'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      percentage: 15,
  },
  {
      id: 2,
      name: 'Half Board',
      description: 'Includes breakfast and dinner. Ideal for travelers who like to explore local cuisine during lunch.',
      image: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      percentage: 8,
  }
];


export default function FoodPackages() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <TripNavbar />
      <Container>
       <CardList props={foodpackages} />
      </Container>
    </ThemeProvider>
  );
}
