// src/pages/AddFriends/AddFriends.jsx

import React, { useState,useEffect } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, Typography, TextField, Button, List, ListItem, ListItemText, Avatar, Grid, Card, CardContent, CardActions } from '@mui/material';
import axios from 'axios';  

const defaultTheme = createTheme();

export default function AddFriends() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
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

        const response = await axios.get('http://localhost:5000/api/auth/users', config);
        setUsers(response.data);        
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendRequest = (id) => {
    console.log(`Friend request sent to user with id: ${id}`);    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Container>
        <Box my={4} sx={{paddingTop: '130px'}}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Add Friends
          </Typography>
          <Box display="flex" justifyContent="center" mb={4}>
            <TextField
              variant="outlined"
              placeholder="Search for friends"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ marginRight: '1rem' }}
            />
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <List>
                {filteredUsers.map((user) => (
                  <ListItem key={user._id}>
                    <Card sx={{ width: '100%' }}>
                      <CardContent>
                        <Grid container alignItems="center">
                          <Grid item>
                            <Avatar alt={user.name} src={user.avatar} />
                          </Grid>
                          <Grid item xs>
                            <ListItemText primary={user.name} sx={{ ml: 2 }} />
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions>
                        <Button variant="contained" color="secondary" onClick={() => handleSendRequest(user._id)}>
                          Send Friend Request
                        </Button>
                      </CardActions>
                    </Card>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
