import { useState } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Typography, Paper, Button } from '@mui/material';
import TripNavbar from '../../Components/NavBar/TripNavBar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Trip() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [noOfDays, setNoOfDays] = useState('');
    const [noOfPersons, setNoOfPersons] = useState('');
    const [accommodation, setAccommodation] = useState('');
    const [transport, setTransport] = useState('');
    const [foodPackage, setFoodPackage] = useState('');
    const loguser = sessionStorage.getItem('user');

    const calculateBudget = () => {
        const totalCostPerPerson = noOfDays * (parseFloat(accommodation) + parseFloat(transport) + parseFloat(foodPackage));
        const totalCost = totalCostPerPerson * noOfPersons;
        return { totalCost, totalCostPerPerson };
    };

    const { totalCost, totalCostPerPerson } = calculateBudget();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!name || !location || !noOfDays || !noOfPersons || !accommodation || !transport || !foodPackage) {
            return Swal.fire({
                title: "Error!",
                text: "All fields are required.",
                icon: 'error',
                confirmButtonText: "OK"
            });
        }

        const tripData = {
            name,
            location,
            noOfDays,
            noOfPersons,
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

            await Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: 'success',
                confirmButtonText: "OK"
            }).then(() => {
                navigate('/mytrip');
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: 'error',
                confirmButtonText: "OK"
            });
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
                            required
                        />
                        <TextField
                            label="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            sx={{ mb: 2, width: '100%' }}
                            required
                        />
                        <TextField
                            label="Number of Days"
                            type="number"
                            value={noOfDays}
                            onChange={(e) => setNoOfDays(e.target.value)}
                            sx={{ mb: 2, width: '100%' }}
                            required
                        />
                        <TextField
                            label="Number of Persons"
                            type="number"
                            value={noOfPersons}
                            onChange={(e) => setNoOfPersons(e.target.value)}
                            sx={{ mb: 2, width: '100%' }}
                            required
                        />
                        <TextField
                            label="Accommodation Cost"
                            value={accommodation}
                            onChange={(e) => setAccommodation(e.target.value)}
                            sx={{ mb: 2, width: '100%' }}
                            required
                        />
                        <TextField
                            label="Transport Cost"
                            value={transport}
                            onChange={(e) => setTransport(e.target.value)}
                            sx={{ mb: 2, width: '100%' }}
                            required
                        />
                        <TextField
                            label="Food Package Cost"
                            value={foodPackage}
                            onChange={(e) => setFoodPackage(e.target.value)}
                            sx={{ mb: 4, width: '100%' }}
                            required
                        />
                        <Typography variant="h6">Total Budget: LKR {totalCost.toFixed(2)}</Typography>
                        <Typography variant="h6">Per Person Budget: LKR {totalCostPerPerson.toFixed(2)}</Typography>
                        <Button
                            size='medium'
                            color='warning'
                            variant="contained"
                            sx={{ marginTop: '5px' }}
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
