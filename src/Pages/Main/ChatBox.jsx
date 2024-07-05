import React, { useState } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Button, List, ListItem, ListItemText, Typography, Paper, Avatar } from '@mui/material';

const defaultTheme = createTheme();

const loguser = 'user1'; // Example logged-in user ID
const users = {
  user1: { name: 'User One', avatar: 'https://via.placeholder.com/150' },
  user2: { name: 'User Two', avatar: 'https://via.placeholder.com/150' },
};

export default function ChatBox() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hi there!', isSender: true, userId: 'user1' },
    { text: 'Hello!', isSender: false, userId: 'user2' }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, isSender: true, userId: loguser }]);
      setMessage('');

      // Simulate receiving a message after 1 second
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Received message', isSender: false, userId: 'user2' },
        ]);
      }, 1000);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Container sx={{ paddingTop: '130px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Chat Zone
        </Typography>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, border: '1px solid #ccc', borderRadius: '4px', padding: '16px' }}>
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index} sx={{ display: 'flex', justifyContent: msg.isSender ? 'flex-end' : 'flex-start' }}>
                {!msg.isSender && (
                  <Avatar alt={users[msg.userId].name} src={users[msg.userId].avatar} sx={{ mr: 2 }} />
                )}
                <Paper sx={{ padding: '10px', backgroundColor: msg.isSender ? '#cfe9ff' : '#e0e0e0', maxWidth: '70%' }}>
                  <ListItemText primary={msg.text} />
                </Paper>
                {msg.isSender && (
                  <Avatar alt={users[msg.userId].name} src={users[msg.userId].avatar} sx={{ ml: 2 }} />
                )}
              </ListItem>
            ))}
          </List>
        </Box>
       
        <Box sx={{backgroundColor:'white'}}>
        <Box sx={{ display: 'flex', gap: 2 ,}}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button sx={{width:'150px'}}variant="contained" color="warning" onClick={handleSendMessage}>
            Send
          </Button>
        </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
