import * as React from 'react';

import { 
    styled, 
    useTheme 
} from '@mui/material/styles';

import { 
    Grid,
    Container 
} from "@material-ui/core";

import {
    Box,
    List,
    Drawer,
    Divider,
    Toolbar,
    ListItem,
    Typography,
    IconButton,
    ListItemIcon,
    ListItemText,  
} from '@mui/material';

import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EqualizerIcon from '@mui/icons-material/Equalizer';

import AnketaCard from '../anketa/AnketaCard'
import AddAncketa from '../anketa/AddAnketa'

import { useHistory } from "react-router-dom"

import { ConfirmProvider } from 'material-ui-confirm';
import { v4 } from 'uuid'


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
  }));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
    }),
}),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

const RightMenu = ({
  open, 
  handleDrawerOpen, 
  handleDrawerClose, 
  anketa, 
  parents, 
  handleDelete, 
  handleOpenChildren,
  check,
  children
}) => {
  const history = useHistory(); 
  const theme = useTheme();
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open}>
            <Toolbar>
              <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
              </Typography>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Main open={open}>
            <DrawerHeader />
            {/* Card anketa */}
            <Container>
                <Grid container spacing={3}>
                    {/* Change in the future to check if user admin then show AddAncketa */}
                    { parents.role === 'admin' ? <Grid item key={anketa.anketa_id} xs={12} md={6} lg={4}>
                        <AddAncketa parents={parents}/>
                    </Grid> : <Grid/>}
                    {anketa.map(anketa => (
                      <ConfirmProvider> 
                        <Grid item key={anketa.anketa_id} xs={12} md={6} lg={4}>
                            <AnketaCard 
                              anketa={anketa} 
                              parents={parents} 
                              handleDelete={handleDelete} 
                              handleOpenChildren={handleOpenChildren}
                              check={check}
                            />
                        </Grid>
                      </ConfirmProvider>
                    ))}
                </Grid>
            </Container>    
          </Main>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
              },
            }}
            variant="persistent"
            anchor="right"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
                <List>
                  <ListItem button key={v4()} onClick={() => { 
                        history.push({ 
                          pathname: '/profile',
                          state: parents
                        })}}>
                    <ListItemIcon> 
                      <AccountCircleIcon/>
                    </ListItemIcon> 
                    <ListItemText primary={'Профіль'} />
                  </ListItem>
                  <ListItem button key={v4()} onClick={() => { 
                        history.push({ 
                          pathname: '/children',
                          state: parents
                        })}}>
                    <ListItemIcon> 
                      <ChildCareIcon/>
                    </ListItemIcon> 
                    <ListItemText primary={'Діти'} />
                  </ListItem>
                </List>
                { parents.role === 'admin' ? 
                  <div>
                      <ListItem button key={'Статистика'} onClick={() => { 
                        history.push({ 
                          pathname: '/statistics',
                          state: parents
                        })}}> 
                        <ListItemIcon> 
                          <EqualizerIcon/>
                        </ListItemIcon> 
                        <ListItemText primary={'Статистика'} />
                      </ListItem>
                      <ListItem button key={v4()} onClick={() => { 
                        history.push({ 
                          pathname: '/dashboard/admin',
                          state: parents
                        })}}> 
                        <ListItemIcon> 
                          <AdminPanelSettingsIcon/>
                        </ListItemIcon> 
                        <ListItemText primary={'Адмін'} />
                      </ListItem>
                  </div> : "" }
            <Divider />
            <List>
              {['Вийти'].map((text, index) => (
                <ListItem button key={text} onClick={() => { 
                  history.push({ 
                    pathname: '/'
                  })}}> 
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
    )
}

export default RightMenu