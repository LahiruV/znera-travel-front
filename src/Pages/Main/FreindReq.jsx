// src/pages/FriendReq/FriendReq.jsx

import React, { useState } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, Typography, Button, List, ListItem, ListItemText, Avatar, Grid, Card, CardContent, CardActions } from '@mui/material';

const defaultTheme = createTheme();

const dummyFriendRequests = [
  { id: 1, name: 'John Doe', avatar: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Jane Smith', avatar: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Alice Johnson', avatar: 'https://via.placeholder.com/150' },
];

export default function FriendReq() {
  const [friendRequests, setFriendRequests] = useState(dummyFriendRequests);
  const [friends, setFriends] = useState([]);

  const handleAccept = (id) => {
    const friendRequest = friendRequests.find((req) => req.id === id);
    setFriends([...friends, friendRequest]);
    setFriendRequests(friendRequests.filter((req) => req.id !== id));
  };

  const handleSendRequest = () => {
    const newFriendRequest = {
      id: friendRequests.length + friends.length + 1,
      name: 'New Friend',
      avatar: 'https://via.placeholder.com/150',
    };
    setFriendRequests([...friendRequests, newFriendRequest]);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Container>
        <Box my={4} sx={{paddingTop: '130px'}}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Friend Requests
          </Typography>
          <Box display="flex" justifyContent="center" mb={4}>
            <Button variant="contained" color="primary" onClick={handleSendRequest}>
              Send Friend Request
            </Button>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h2" gutterBottom>
                Pending Requests
              </Typography>
              <List>
                {friendRequests.map((req) => (
                  <ListItem key={req.id}>
                    <Card sx={{ width: '100%' }}>
                      <CardContent>
                        <Grid container alignItems="center">
                          <Grid item>
                            <Avatar alt={req.name} src={req.avatar} />
                          </Grid>
                          <Grid item xs>
                            <ListItemText primary={req.name} sx={{ ml: 2 }} />
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions>
                        <Button variant="contained" color="secondary" onClick={() => handleAccept(req.id)}>
                          Accept
                        </Button>
                      </CardActions>
                    </Card>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h2" gutterBottom>
                Friends
              </Typography>
              <List>
                {friends.map((friend) => (
                  <ListItem key={friend.id}>
                    <Card sx={{ width: '100%' }}>
                      <CardContent>
                        <Grid container alignItems="center">
                          <Grid item>
                            <Avatar alt={friend.name} src={friend.avatar} />
                          </Grid>
                          <Grid item xs>
                            <ListItemText primary={friend.name} sx={{ ml: 2 }} />
                          </Grid>
                        </Grid>
                      </CardContent>
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
