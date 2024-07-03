import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';


export default function CardList({ props }) {
    return (
        <Box sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                {props.map((data) => (
                    <Grid item key={data.id} xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={data.image}
                                alt={data.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {data.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {data.description}
                                </Typography>
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Price: ${data.price}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
