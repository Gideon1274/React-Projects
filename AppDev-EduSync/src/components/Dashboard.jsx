import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { theme } from '../theme';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Badge,
  Chip,
  Divider,
  Tooltip,
} from '@mui/material';
import { ThemeProvider, styled } from '@mui/material/styles';
import {
  Event as EventIcon,
  ListAlt as ListIcon,
  Timer as TimerIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

// Styled components
const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: 80,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 80,
    boxSizing: 'border-box',
    background: '#1a1d29',
    borderRight: '1px solid #2a2f3d',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 16,
    transition: 'background 0.3s ease',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, #2a2f3d, #1f232f)',
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  border: '1px solid #3b82f6',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 30px rgba(0, 0, 0, 0.4)',
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, #2a2f3d, #1f232f)',
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  border: '1px solid #3b82f6',
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 30px rgba(0, 0, 0, 0.4)',
  },
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const [notifications] = useState(1);

  const handleLogout = () => {
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <EventIcon />, link: '/dashboard', tooltip: 'Dashboard' },
    { text: 'To-Do List', icon: <ListIcon />, link: '/todo', tooltip: 'To-Do List' },
    { text: 'Pomodoro', icon: <TimerIcon />, link: '/pomodoro', tooltip: 'Pomodoro Timer' },
    { text: 'Collaboration', icon: <GroupIcon />, link: '/collaboration', tooltip: 'Collaboration' },
    { text: 'Resources', icon: <SchoolIcon />, link: '/resources', tooltip: 'Academic Resources' },
    { text: 'Notifications', icon: <NotificationsIcon />, link: '/notifications', tooltip: 'Notifications' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        display: 'flex', 
        minHeight: '100vh', 
        width: '100vw', 
        bgcolor: '#1a1d29', // Ensure background fills entire viewport
        overflow: 'hidden', // Prevent any scrolling
      }}>
        {/* Sidebar Drawer */}
        <DrawerStyled variant="permanent">
          <Avatar sx={{ bgcolor: '#3b82f6', mb: 4, width: 48, height: 48, fontSize: '1.5rem' }}>K</Avatar>
          {menuItems.map((item) => (
            <Tooltip title={item.tooltip} placement="right" key={item.text}>
              <ListItem 
                button 
                component={Link} 
                to={item.link} 
                sx={{ 
                  justifyContent: 'center', 
                  mb: 3,
                  borderRadius: '8px',
                  width: '48px',
                  height: '48px',
                  transition: 'background 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#2a2f3d',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#9ca3af', minWidth: 'auto' }}>{item.icon}</ListItemIcon>
              </ListItem>
            </Tooltip>
          ))}
          <Divider sx={{ bgcolor: '#2a2f3d', width: '50%', my: 3 }} />
          <Tooltip title="Settings" placement="right">
            <ListItem 
              button 
              sx={{ 
                justifyContent: 'center', 
                mb: 3,
                borderRadius: '8px',
                width: '48px',
                height: '48px',
                '&:hover': {
                  backgroundColor: '#2a2f3d',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#9ca3af', minWidth: 'auto' }}>
                <SettingsIcon />
              </ListItemIcon>
            </ListItem>
          </Tooltip>
          <Tooltip title="Logout" placement="right">
            <ListItem 
              button 
              onClick={handleLogout}
              sx={{ 
                justifyContent: 'center',
                borderRadius: '8px',
                width: '48px',
                height: '48px',
                '&:hover': {
                  backgroundColor: '#2a2f3d',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#9ca3af', minWidth: 'auto' }}>
                <PersonIcon />
              </ListItemIcon>
            </ListItem>
          </Tooltip>
        </DrawerStyled>

        {/* Main Content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3, md: 4 }, 
            bgcolor: '#1a1d29', // Match background to fill gaps
            width: 'calc(100vw - 80px)', // Adjust for sidebar width
            minHeight: '100vh', // Ensure it fills the height
            overflowY: 'auto', // Allow vertical scrolling if needed
            overflowX: 'hidden', // Prevent horizontal scrolling
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4,
            maxWidth: '100%',
          }}>
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              Welcome, User!
            </Typography>
          </Box>

          {/* Stats Section */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <EventIcon sx={{ color: '#3b82f6', mr: 2, fontSize: '2rem' }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#ffffff', fontSize: '1.1rem' }}>
                    Total Events
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#9ca3af', fontSize: '1rem' }}>
                    8,739.76
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <ListIcon sx={{ color: '#3b82f6', mr: 2, fontSize: '2rem' }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#ffffff', fontSize: '1.1rem' }}>
                    Tasks Today
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#9ca3af', fontSize: '1rem' }}>
                    146.76
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <TimerIcon sx={{ color: '#3b82f6', mr: 2, fontSize: '2rem' }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#ffffff', fontSize: '1.1rem' }}>
                    Focus Hours
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#9ca3af', fontSize: '1rem' }}>
                    12.5
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <GroupIcon sx={{ color: '#3b82f6', mr: 2, fontSize: '2rem' }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#ffffff', fontSize: '1.1rem' }}>
                    Group Projects
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#9ca3af', fontSize: '1rem' }}>
                    3 Active
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
          </Grid>

          {/* Feature Cards */}
          <Grid container spacing={2}>
            {/* Event Calendar */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <StyledCard>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EventIcon sx={{ color: '#3b82f6', mr: 1, fontSize: '1.5rem' }} />
                    <Typography variant="h6" sx={{ color: '#ffffff', fontSize: '1.25rem' }}>
                      Event Calendar
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#9ca3af', mb: 3, fontSize: '0.9rem' }}>
                    Sync with Google, Apple, or Outlook.
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="contained"
                      sx={{ 
                        bgcolor: '#3b82f6', 
                        color: '#ffffff', 
                        borderRadius: 20, 
                        '&:hover': { bgcolor: '#2563eb' },
                        width: '100%',
                        fontSize: '0.9rem',
                        padding: '8px 16px',
                      }}
                    >
                      View Calendar
                    </Button>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* To-Do List */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <StyledCard>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ListIcon sx={{ color: '#3b82f6', mr: 1, fontSize: '1.5rem' }} />
                    <Typography variant="h6" sx={{ color: '#ffffff', fontSize: '1.25rem' }}>
                      To-Do List
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#9ca3af', mb: 3, fontSize: '0.9rem' }}>
                    Manage tasks with priority and due dates.
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="contained"
                      sx={{ 
                        bgcolor: '#3b82f6', 
                        color: '#ffffff', 
                        borderRadius: 20, 
                        '&:hover': { bgcolor: '#2563eb' },
                        width: '100%',
                        fontSize: '0.9rem',
                        padding: '8px 16px',
                      }}
                    >
                      View Tasks
                    </Button>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Pomodoro Timer */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <StyledCard>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TimerIcon sx={{ color: '#3b82f6', mr: 1, fontSize: '1.5rem' }} />
                    <Typography variant="h6" sx={{ color: '#ffffff', fontSize: '1.25rem' }}>
                      Pomodoro Timer
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#9ca3af', mb: 3, fontSize: '0.9rem' }}>
                    Focus with timed study sessions.
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="contained"
                      sx={{ 
                        bgcolor: '#3b82f6', 
                        color: '#ffffff', 
                        borderRadius: 20, 
                        '&:hover': { bgcolor: '#2563eb' },
                        width: '100%',
                        fontSize: '0.9rem',
                        padding: '8px 16px',
                      }}
                    >
                      Start Timer
                    </Button>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Collaboration */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <StyledCard>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <GroupIcon sx={{ color: '#3b82f6', mr: 1, fontSize: '1.5rem' }} />
                    <Typography variant="h6" sx={{ color: '#ffffff', fontSize: '1.25rem' }}>
                      Collaboration
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#9ca3af', mb: 3, fontSize: '0.9rem' }}>
                    Share schedules and manage projects.
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="contained"
                      sx={{ 
                        bgcolor: '#3b82f6', 
                        color: '#ffffff', 
                        borderRadius: 20, 
                        '&:hover': { bgcolor: '#2563eb' },
                        width: '100%',
                        fontSize: '0.9rem',
                        padding: '8px 16px',
                      }}
                    >
                      Collaborate
                    </Button>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Academic Assistance */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <StyledCard>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SchoolIcon sx={{ color: '#3b82f6', mr: 1, fontSize: '1.5rem' }} />
                    <Typography variant="h6" sx={{ color: '#ffffff', fontSize: '1.25rem' }}>
                      Academic Assistance
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#9ca3af', mb: 3, fontSize: '0.9rem' }}>
                    Access resources and GPA calculator.
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="contained"
                      sx={{ 
                        bgcolor: '#3b82f6', 
                        color: '#ffffff', 
                        borderRadius: 20, 
                        '&:hover': { bgcolor: '#2563eb' },
                        width: '100%',
                        fontSize: '0.9rem',
                        padding: '8px 16px',
                      }}
                    >
                      Explore
                    </Button>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Notifications */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <StyledCard>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <NotificationsIcon sx={{ color: '#3b82f6', mr: 1, fontSize: '1.5rem' }} />
                    <Typography variant="h6" sx={{ color: '#ffffff', fontSize: '1.25rem' }}>
                      Notifications
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#9ca3af', mb: 3, fontSize: '0.9rem' }}>
                    Stay updated with reminders.
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="contained"
                      sx={{ 
                        bgcolor: '#3b82f6', 
                        color: '#ffffff', 
                        borderRadius: 20, 
                        '&:hover': { bgcolor: '#2563eb' },
                        width: '100%',
                        fontSize: '0.9rem',
                        padding: '8px 16px',
                      }}
                    >
                      View Alerts
                    </Button>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
