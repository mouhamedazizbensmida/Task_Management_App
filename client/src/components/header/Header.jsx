import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './header.scss';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutSuccess } from '../../redux/authSlice';
import history from '../../history';
export default function Header() {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => ({ ...state }));

	const handleClick = (e) => {
		e.preventDefault();
		dispatch(logoutSuccess());
		localStorage.removeItem('auth');
		history.push('/signin');
		window.location.reload();
	};
  return (
    <Box sx={{ flexGrow: 1,zIndex:1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Management App
          </Typography>       
          {auth.currentUser && auth.currentUser.token ? (
					 <Button color="inherit" href="/signin" onClick={handleClick}> Sign out</Button>  
					) :(<>
               <Button color="inherit" href="/signin"> Sign In</Button>  
               <Button color="inherit" href="/signup">Sign up</Button>
               </>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}