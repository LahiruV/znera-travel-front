import { useState } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import TripNavbar from '../../Components/NavBar/TripNavBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CardList from '../../Components/CardList';

const defaultTheme = createTheme();

const accommodations = [
  {
    id: 1,
    name: 'The Lake Forest Hotel',
    description: 'Scenic lakeside location, stunning views from rooms and restaurant, friendly and accommodating staff, well-appointed spacious rooms, excellent food accommodating dietary needs.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/5c/33/4f/the-lake-forest-hotel.jpg?w=1200&h=-1&s=1',
    link: 'https://www.tripadvisor.com/Hotel_Review-g304132-d18816510-Reviews-The_Lake_Forest_Hotel-Anuradhapura_North_Central_Province.html',
    province: 'Anuradhapura',
  },
  {
    id: 2,
    name: 'Aryana Hotel',
    description: 'Centrally located boutique hotel known for friendly staff, clean rooms, and exquisite Sri Lankan cuisine. Features peaceful atmosphere, lovely gardens, pool, and reasonable prices.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/3c/2b/cc/img-20190913-214152-largejpg.jpg?w=900&h=-1&s=1',
    link: 'https://www.tripadvisor.com/Hotel_Review-g304132-d16746608-Reviews-Aryana_Hotel-Anuradhapura_North_Central_Province.html',
    province: 'Anuradhapura',
  },
  {
    id: 3,
    name: 'Le Grand Galle',
    description: 'Luxurious Sri Lankan hotel with spacious rooms offering stunning views. Highly praised for breakfast buffet, dinner options and Blue restaurant. Features a beautiful pool, private beach, and cozy super deluxe room. Unforgettable for its exceptional hospitality and beautiful natural surroundings.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/3a/10/2a/pool-area.jpg?w=1200&h=-1&s=1',
    link: 'https://www.tripadvisor.com/Hotel_Review-g297896-d14033359-Reviews-Le_Grand_Galle-Galle_Galle_District_Southern_Province.html',
    province: 'Galle',
  },
  {
    id: 4,
    name: 'Mango House',
    description: 'Centrally located within Galle Fort, this budget-friendly hotel offers a charming colonial ambiance, spacious rooms, and a beautiful courtyard garden. Notable for its delicious traditional Sri Lankan meals, friendly staff, and unique wildlife encounters.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/9f/e5/51/mango-house.jpg?w=1200&h=-1&s=1',
    link: 'https://www.tripadvisor.com/Hotel_Review-g297896-d2034349-Reviews-Mango_House-Galle_Galle_District_Southern_Province.html',
    province: 'Galle',
  },
  {
    id: 5,
    name: 'Yara Galle Fort',
    description: 'Renovated heritage building with elegant interiors. Offers Sri Lankan breakfast, spacious rooms, and comfortable beds. Located near Galle Fort and local attractions.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/2b/57/e4/upper-floor-bed-room.jpg?w=1200&h=-1&s=1',
    link: 'https://www.tripadvisor.com/Hotel_Review-g297896-d14916776-Reviews-Yara_Galle_Fort-Galle_Galle_District_Southern_Province.html',
    province: 'Galle',
  },
];

const provinces = ['All', 'Anuradhapura', 'Galle'];

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
          <InputLabel>State</InputLabel>
          <Select
            value={selectedProvince}
            onChange={handleProvinceChange}
            label="State"
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
