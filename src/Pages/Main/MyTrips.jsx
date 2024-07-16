import { useState, useEffect } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';

const defaultTheme = createTheme();

export default function MyTrips() {
    const [trips, setTrips] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentTrip, setCurrentTrip] = useState({
        name: '',
        location: '',
        noOfDays: '',
        noOfPersons: '',
        accommodation: '',
        transport: '',
        foodPackage: '',
        _id: ''
    });

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'location', headerName: 'Location', width: 150 },
        { field: 'noOfDays', headerName: 'No. of Days', width: 150 },
        { field: 'noOfPersons', headerName: 'No. of Persons', width: 150 },
        { field: 'accommodation', headerName: 'Accommodation (LKR)', width: 150 },
        { field: 'transport', headerName: 'Transport (LKR)', width: 150 },
        { field: 'foodPackage', headerName: 'Food Package (LKR)', width: 150 },
        { field: 'totalCost', headerName: 'Total Cost (LKR)', width: 150 },
        { field: 'totalCostPerPerson', headerName: 'Cost Per Person (LKR)', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 300,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(params.row)} // Use params.row to get the trip data
                        style={{ marginRight: '10px' }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(params.row._id)} // Use params.row._id to get the MongoDB id
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const getTrips = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/trip/trips', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
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
            const response = await fetch(`http://localhost:5000/api/trip/trips/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete trip');
            }

            setTrips(prevTrips => prevTrips.filter(trip => trip._id !== id));
            console.log('Trip deleted successfully');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleEdit = (trip) => {
        setCurrentTrip(trip);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentTrip({
            name: '',
            location: '',
            noOfDays: '',
            noOfPersons: '',
            accommodation: '',
            transport: '',
            foodPackage: '',
            _id: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentTrip(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        if (
            !currentTrip.name ||
            !currentTrip.location ||
            !currentTrip.noOfDays ||
            !currentTrip.noOfPersons ||
            !currentTrip.accommodation ||
            !currentTrip.transport ||
            !currentTrip.foodPackage
        ) {
            alert('All fields are required!');
            return;
        }

        const updatedTrip = {
            ...currentTrip,
            totalCost: currentTrip.noOfDays * (parseFloat(currentTrip.accommodation) + parseFloat(currentTrip.transport) + parseFloat(currentTrip.foodPackage)),
            totalCostPerPerson: (currentTrip.noOfDays * (parseFloat(currentTrip.accommodation) + parseFloat(currentTrip.transport) + parseFloat(currentTrip.foodPackage))) / currentTrip.noOfPersons,
        };

        try {
            const response = await fetch(`http://localhost:5000/api/trip/trips/${currentTrip._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedTrip)
            });

            if (!response.ok) {
                throw new Error('Failed to update trip');
            }

            setTrips(prevTrips => prevTrips.map(trip => trip._id === currentTrip._id ? updatedTrip : trip));
            handleClose();
            console.log('Trip updated successfully');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Navbar />
            <div style={{ width: '100%', marginTop: 50 }}>
                <DataGrid 
                    rows={trips} 
                    columns={columns} 
                    pageSize={5} 
                    style={{ color: 'black', backgroundColor: 'white' }}
                    getRowId={(row) => row._id}
                />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Trip</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                name="name"
                                value={currentTrip.name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Location"
                                name="location"
                                value={currentTrip.location}
                                onChange={handleChange}
                                fullWidth                                
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Number of Days"
                                name="noOfDays"
                                type="number"
                                value={currentTrip.noOfDays}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Number of Persons"
                                name="noOfPersons"
                                type="number"
                                value={currentTrip.noOfPersons}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Accommodation (LKR)"
                                name="accommodation"
                                value={currentTrip.accommodation}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Transport (LKR)"
                                name="transport"
                                value={currentTrip.transport}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Food Package (LKR)"
                                name="foodPackage"
                                value={currentTrip.foodPackage}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}
