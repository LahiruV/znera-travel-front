import React, { useState } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, MenuItem, Typography, Paper, Button } from '@mui/material';
import TripNavbar from '../../Components/NavBar/TripNavBar';
import axios from 'axios';

const defaultTheme = createTheme();

const locations = [
    {
        id: 1,
        name: 'Jaffna',
        description: 'Jaffna is a city on the northern tip of Sri Lanka. Nallur Kandaswamy is a huge Hindu temple with golden arches and an ornate gopuram tower. By the coast, star-shaped Jaffna Fort was built by the Portuguese in the 17th century and later occupied by the Dutch and British.',
        image: 'https://images.unsplash.com/photo-1578161804288-59162292b136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // replace with actual image URL
        price: 6500,
    },

    {
        id: 2,
        name: 'Kandy',
        description: 'Kandy is a large city in central Sri Lanka. Its set on a plateau surrounded by mountains, which are home to tea plantations and biodiverse rainforest. The citys heart is scenic Kandy Lake (Bogambara Lake), which is popular for strolling.. Kandy is famed for sacred Buddhist sites,',
        image: 'https://images.unsplash.com/photo-1566766188646-5d0310191714?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // replace with actual image URL
        price: 8000,
    },

    {
        id: 3,
        name: 'Galle',
        description: 'Galle is a city on the southwest coast of Sri Lanka. It’s known for Galle Fort, the fortified old city founded by Portuguese colonists in the 16th century. Stone sea walls, expanded by the Dutch, encircle car-free streets with architecture reflecting Portuguese, Dutch and British rule.',
        image: 'https://images.unsplash.com/photo-1713038948592-5d070e8e8459?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // replace with actual image URL
        price: 7500,
    },
];

const seasons = [
    { name: 'Season', percentage: 5 },
    { name: 'Off Season', percentage: 1 },
];

const accommodations = [
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

const transports = [
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

const foodPackages = [
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

export default function Trip() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [noOfDays, setNoOfDays] = useState('');
    const [noOfPersons, setNoOfPersons] = useState('');
    const [season, setSeason] = useState('');
    const [accommodation, setAccommodation] = useState('');
    const [transport, setTransport] = useState('');
    const [foodPackage, setFoodPackage] = useState('');
    const loguser = sessionStorage.getItem('user');

    const calculateBudget = () => {
        const locationPrice = locations.find(loc => loc.name === location)?.price || 0;
        const seasonPercentage = seasons.find(sea => sea.name === season)?.percentage || 0;
        const accommodationPercentage = accommodations.find(acc => acc.name === accommodation)?.percentage || 0;
        const transportPercentage = transports.find(trans => trans.name === transport)?.percentage || 0;
        const foodPackagePercentage = foodPackages.find(food => food.name === foodPackage)?.percentage || 0;

        const totalCostPerPerson = noOfDays * locationPrice * (1 + (seasonPercentage + accommodationPercentage + transportPercentage + foodPackagePercentage) / 100);
        const totalCost = totalCostPerPerson * noOfPersons;

        return { totalCost, totalCostPerPerson };
    };

    const { totalCost, totalCostPerPerson } = calculateBudget();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tripData = {
            name,
            location,
            noOfDays,
            noOfPersons,
            season,
            accommodation,
            transport,
            foodPackage,
            totalCost,
            totalCostPerPerson,
            loguser
        };
        try {            
          const response = await axios.post('http://localhost:5000/api/trip/addTrip', tripData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
          });
          console.log(response.data.message);
        } catch (error) {
          console.error('Error:', error.response ? error.response.data.error : error.message);
        }
      };
   

    return (
        <ThemeProvider theme={defaultTheme}>
            <Navbar />
            <TripNavbar />
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        paddingTop: '50px',
                        paddingBottom: '50px',
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 4,
                            borderRadius: 2,
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                            width: '400px',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h4" sx={{ mb: 4 }}>Budget Plan</Typography>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mb: 2, width: '100%' }}
                        />
                        <TextField
                            select
                            label="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            sx={{ mb: 2, width: '100%' }}
                        >
                            {locations.map((loc) => (
                                <MenuItem key={loc.name} value={loc.name}>
                                    {loc.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Number of Days"
                            type="number"
                            value={noOfDays}
                            onChange={(e) => setNoOfDays(e.target.value)}
                            sx={{ mb: 2, width: '100%' }}
                        />
                        <TextField
                            label="Number of Persons"
                            type="number"
                            value={noOfPersons}
                            onChange={(e) => setNoOfPersons(e.target.value)}
                            sx={{ mb: 2, width: '100%' }}
                        />
                        <TextField
                            select
                            label="Season"
                            value={season}
                            onChange={(e) => setSeason(e.target.value)}
                            sx={{ mb: 2, width: '100%' }}
                        >
                            {seasons.map((sea) => (
                                <MenuItem key={sea.name} value={sea.name}>
                                    {sea.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Accommodation"
                            value={accommodation}
                            onChange={(e) => setAccommodation(e.target.value)}
                            sx={{ mb: 2, width: '100%' }}
                        >
                            {accommodations.map((acc) => (
                                <MenuItem key={acc.name} value={acc.name}>
                                    {acc.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Transport"
                            value={transport}
                            onChange={(e) => setTransport(e.target.value)}
                            sx={{ mb: 2, width: '100%' }}
                        >
                            {transports.map((trans) => (
                                <MenuItem key={trans.name} value={trans.name}>
                                    {trans.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Food Package"
                            value={foodPackage}
                            onChange={(e) => setFoodPackage(e.target.value)}
                            sx={{ mb: 4, width: '100%' }}
                        >
                            {foodPackages.map((food) => (
                                <MenuItem key={food.name} value={food.name}>
                                    {food.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Typography variant="h6">Total Budget: LKR {totalCost.toFixed(2)}</Typography>
                        <Typography variant="h6">Per Person Budget: LKR {totalCostPerPerson.toFixed(2)}</Typography>
                        <Button size='medium' color='warning' variant="contained" sx={{ marginTop: '5px' }}
                            onClick={handleSubmit}
                        >Save</Button>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
