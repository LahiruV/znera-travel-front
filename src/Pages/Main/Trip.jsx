import React, { useState } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, MenuItem, Typography, Paper, AppBar, Toolbar, Button } from '@mui/material';
import TripNavbar from '../../Components/NavBar/TripNavBar';

const defaultTheme = createTheme();

const locations = [
    { name: 'Location 1', percentage: 10 },
    { name: 'Location 2', percentage: 20 },
];

const seasons = [
    { name: 'Summer', percentage: 15 },
    { name: 'Winter', percentage: 10 },
];

const accommodations = [
    { name: 'Hotel', price: 100 },
    { name: 'Hostel', price: 50 },
];

const transports = [
    { name: 'Car', price: 50 },
    { name: 'Bus', price: 20 },
];

const foodPackages = [
    { name: 'Full Board', price: 30 },
    { name: 'Half Board', price: 15 },
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

    const calculateBudget = () => {
        const locationPercentage = locations.find(loc => loc.name === location)?.percentage || 0;
        const seasonPercentage = seasons.find(sea => sea.name === season)?.percentage || 0;
        const accommodationPrice = accommodations.find(acc => acc.name === accommodation)?.price || 0;
        const transportPrice = transports.find(trans => trans.name === transport)?.price || 0;
        const foodPackagePrice = foodPackages.find(food => food.name === foodPackage)?.price || 0;

        const totalCostPerPerson = noOfDays * (accommodationPrice + transportPrice + foodPackagePrice) * (1 + (locationPercentage + seasonPercentage) / 100);
        const totalCost = totalCostPerPerson * noOfPersons;

        return { totalCost, totalCostPerPerson };
    };

    const { totalCost, totalCostPerPerson } = calculateBudget();

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
                        <Typography variant="h6">Total Budget: ${totalCost.toFixed(2)}</Typography>
                        <Typography variant="h6">Per Person Budget: ${totalCostPerPerson.toFixed(2)}</Typography>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
