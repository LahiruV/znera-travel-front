// src/pages/AddFriends/AddFriends.jsx

import React, { useState } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, Typography, TextField, Button, List, ListItem, ListItemText, Avatar, Grid, Card, CardContent, CardActions } from '@mui/material';

const defaultTheme = createTheme();

const dummyUsers = [
  { id: 1, name: 'John Doe', avatar: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Jane Smith', avatar: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Alice Johnson', avatar: 'https://via.placeholder.com/150' },
  // Add more dummy users as needed
];

export default function AddFriends() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = dummyUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendRequest = (id) => {
    console.log(`Friend request sent to user with id: ${id}`);
    // Add logic to send a friend request
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
                  <ListItem key={user.id}>
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
                        <Button variant="contained" color="secondary" onClick={() => handleSendRequest(user.id)}>
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
