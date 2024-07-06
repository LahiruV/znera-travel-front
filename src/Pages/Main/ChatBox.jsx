import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Button, List, ListItem, ListItemText, Typography, Paper, Avatar } from '@mui/material';

const defaultTheme = createTheme();

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const loguser = sessionStorage.getItem('user');
  const receiver = sessionStorage.getItem('receiver');
  const uniqueChatId1 = loguser + receiver;
  const uniqueChatId2 = receiver + loguser;

  const getMessages = async () => {
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
      const response = await axios.get(`http://localhost:5000/api/chat/getchats`, config);
      const filteredMessages = response.data.filter(message => message.uniqueChatId1 === uniqueChatId1 || message.uniqueChatId2 === uniqueChatId2 || message.uniqueChatId1 === uniqueChatId2 || message.uniqueChatId2 === uniqueChatId1);
      setMessages(filteredMessages);
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  const handleSendMessage = async () => {
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
      const data = {
        user1: loguser,
        user2: receiver,
        uniqueChatId1: uniqueChatId1,
        uniqueChatId2: uniqueChatId2,
        messages: message
      };
      console.log('Sending message', data);
      const response = await axios.post('http://localhost:5000/api/chat/chat', data, config);
      console.log('Message sent', response.data);         
      setMessage('');
    } catch (error) {
      console.error('Error sending message', error.response.data);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMessages();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Container sx={{ paddingTop: '100px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Chat Zone
        </Typography>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, border: '1px solid #ccc', borderRadius: '4px', padding: '16px' }}>
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index} sx={{ display: 'flex', justifyContent: msg.user1._id === loguser ? 'flex-end' : 'flex-start' }}>
                {!msg.isSender && (
                  <Avatar alt={msg.user1.name} src={msg.user1.profile} sx={{ mr: 2 }} />
                )}
                <Paper sx={{ padding: '10px', backgroundColor: msg.user1._id === loguser ? '#cfe9ff' : '#e0e0e0', maxWidth: '70%' }}>
                  <ListItemText primary={msg.messages} />
                </Paper>
                {msg.user1 === loguser && (
                  <Avatar alt={msg.user1.name} src={msg.user1.profile} sx={{ ml: 2 }} />
                )}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ backgroundColor: 'white', padding: '16px', borderTop: '1px solid #ccc' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ChatBox;
