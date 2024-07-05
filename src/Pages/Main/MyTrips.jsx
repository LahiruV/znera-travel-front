import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const defaultTheme = createTheme();



export default function MyTrips() {
    const [trips, setTrips] = useState([]);
    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'location', headerName: 'Location', width: 150 },
        { field: 'noOfDays', headerName: 'No. of Days', width: 150 },
        { field: 'noOfPersons', headerName: 'No. of Persons', width: 150 },
        { field: 'season', headerName: 'Season', width: 150 },
        { field: 'accommodation', headerName: 'Accommodation', width: 150 },
        { field: 'transport', headerName: 'Transport', width: 150 },
        { field: 'foodPackage', headerName: 'Food Package', width: 150 },
        { field: 'totalCost', headerName: 'Total Cost (LKR)', width: 150 },
        { field: 'totalCostPerPerson', headerName: 'Cost Per Person (LKR)', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(params.row._id)} // Use params.row._id to get the MongoDB id
                >
                    Delete
                </Button>
            ),
        },
    ];
    const getTrips = async () => {
        try {
            const response = await fetch('https://backendnizz.onrender.com/api/trip/trips', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Assuming you're using a token for auth
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch trips');
            }

            const data = await response.json();
            const loguser = sessionStorage.getItem('user');
            const filteredTrips = data.filter(trip => trip.loguser === loguser);
            setTrips(filteredTrips);
            console.log(filteredTrips);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        getTrips();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://backendnizz.onrender.com/api/trip/trips/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Assuming you're using a token for auth
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete trip');
            }

            // Update state after successful deletion
            setTrips(prevTrips => prevTrips.filter(trip => trip._id !== id));
            console.log('Trip deleted successfully');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Navbar />
            <div style={{  width: '100%', marginTop: 50 }}>
                <DataGrid 
                    rows={trips} 
                    columns={columns} 
                    pageSize={5} 
                    style={{ color: 'black', backgroundColor: 'white' }}
                    getRowId={(row) => row._id} // Map _id to id
                />
            </div>
        </ThemeProvider>
    );
}
