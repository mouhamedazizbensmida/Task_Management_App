import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfile } from '../../redux/authSlice';
import  { useState } from 'react';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function EditProfile() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { currentUser } = auth;
  const [formData, setFormData] = React.useState({
    _id:currentUser.id,
    username: currentUser.username,
    email: currentUser.email,
    old_password: '',
    new_password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [error, setError] = useState(null); 
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    try {
      const response = await  dispatch(UpdateProfile(formData));
      if (response) {
        // Handle API error (e.g., validation error from the backend)
        setError(response);
      } else {
        setState({
          task: '',
        });
      }
    } catch (error) {
      // Handle network or other errors
      setError('An error occurred while adding the task.');
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" style={{ marginLeft: "40%", marginTop: "94px" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Profile
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {error && <div style={{ color: 'red' }}>{error.username}</div>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {error && <div style={{ color: 'red' }}>{error.email}</div>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  name="old_password"
                  label="Password"
                  id="old_password"
                  onChange={handleChange}
                />
                {error && <div style={{ color: 'red' }}>{error.old_password}</div>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  name="new_password"
                  label="New Password"
                  id="new_password"
                  onChange={handleChange}
                />
                {error && <div style={{ color: 'red' }}>{error.new_password}</div>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
