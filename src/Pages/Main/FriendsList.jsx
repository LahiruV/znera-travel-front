import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, Typography, List, ListItem, ListItemText, Button, Avatar, Card, CardContent, CardActions } from '@mui/material';
import axios from 'axios';

const defaultTheme = createTheme();

export default function FriendsList() {
    const [friends, setFriends] = useState([]);
    const loguser = sessionStorage.getItem('user');

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const token = sessionStorage.getItem('token');

                if (!token) {
                    console.error('No token found');
                    return;
                }

                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                const response = await axios.get(`https://backendnizz.onrender.com/api/friend/allFriends/${loguser}`, config);
                setFriends(response.data.friends);
            } catch (error) {
                console.error('Error fetching friends', error);
            }
        };

        fetchFriends();
    }, [loguser]);

    const handleRemoveFriend = async (id) => {
        try {
            const token = sessionStorage.getItem('token');

            if (!token) {
                console.error('No token found');
                return;
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.delete(`https://backendnizz.onrender.com/api/friend/removeFriend/${id}`, config);
            console.log(response.data);
            setFriends(friends.filter(friend => friend._id !== id));
        } catch (error) {
            console.error('Error removing friend', error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Navbar />
            <Container>
                <Box my={4} sx={{ paddingTop: '130px' }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Friends List
                    </Typography>
                    <List>
                        {friends.map((friend) => (
                            <ListItem key={friend._id}>
                                <Card sx={{ width: '100%' }}>
                                    <CardContent>
                                        {friend.from._id === loguser ? (
                                            <>
                                                <Avatar alt={friend.to.name} src={friend.to.avatar} />
                                                <ListItemText primary={friend.to.name} sx={{ ml: 2 }} />
                                            </>
                                        ) : friend.to._id === loguser ? (
                                            <>
                                                <Avatar alt={friend.from.name} src={friend.from.avatar} />
                                                <ListItemText primary={friend.from.name} sx={{ ml: 2 }} />
                                            </>
                                        ) : null}
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="contained" color="secondary" onClick={() => handleRemoveFriend(friend._id)}>
                                            Remove Friend
                                        </Button>
                                    </CardActions>
                                </Card>
                            </ListItem>
                        ))}
                    </List>

                </Box>
            </Container>
        </ThemeProvider>
    );
}
