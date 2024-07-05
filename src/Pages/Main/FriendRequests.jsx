import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, Typography, List, ListItem, ListItemText, Button, Avatar, Card, CardContent, CardActions } from '@mui/material';
import axios from 'axios';

const defaultTheme = createTheme();

export default function FriendRequests() {
  const [requests, setRequests] = useState([]);
  const loguser = sessionStorage.getItem('user');

  useEffect(() => {
    const fetchRequests = async () => {
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

        const response = await axios.get(`https://backendnizz.onrender.com/api/friend/allReq/${loguser}`, config);
        setRequests(response.data.requests);
      } catch (error) {
        console.error('Error fetching friend requests', error);
      }
    };

    fetchRequests();
  }, [loguser]);

  const handleRequest = async (id, status) => {
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

      const response = await axios.put(`https://backendnizz.onrender.com/api/friend/updateReq/${id}?status=${status}`, {}, config);
      console.log(response.data);
      setRequests(requests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error updating friend request', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Container>
        <Box my={4} sx={{ paddingTop: '130px' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Friend Requests
          </Typography>
          <List>
            {requests.map((request) => (
              <ListItem key={request._id}>
                <Card sx={{ width: '100%' }}>
                  <CardContent>
                    <Avatar alt={request.from.name} src={request.from.profile} />
                    <ListItemText primary={request.from.name} sx={{ ml: 2 }} />
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary" onClick={() => handleRequest(request._id, '1')}>
                      Accept
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleRequest(request._id, '2')}>
                      Reject
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
