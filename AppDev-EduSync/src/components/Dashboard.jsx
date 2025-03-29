import React, { useState, useEffect } from 'react';
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
  AppBar,
  Toolbar,
  CssBaseline,
  useMediaQuery,
  TextField,
  Divider,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Fade,
  Chip,
  ListItemButton,
  Tooltip,
  LinearProgress,
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
  Dashboard as DashboardIcon,
  Add as AddIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon,
  Assignment as AssignmentIcon,
  AccessTime as AccessTimeIcon,
  GroupWork as GroupWorkIcon,
  AccountCircle as AccountCircleIcon,
  PlayArrow as PlayArrowIcon,
  Google as GoogleIcon,
  Snooze as SnoozeIcon,
} from '@mui/icons-material';

// Styled Components
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6],
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: theme.shadows[2],
}));

const MenuItemStyled = styled(ListItem)(({ theme, selected }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.5, 1),
  backgroundColor: selected ? theme.palette.primary.main : 'transparent',
  color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.dark : theme.palette.action.hover,
  },
  padding: theme.spacing(1.5, 2),
}));

const MainContent = styled(Box)(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: open ? 240 : 0,
  backgroundColor: theme.palette.grey[100],
  minHeight: '100vh',
  overflowY: 'auto',
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard', selected: true },
    { text: 'Calendar', icon: <EventIcon />, link: '/calendar' },
    { text: 'To-Do List', icon: <ListIcon />, link: '/todo' },
    { text: 'Progress Tracker', icon: <TimerIcon />, link: '/progress' },
    { text: 'Study Tools', icon: <SchoolIcon />, link: '/study' },
    { text: 'Collaboration', icon: <GroupIcon />, link: '/collaboration' },
  ];

  const secondaryMenuItems = [
    { text: 'Notifications', icon: <NotificationsIcon />, link: '/notifications' },
    { text: 'Settings', icon: <SettingsIcon />, link: '/settings' },
  ];

  const stats = [
    { title: 'Total Events', value: '12', icon: <TodayIcon fontSize="large" /> },
    { title: 'Tasks Due', value: '5', icon: <AssignmentIcon fontSize="large" /> },
    { title: 'Focus Hours', value: '3.5', icon: <AccessTimeIcon fontSize="large" /> },
    { title: 'Group Projects', value: '2', icon: <GroupWorkIcon fontSize="large" /> },
  ];

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Fade in={loading}>
            <Typography variant="h6" color="text.secondary">Loading Dashboard...</Typography>
          </Fade>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
          }}
        >
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Study Planner
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleMenuOpen} sx={{ ml: 1 }}>
              <AccountCircleIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} TransitionComponent={Fade}>
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Sidebar Drawer */}
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              bgcolor: 'background.paper',
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
          variant={isMobile ? 'temporary' : 'persistent'}
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
        >
          <DrawerHeader>
            <IconButton onClick={toggleDrawer}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Avatar sx={{ width: 56, height: 56, mb: 2, bgcolor: 'primary.main', mx: 'auto' }}>S</Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Study Planner</Typography>
            <Typography variant="caption" color="text.secondary">v1.0.0</Typography>
          </Box>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <MenuItemStyled
                key={item.text}
                component={Link}
                to={item.link}
                selected={item.selected}
                onClick={() => navigate(item.link)}
              >
                <ListItemIcon sx={{ minWidth: 40, color: item.selected ? 'primary.contrastText' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </MenuItemStyled>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          <List>
            {secondaryMenuItems.map((item) => (
              <MenuItemStyled key={item.text} component={Link} to={item.link} onClick={() => navigate(item.link)}>
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </MenuItemStyled>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <MainContent open={drawerOpen}>
          <Toolbar />
          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  Welcome back, User!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Your study overview for {new Date().toLocaleDateString()}.
                </Typography>
              </Box>

              {/* Stats */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {stats.map((stat) => (
                  <Grid item xs={6} sm={3} key={stat.title}>
                    <StatCard>
                      <Box>
                        <Typography variant="body2">{stat.title}</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>{stat.value}</Typography>
                      </Box>
                      {stat.icon}
                    </StatCard>
                  </Grid>
                ))}
              </Grid>

              {/* Event Calendar and To-Do List Row */}
              <Grid container spacing={3}>
                {/* Event Calendar */}
                <Grid item xs={12} md={6}>
                  <StyledCard sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>Event Calendar</Typography>
                        <Tooltip title="Sync with Google Calendar">
                          <Button variant="outlined" startIcon={<GoogleIcon />} size="small">
                            Sync
                          </Button>
                        </Tooltip>
                      </Box>
                      <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 1, mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Math Study Group</Typography>
                        <Typography variant="body2" color="text.secondary">Today, 3:00 PM - 4:30 PM</Typography>
                      </Box>
                      <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 1, mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Project Deadline</Typography>
                        <Typography variant="body2" color="text.secondary">Tomorrow, 11:59 PM</Typography>
                      </Box>
                      <Button variant="text" startIcon={<AddIcon />}>
                        Add Event
                      </Button>
                    </CardContent>
                  </StyledCard>
                </Grid>

                {/* To-Do List */}
                <Grid item xs={12} md={6}>
                  <StyledCard sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>To-Do List</Typography>
                        <IconButton color="primary">
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <List dense>
                        <ListItemButton>
                          <ListItemText primary="Finish Math Assignment" secondary="Due: Tomorrow" />
                          <Chip label="High" color="error" size="small" />
                        </ListItemButton>
                        <ListItemButton>
                          <ListItemText primary="Read Chapter 5" secondary="Due: Today" />
                          <Chip label="Medium" color="warning" size="small" />
                        </ListItemButton>
                        <ListItemButton>
                          <ListItemText primary="Prepare for Quiz" secondary="Due: In 2 days" />
                          <Chip label="Low" color="success" size="small" />
                        </ListItemButton>
                      </List>
                    </CardContent>
                  </StyledCard>
                </Grid>
              </Grid>

              {/* Progress Tracker */}
              <StyledCard sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Progress Tracker</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2">Math Assignment</Typography>
                    <LinearProgress variant="determinate" value={75} sx={{ height: 8, borderRadius: 4 }} />
                    <Typography variant="caption" color="text.secondary">75% Complete</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">CS101 Project</Typography>
                    <LinearProgress variant="determinate" value={40} sx={{ height: 8, borderRadius: 4 }} />
                    <Typography variant="caption" color="text.secondary">40% Complete</Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={4}>
              {/* Pomodoro Timer */}
              <StyledCard sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Pomodoro Timer</Typography>
                  <Typography variant="h4" sx={{ textAlign: 'center', mb: 2, fontWeight: 500 }}>25:00</Typography>
                  <Button variant="contained" startIcon={<PlayArrowIcon />} fullWidth>
                    Start Focus Session
                  </Button>
                </CardContent>
              </StyledCard>

              {/* Quick Add Task */}
              <StyledCard sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Quick Add Task</Typography>
                  <TextField
                    fullWidth
                    placeholder="Add a new task..."
                    variant="outlined"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <Button variant="contained" fullWidth startIcon={<AddIcon />}>
                    Add Task
                  </Button>
                </CardContent>
              </StyledCard>

              {/* Collaboration */}
              <StyledCard sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Collaboration</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Group Project: CS101" secondary="2 tasks pending" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Study Group: Math" secondary="Next meeting: Today" />
                    </ListItem>
                  </List>
                  <Button variant="text" startIcon={<GroupIcon />}>
                    Share Schedule
                  </Button>
                </CardContent>
              </StyledCard>

              {/* Notifications */}
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Notifications</Typography>
                  <List dense>
                    <ListItem secondaryAction={
                      <Tooltip title="Snooze for 1 hour">
                        <IconButton edge="end" size="small">
                          <SnoozeIcon />
                        </IconButton>
                      </Tooltip>
                    }>
                      <ListItemText primary="Math Assignment Due" secondary="Tomorrow, 11:59 PM" />
                    </ListItem>
                    <ListItem secondaryAction={
                      <Tooltip title="Snooze for 1 hour">
                        <IconButton edge="end" size="small">
                          <SnoozeIcon />
                        </IconButton>
                      </Tooltip>
                    }>
                      <ListItemText primary="Study Group Reminder" secondary="Today, 3:00 PM" />
                    </ListItem>
                  </List>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </MainContent>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
