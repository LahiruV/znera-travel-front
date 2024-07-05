import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, Typography, List, ListItem, ListItemText, Button, Avatar, Card, CardContent, CardActions } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const defaultTheme = createTheme();

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const loguser = sessionStorage.getItem('user');

  useEffect(() => {
    const fetchSuggestions = async () => {
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

        const response = await axios.get(`https://backendnizz.onrender.com/api/friend/suggestion/${loguser}`, config);
        setSuggestions(response.data.friendList);
      } catch (error) {
        console.error('Error fetching suggestions', error);
      }
    };

    fetchSuggestions();
  }, [loguser]);

  const handleSendRequest = async (id) => {
    const data = {
      from: loguser,
      to: id
    };

    console.log('Sending friend request with data:', data);

    try {
      const token = sessionStorage.getItem('token');

      if (!token) {
        console.error('No token found');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post('https://backendnizz.onrender.com/api/friend/addFriend', data, config);
      console.log('Response:', response);
      Swal.fire({
        title: 'Success!',
        text: "Friend request sent!",
        icon: 'success',
        confirmButtonText: 'OK',
      });
      setSuggestions(suggestions.filter(suggestion => suggestion.user._id !== id));
    } catch (error) {
      console.error('Error sending friend request', error.response.data);
      Swal.fire({
        title: 'Error!',
        text: "Already sent friend request!",
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Container>
        <Box my={4} sx={{ paddingTop: '130px' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Friend Suggestions
          </Typography>
          <List>
            {suggestions.map((suggestion) => (
              <ListItem key={suggestion.user._id}>
                <Card sx={{ width: '100%' }}>
                  <CardContent>
                    <Avatar alt={suggestion.user.name} src={suggestion.user.profile} />
                    <ListItemText primary={suggestion.user.name} sx={{ ml: 2 }} />
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary" onClick={() => handleSendRequest(suggestion.user._id)}>
                      Add Friend
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
