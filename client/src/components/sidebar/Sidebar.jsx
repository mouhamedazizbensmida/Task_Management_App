import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from '../../redux/authSlice';
import history from '../../history';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar() {
  const dispatch = useDispatch();
	const { auth } = useSelector((state) => ({ ...state }));
  const {currentUser} = auth
	const handleClick = (e) => {
		e.preventDefault();
		dispatch(logoutSuccess());
		localStorage.removeItem('auth');
		history.push('/');
		window.location.reload();
	};
  const menuItems = [
    { key: 'Dashboard', href: '/dashboard', text: 'Dashboard' },
    { key: 'backlog', href: '/backlog', text: 'Backlog' },
    { key: 'todo', href: '/todo', text: 'Todo' },
    { key: 'doing', href: '/doing', text: 'Doing' },
    { key: 'done', href: '/done', text: 'Done' },
    { key: 'Settings', href: '/setting', text: 'Settings' },
  ];
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
          Welcome {currentUser.username}
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
         
          <List  >
  {menuItems.map((item) => (
    <ListItem key={item.key} disablePadding>
      <ListItemButton href={item.href} style={{height:"1.5cm"}}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
      
          {item.text}
   
      </ListItemButton>
    </ListItem>
  ))}
</List>
      
          </List>
          <Divider />
               <List style={{display:"flex",justifyContent:"center"}}>
            
					 <Button color="inherit"  onClick={handleClick}> Sign out</Button>  
					
               </List>
        </Box>
      </Drawer>

    </Box>
  );
}