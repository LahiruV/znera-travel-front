import React, { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Paper,
    Button,
    Avatar,
    Modal,
    TextField,
    styled,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();
const PaperStyled = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    margin: 'auto',
    width: '100%',
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    marginLeft: '150px',
    width: theme.spacing(10),
    height: theme.spacing(10),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ModalPaperStyled = styled('div')(({ theme }) => ({
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}));

function Profile() {
    const [profile, setProfile] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const profileDetails = profile[0] || {};
    const [edtname, setEdtname] = useState(profileDetails.name);
    const [edtphone, setEdtphone] = useState(profileDetails.phone);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const email = sessionStorage.getItem("cusmail");
            const res = await axios.get(global.APIUrl + `/user/profile/${email}`);
            setProfile(res.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleDeleteProfile = async () => {
        try {
            const email = sessionStorage.getItem("cusmail");
            const res = await axios.delete(global.APIUrl + `/user/delete/${email}`);
            sessionStorage.setItem('cusmail', 'empty');
            window.location.href = "/";
        } catch (error) {
            console.error('Error deleting profile:', error);
        }
    }

    const handleLoyalProfile = async () => {
        try {
            profileDetails.isLoyal = true;
            const editData = {
                ...profileDetails,
                isLoyal: true,
            };

            const res = await axios.put(global.APIUrl + `/user/update`, editData);

            Swal.fire({
                title: "Success!",
                text: "Loyalty Activated",
                icon: 'success',
                confirmButtonText: "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/Profile";
                }
            });
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleEditProfile = () => {
        setEditModalOpen(true);
    };

    const handleModalClose = () => {
        setEditModalOpen(false);
    };

    const handleSaveChanges = async () => {
        try {
            const data = {
                name: edtname,
                phone: edtphone,
                email: profileDetails.email,
                password: profileDetails.password,
                isLoyal: profileDetails.isLoyal,
                points: profileDetails.points,
                userType: profileDetails.userType
            };

            const res = await axios.put(global.APIUrl + `/user/update`, data);

            Swal.fire({
                title: "Success!",
                text: "Profile Updated Successfully",
                icon: 'success',
                confirmButtonText: "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <div>
                <Navbar />
                <div style={{marginLeft:'620px'}}>
                    <div style={{ textAlign: 'center', margin: '2rem 0', paddingTop: '130px', paddingLeft:'100px'}}>
                        <Typography variant="h3" component="h1">Profile</Typography>
                    <hr style={{ width: 100 }} />
                    </div>
                    <br />
                    <br />
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={8}>
                            <PaperStyled>
                                <div style={{ marginBottom: '2rem' }}>
                                    <AvatarStyled>
                                        <AccountCircleIcon />
                                    </AvatarStyled>
                                    <br />
                                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                        Name:
                                    </Typography>
                                    <Typography variant="body1">
                                        {profileDetails.name}
                                    </Typography>
                                </div>
                                <div style={{ marginBottom: '2rem' }}>
                                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                        Email:
                                    </Typography>
                                    <Typography variant="body1">
                                        {profileDetails.email}
                                    </Typography>
                                </div>
                                <div style={{ marginBottom: '2rem' }}>
                                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                        Phone:
                                    </Typography>
                                    <Typography variant="body1">
                                        {profileDetails.phone}
                                    </Typography>
                                </div>
                                <div style={{ marginBottom: '2rem' }}>
                                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                        Loyalty Status:
                                    </Typography>
                                    <Typography variant="body1">
                                        {profileDetails.isLoyal === 'true' ? 'Loyal Customer' : 'Not Loyal Customer'}
                                    </Typography>
                                </div>
                                {profileDetails.isLoyal === 'true' && (
                                    <div style={{ marginBottom: '2rem' }}>
                                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                            Points:
                                        </Typography>
                                        <Typography variant="body1">
                                            {profileDetails.points}
                                        </Typography>
                                    </div>
                                )}
                                {profileDetails.isLoyal !== 'true' && (
                                    <>
                                        <Button
                                            variant="contained"
                                            style={{ marginTop: '2rem', backgroundColor: '#009688', color: '#fff' }}
                                            onClick={handleLoyalProfile}
                                        >
                                            Activate Loyalty
                                        </Button>
                                        &nbsp;
                                        &nbsp;
                                    </>
                                )}
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginTop: '2rem' }}
                                    onClick={handleDeleteProfile}
                                >
                                    Delete Profile
                                </Button>
                                &nbsp;
                                &nbsp;
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '2rem' }}
                                    onClick={handleEditProfile}
                                >
                                    Edit Profile
                                </Button>
                            </PaperStyled>
                        </Grid>
                    </Grid>
                    <Modal
                        open={editModalOpen}
                        onClose={handleModalClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <ModalPaperStyled>
                            <Typography variant="h6" id="modal-title">
                                Edit Profile
                            </Typography>
                            <form>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Name"
                                    value={edtname}
                                    onChange={(e) => setEdtname(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    id="phone"
                                    name="phone"
                                    label="Phone"
                                    value={edtphone}
                                    onChange={(e) => setEdtphone(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    type='number'
                                    required
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSaveChanges}
                                    style={{ marginTop: '1rem' }}
                                >
                                    Save Changes
                                </Button>
                            </form>
                        </ModalPaperStyled>
                    </Modal>
                    <br />
                    <br />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Profile;