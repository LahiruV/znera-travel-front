import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Button, List, ListItem, ListItemText, Typography, Paper, Avatar } from '@mui/material';

const defaultTheme = createTheme();

const AiChat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async () => {
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
        try {
            const response = await axios.post('http://localhost:5000/api/aiChat/sendMessage', { message }, config);
            const botResponse = response.data;
            setMessages((prevMessages) => [...prevMessages, { text: message, isSender: true }, { text: botResponse, isSender: false }]);
            setMessage('');
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Navbar />
            <Container sx={{ paddingTop: '100px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Chat Bot
                </Typography>
                <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, border: '1px solid #ccc', borderRadius: '4px', padding: '16px' }}>
                    <List>
                        {messages.map((msg, index) => (
                            <ListItem key={index} sx={{ display: 'flex', justifyContent: msg.isSender ? 'flex-end' : 'flex-start' }}>
                                <Paper sx={{ padding: '10px', backgroundColor: msg.isSender ? '#cfe9ff' : '#e0e0e0', maxWidth: '70%' }}>
                                    <ListItemText primary={msg.text} />
                                </Paper>
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
                        <Button variant="contained" color="primary" onClick={handleSendMessage}>
                            Send
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default AiChat;
