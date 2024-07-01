import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const defaultTheme = createTheme();

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(4),
        paddingTop: '130px'
    },
    title: {
        marginBottom: theme.spacing(4),
    },
    card: {
        maxWidth: 345,
        margin: theme.spacing(2),
    },
    media: {
        height: 200,
    },
    carousel: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselImage: {
        width: '100%',
        height: '700px',
    },
    arrow: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'white',
        borderRadius: '50%',
        padding: theme.spacing(1),
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
    },
    prevArrow: {
        left: theme.spacing(2),
    },
    nextArrow: {
        right: theme.spacing(2),
    },
    description: {
        position: 'absolute',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: theme.spacing(2),
        width: '85%',
    },
}));

const Home = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const email = sessionStorage.getItem("cusmail");

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prevStep) => (prevStep === carouselImages.length - 1 ? 0 : prevStep + 1));
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handlePrevSlide = () => {
        setActiveStep((prevStep) => (prevStep === 0 ? carouselImages.length - 1 : prevStep - 1));
    };

    const handleNextSlide = () => {
        setActiveStep((prevStep) => (prevStep === carouselImages.length - 1 ? 0 : prevStep + 1));
    };

    const carouselImages = [
        'https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/413960/pexels-photo-413960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                const response = await axios.get('http://localhost:5000/api/auth/me', config);
                sessionStorage.setItem("user", response.data);                
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Navbar />
            <div className={classes.root}>
                <Typography variant="h2" align="center" className={classes.title} style={{ fontWeight: 'bold', }}>
                    Welcome to <span style={{ color: 'orange' }}>Zenra-Travels</span>
                    <hr style={{ width: '600px' }} />
                </Typography>
                <Grid container justifyContent="center">
                    <Grid item xs={12} lg={'auto'} >
                        <div className={classes.carousel}>
                            <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
                                {carouselImages.map((image, index) => (
                                    <div key={index}>
                                        <img src={image} alt={`Carousel Image ${index + 1}`} className={classes.carouselImage} />
                                    </div>
                                ))}
                            </SwipeableViews>
                            <Typography variant="body1" className={classes.description} align="center">
                                <Typography variant="h4" component="h3" gutterBottom style={{ fontWeight: 'bold' }}>
                                    Zenra - Travels
                                </Typography>
                                <Typography variant="body1" style={{ fontSize: '1.2rem', fontWeight: 'lighter' }}>
                                    Welcome to Zenra Travels, your ultimate travel companion for seamless and enjoyable travel planning. Whether you're embarking on a weekend getaway or a month-long adventure, we have everything you need to make your journey smooth and unforgettable. Explore a world of possibilities with our extensive database of travel destinations, find and book the best accommodations with ease, and use our comprehensive budget calculator to plan your expenses. Our goal is to make your travel planning as easy and enjoyable as possible, ensuring you have a stress-free and memorable travel experience. From booking rooms to searching for the best locations, Zenra Travels is here to assist you every step of the way.
                                </Typography>
                            </Typography>

                            <IconButton className={`${classes.arrow} ${classes.prevArrow}`} onClick={handlePrevSlide}>
                                <ArrowBackIcon />
                            </IconButton>
                            <IconButton className={`${classes.arrow} ${classes.nextArrow}`} onClick={handleNextSlide}>
                                <ArrowForwardIcon />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
                <hr />
                <Grid container justifyContent="center" spacing={4}>
                    <Grid item>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    title="Mexico"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Mexico
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Explore Mexico's vibrant culture, stunning beaches, and rich history with Zenra Travels. Book your dream vacation effortlessly today!
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    title="Thailand"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Thailand
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Explore Thailand's rich culture, stunning beaches, vibrant cities, and delicious cuisine with Zenra Travels. Plan your unforgettable journey today!
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://images.pexels.com/photos/2450296/pexels-photo-2450296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    title="Norway"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Norway
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Explore Norway's stunning fjords, vibrant cities, and Northern Lights. Plan your adventure with Zenra Travels for unforgettable experiences.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
                <hr />
                <Typography variant="body1" style={{ paddingTop: '20px', paddingBottom: '20px', }} align="center">
                    <Typography variant="h4" component="h3" gutterBottom style={{ fontWeight: 'bold' }}>
                        Zenra <span style={{ color: 'orange' }}>Travels</span>
                        <hr style={{ width: '500px', }}></hr>
                    </Typography>
                    <Typography variant="body1" style={{ fontSize: '1.2rem', fontWeight: 'lighter' }}>
                        Discover seamless travel planning with Zenra Travels. Explore top destinations, easily book accommodations, and use our budget calculator for hassle-free trips. Whether it's a short getaway or an extended adventure, we make your journey enjoyable and stress-free. Let Zenra Travels guide you every step of the way.
                    </Typography>
                </Typography>
                <hr />
                <Grid container justifyContent="center" spacing={4}>
                    <Grid item>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://images.pexels.com/photos/883758/pexels-photo-883758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    title="Weligama"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Weligama
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Explore Weligama's stunning beaches, perfect for surfing and relaxation, with Zenra Travels. Book accommodations and plan your getaway effortlessly.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://images.pexels.com/photos/6045035/pexels-photo-6045035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    title="Sigiriya"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Sigiriya
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Explore Sigiriya's ancient rock fortress and UNESCO World Heritage site, offering breathtaking views and rich historical significance in Sri Lanka.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    title="Yala"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Yala
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Explore Yala's wildlife, serene landscapes, and cultural richness with Zenra Travels' tailored itineraries and expert travel tips.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            {/* <Footer /> */}
        </ThemeProvider>
    );
};

export default Home;
