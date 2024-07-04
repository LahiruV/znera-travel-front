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
    name: 'Normal Transport',
    description: 'Reliable and affordable transportation for budget-conscious travelers. Provides basic comfort and efficiency.',
    image: 'https://plus.unsplash.com/premium_photo-1664302152991-d013ff125f3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    percentage: 10,
  },
  {
    id: 2,
    name: 'Luxury Transport',
    description: 'Comfortable and stylish transportation with additional amenities. Ideal for those who want to travel in comfort and style.',
    image: 'https://images.unsplash.com/photo-1482287068671-7fb7325e1a8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    percentage: 35,
  },
  {
    id: 3,
    name: 'VIP Transport',
    description: 'Exclusive and luxurious transportation with top-notch services. Perfect for those seeking the highest level of comfort and convenience.',
    image: 'https://images.unsplash.com/photo-1531314041864-9e2d785be966?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    percentage: 50,
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
