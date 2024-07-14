import React, { useState } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import TripNavbar from '../../Components/NavBar/TripNavBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CardList from '../../Components/CardList';

const defaultTheme = createTheme();

const accommodations = [
  {
    id: 1,
    name: 'Normal Hotel',
    description: 'A cozy hotel offering a comfortable stay with all essential amenities. Ideal for budget travelers who value simplicity and convenience.',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/accommodation/normal',
    province: 'Western',
  },
  {
    id: 2,
    name: 'Luxury Hotel',
    description: 'An elegant hotel featuring luxurious rooms, fine dining, and top-notch services. Perfect for those seeking a premium experience.',
    image: 'https://plus.unsplash.com/premium_photo-1661676056771-f6c2711249e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/accommodation/luxury',
    province: 'Southern',
  },
  {
    id: 3,
    name: 'Premium Hotel',
    description: 'A top-tier hotel offering unparalleled luxury and comfort. Features exquisite decor, world-class amenities, and exceptional service.',
    image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/accommodation/premium',
    province: 'Western',
  },
];

const provinces = ['All', 'Western', 'Southern'];

export default function Accommodation() {
  const [selectedProvince, setSelectedProvince] = useState('All');

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const filteredAccommodations = selectedProvince === 'All'
    ? accommodations
    : accommodations.filter(accommodation => accommodation.province === selectedProvince);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <TripNavbar />
      <Container>
        <FormControl  variant="filled" margin="normal" sx={{backgroundColor:'white', width:'200px'}}>
          <InputLabel>Province</InputLabel>
          <Select
            value={selectedProvince}
            onChange={handleProvinceChange}
            label="Province"
          >
            {provinces.map(province => (
              <MenuItem key={province} value={province}>
                {province}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <CardList props={filteredAccommodations} />
      </Container>
    </ThemeProvider>
  );
}
