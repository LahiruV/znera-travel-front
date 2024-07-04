import React from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import TripNavbar from '../../Components/NavBar/TripNavBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import CardList from '../../Components/CardList';

const defaultTheme = createTheme();

const accomadations = [
  {
    id: 1,
    name: 'Normal Hotel',
    description: 'A cozy hotel offering a comfortable stay with all essential amenities. Ideal for budget travelers who value simplicity and convenience.',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    percentage: 10
  },
  {
    id: 2,
    name: 'Luxury Hotel',
    description: 'An elegant hotel featuring luxurious rooms, fine dining, and top-notch services. Perfect for those seeking a premium experience.',
    image: 'https://plus.unsplash.com/premium_photo-1661676056771-f6c2711249e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    percentage: 20
  },
  {
    id: 3,
    name: 'Premium Hotel',
    description: 'A top-tier hotel offering unparalleled luxury and comfort. Features exquisite decor, world-class amenities, and exceptional service.',
    image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    percentage: 30
  },
];

export default function Accommodation() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <TripNavbar />
      <Container>
       <CardList props={accomadations} />
      </Container>
    </ThemeProvider>
  );
}
