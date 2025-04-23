import React, { useState, useEffect } from 'react';
import AddEventDialog from './AddEventDialog';
import { Link, useNavigate } from 'react-router-dom';
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
  CircularProgress,
} from '@mui/material';
import { ThemeProvider, styled, createTheme } from '@mui/material/styles';
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
  Pause as PauseIcon,
  Google as GoogleIcon,
  Snooze as SnoozeIcon,
  FormatQuote as QuoteIcon,
  Link as LinkIcon,
  History as HistoryIcon,
  BarChart as ProgressIcon,
} from '@mui/icons-material';

// Define an enhanced theme with a vibrant palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: '#f1f5f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    divider: '#e2e8f0',
    action: {
      hover: 'rgba(0, 0, 0, 0.04)',
    },
    grey: {
      100: '#f1f5f9',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 1px 3px 0px rgba(0,0,0,0.06)',
    '0px 3px 1px -2px rgba(0,0,0,0.1),0px 2px 2px 0px rgba(0,0,0,0.07),0px 1px 5px 0px rgba(0,0,0,0.06)',
    '0px 3px 3px -2px rgba(0,0,0,0.1),0px 3px 4px 0px rgba(0,0,0,0.07),0px 1px 8px 0px rgba(0,0,0,0.06)',
    '0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.06)',
    '0px 3px 5px -1px rgba(0,0,0,0.1),0px 5px 8px 0px rgba(0,0,0,0.07),0px 1px 14px 0px rgba(0,0,0,0.06)',
    '0px 3px 5px -1px rgba(0,0,0,0.1),0px 6px 10px 0px rgba(0,0,0,0.07),0px 1px 18px 0px rgba(0,0,0,0.06)',
  ],
  transitions: {
    easing: {
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    },
    duration: {
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  zIndex: {
    drawer: 1200,
  },
  direction: 'ltr',
});

// Styled Components
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6],
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
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

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  overflowY: 'auto',
  width: '100%',
}));

const Dashboard = () => {

  //4/23/2025
  const [addEventDialogOpen, setAddEventDialogOpen] = useState(false);
  const [events, setEvents] = useState([
    { id: 1, name: 'Math Study Group', dateTime: new Date('2025-04-23T15:00:00'), deadline: new Date('2025-04-24T23:59:00') },
    { id: 2, name: 'Project Deadline', dateTime: new Date('2025-04-24T11:59:00'), deadline: new Date('2025-04-24T23:59:00') },
  ]);
  const handleAddEventDialogOpen = () => {
    setAddEventDialogOpen(true);
  };

  const handleAddEventDialogClose = () => {
    setAddEventDialogOpen(false);
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { id: Date.now(), ...newEvent }]);
    setRecentActivities([{ id: Date.now(), action: `Added event: ${newEvent.name}`, timestamp: 'Just now' }, ...recentActivities]);
    // You might want to update your 'stats' or other relevant state here
  };
///////////////////////////////////////////////////////////////


  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Finish Math Assignment', priority: 'High', due: 'Tomorrow' },
    { id: 2, text: 'Read Chapter 5', priority: 'Medium', due: 'Today' },
    { id: 3, text: 'Prepare for Quiz', priority: 'Low', due: 'In 2 days' },
  ]);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);

  // Recent Activity State
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'Completed task: Read Chapter 4', timestamp: '10 mins ago' },
    { id: 2, action: 'Added event: Physics Study Group', timestamp: '1 hour ago' },
    { id: 3, action: 'Started Pomodoro session', timestamp: '2 hours ago' },
  ]);

  // Quick Links State
  const quickLinks = [
    { text: 'Google Drive', url: 'https://drive.google.com', icon: <GoogleIcon /> },
    { text: 'Notion', url: 'https://notion.so', icon: <LinkIcon /> },
    { text: 'Khan Academy', url: 'https://khanacademy.org', icon: <SchoolIcon /> },
  ];

  // Motivational Quotes (static array for now)
  const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  ];
  const [currentQuote, setCurrentQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  // Progress Overview State
  const [progressOverview, setProgressOverview] = useState({ totalTasks: 10, completedTasks: 6, completionRate: 60 });

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (isPomodoroRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsPomodoroRunning(false);
      setRecentActivities([{ id: Date.now(), action: 'Completed Pomodoro session', timestamp: 'Just now' }, ...recentActivities]);
    }
    return () => clearInterval(interval);
  }, [isPomodoroRunning, pomodoroTime, recentActivities]);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj = { id: Date.now(), text: newTask, priority: 'Medium', due: 'Today' };
      setTasks([...tasks, newTaskObj]);
      setRecentActivities([{ id: Date.now(), action: `Added task: ${newTask}`, timestamp: 'Just now' }, ...recentActivities]);
      setNewTask('');
      setProgressOverview((prev) => ({
        ...prev,
        totalTasks: prev.totalTasks + 1,
        completionRate: Math.round((prev.completedTasks / (prev.totalTasks + 1)) * 100),
      }));
    }
  };
  const togglePomodoro = () => {
    if (isPomodoroRunning) {
      setIsPomodoroRunning(false);
    } else {
      if (pomodoroTime === 0) setPomodoroTime(25 * 60);
      setIsPomodoroRunning(true);
      setRecentActivities([{ id: Date.now(), action: 'Started Pomodoro session', timestamp: 'Just now' }, ...recentActivities]);
    }
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

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
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress color="primary" size={60} sx={{ mb: 2 }} />
              <Typography variant="h6" color="text.secondary">Loading Dashboard...</Typography>
            </Box>
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
            boxShadow: theme.shadows[1],
          }}
        >
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
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
              <MenuItem onClick={() => { handleMenuClose(); navigate('/login'); }}>Logout</MenuItem>
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
        <MainContent>
          <Toolbar />
          <Grid container spacing={4}>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              <Fade in={true} timeout={500}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                    Welcome back, User!
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Your study overview for {new Date().toLocaleDateString()}.
                  </Typography>
                </Box>
              </Fade>

              {/* Stats */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat) => (
                  <Grid item xs={6} sm={3} key={stat.title}>
                    <Fade in={true} timeout={700}>
                      <StatCard>
                        <Box>
                          <Typography variant="body2">{stat.title}</Typography>
                          <Typography variant="h5" sx={{ fontWeight: 600 }}>{stat.value}</Typography>
                        </Box>
                        {stat.icon}
                      </StatCard>
                    </Fade>
                  </Grid>
                ))}
              </Grid>

              {/* Event Calendar and To-Do List Row */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Event Calendar */}
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={900}>
                <StyledCard sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        Event Calendar
                      </Typography>
                      <Tooltip title="Sync with Google Calendar">
                        <Button variant="outlined" startIcon={<GoogleIcon />} size="small" color="primary">
                          Sync
                        </Button>
                      </Tooltip>
                    </Box>
                    {events.map((event) => ( // <--- Mapping through the 'events' state
                      <Box key={event.id} sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 1, mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {event.name} {/* Display event name */}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {event.dateTime ? event.dateTime.toLocaleString() : 'No Date/Time'} {/* Display date and time */}
                          {event.deadline && (
                            <Typography variant="caption" color="text.secondary">
                              Deadline: {event.deadline.toLocaleString()}
                            </Typography>
                          )}
                        </Typography>
                      </Box>
                    ))}
                    <Button variant="text" startIcon={<AddIcon />} color="primary" onClick={handleAddEventDialogOpen}>
                      Add Event
                    </Button>
                  </CardContent>
                </StyledCard>
              </Fade>
            </Grid>

                {/* To-Do List */}
                <Grid item xs={12} md={6}>
                  <Fade in={true} timeout={900}>
                    <StyledCard sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            To-Do List
                          </Typography>
                          <IconButton color="primary">
                            <AddIcon />
                          </IconButton>
                        </Box>
                        <List dense>
                          {tasks.map((task) => (
                            <ListItemButton key={task.id}>
                              <ListItemText
                                primary={task.text}
                                secondary={`Due: ${task.due}`}
                                primaryTypographyProps={{ color: 'text.primary' }}
                                secondaryTypographyProps={{ color: 'text.secondary' }}
                              />
                              <Chip
                                label={task.priority}
                                color={
                                  task.priority === 'High' ? 'error' :
                                  task.priority === 'Medium' ? 'warning' :
                                  'success'
                                }
                                size="small"
                              />
                            </ListItemButton>
                          ))}
                        </List>
                      </CardContent>
                    </StyledCard>
                  </Fade>
                </Grid>
              </Grid>

              {/* Progress Tracker and Recent Activity Row */}
              <Grid container spacing={3}>
                {/* Progress Tracker */}
                <Grid item xs={12} md={6}>
                  <Fade in={true} timeout={1100}>
                    <StyledCard>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                          Progress Tracker
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="text.primary">Math Assignment</Typography>
                          <LinearProgress
                            variant="determinate"
                            value={75}
                            sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.200', '& .MuiLinearProgress-bar': { bgcolor: 'secondary.main' } }}
                          />
                          <Typography variant="caption" color="text.secondary">75% Complete</Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" color="text.primary">CS101 Project</Typography>
                          <LinearProgress
                            variant="determinate"
                            value={40}
                            sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.200', '& .MuiLinearProgress-bar': { bgcolor: 'secondary.main' } }}
                          />
                          <Typography variant="caption" color="text.secondary">40% Complete</Typography>
                        </Box>
                      </CardContent>
                    </StyledCard>
                  </Fade>
                </Grid>

                {/* Recent Activity */}
                <Grid item xs={12} md={6}>
                  <Fade in={true} timeout={1100}>
                    <StyledCard>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                          Recent Activity
                        </Typography>
                        <List dense>
                          {recentActivities.slice(0, 4).map((activity) => (
                            <ListItem key={activity.id}>
                              <ListItemIcon>
                                <HistoryIcon color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary={activity.action}
                                secondary={activity.timestamp}
                                primaryTypographyProps={{ color: 'text.primary' }}
                                secondaryTypographyProps={{ color: 'text.secondary' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                        <Button variant="text" color="primary">View All</Button>
                      </CardContent>
                    </StyledCard>
                  </Fade>
                </Grid>
              </Grid>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={4}>
              {/* Pomodoro Timer */}
              <Fade in={true} timeout={1300}>
                <StyledCard sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                      Pomodoro Timer
                    </Typography>
                    <Typography variant="h4" sx={{ textAlign: 'center', mb: 2, fontWeight: 500, color: 'primary.main' }}>
                      {formatTime(pomodoroTime)}
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={isPomodoroRunning ? <PauseIcon /> : <PlayArrowIcon />}
                      fullWidth
                      onClick={togglePomodoro}
                      sx={{ bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
                    >
                      {isPomodoroRunning ? 'Pause' : pomodoroTime === 0 ? 'Restart' : 'Start'} Focus Session
                    </Button>
                  </CardContent>
                </StyledCard>
              </Fade>

              {/* Quick Add Task */}
              <Fade in={true} timeout={1300}>
                <StyledCard sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                      Quick Add Task
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Add a new task..."
                      variant="outlined"
                      size="small"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<AddIcon />}
                      onClick={handleAddTask}
                      color="primary"
                    >
                      Add Task
                    </Button>
                  </CardContent>
                </StyledCard>
              </Fade>

              {/* Progress Overview */}
              <Fade in={true} timeout={1500}>
                <StyledCard sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                      Progress Overview
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CircularProgress
                        variant="determinate"
                        value={progressOverview.completionRate}
                        size={60}
                        thickness={5}
                        sx={{ color: 'secondary.main', mr: 2 }}
                      />
                      <Box>
                        <Typography variant="body1" color="text.primary">
                          {progressOverview.completedTasks}/{progressOverview.totalTasks} Tasks Completed
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {progressOverview.completionRate}% Complete
                        </Typography>
                      </Box>
                    </Box>
                    <Button variant="outlined" fullWidth startIcon={<ProgressIcon />}>
                      View Details
                    </Button>
                  </CardContent>
                </StyledCard>
              </Fade>

              {/* Quick Links */}
              <Fade in={true} timeout={1500}>
                <StyledCard sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                      Quick Links
                    </Typography>
                    <List dense>
                      {quickLinks.map((link) => (
                        <ListItemButton
                          key={link.text}
                          component="a"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ListItemIcon>{link.icon}</ListItemIcon>
                          <ListItemText primary={link.text} primaryTypographyProps={{ color: 'text.primary' }} />
                        </ListItemButton>
                      ))}
                    </List>
                  </CardContent>
                </StyledCard>
              </Fade>

              {/* Motivational Quote */}
              <Fade in={true} timeout={1500}>
                <StyledCard sx={{ mb: 4 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <QuoteIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 1, color: 'text.primary' }}>
                      "{currentQuote.text}"
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      — {currentQuote.author}
                    </Typography>
                    <Button
                      variant="text"
                      sx={{ mt: 2 }}
                      onClick={() => setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)])}
                    >
                      New Quote
                    </Button>
                  </CardContent>
                </StyledCard>
              </Fade>

              {/* Collaboration */}
              <Fade in={true} timeout={1500}>
                <StyledCard sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                      Collaboration
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary="Group Project: CS101"
                          secondary="2 tasks pending"
                          primaryTypographyProps={{ color: 'text.primary' }}
                          secondaryTypographyProps={{ color: 'text.secondary' }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Study Group: Math"
                          secondary="Next meeting: Today"
                          primaryTypographyProps={{ color: 'text.primary' }}
                          secondaryTypographyProps={{ color: 'text.secondary' }}
                        />
                      </ListItem>
                    </List>
                    <Button variant="text" startIcon={<GroupIcon />} color="primary">
                      Share Schedule
                    </Button>
                  </CardContent>
                </StyledCard>
              </Fade>

              {/* Notifications */}
              <Fade in={true} timeout={1500}>
                <StyledCard>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                      Notifications
                    </Typography>
                    <List dense>
                      <ListItem
                        secondaryAction={
                          <Tooltip title="Snooze for 1 hour">
                            <IconButton edge="end" size="small">
                              <SnoozeIcon />
                            </IconButton>
                          </Tooltip>
                        }
                      >
                        <ListItemText
                          primary="Math Assignment Due"
                          secondary="Tomorrow, 11:59 PM"
                          primaryTypographyProps={{ color: 'text.primary' }}
                          secondaryTypographyProps={{ color: 'text.secondary' }}
                        />
                      </ListItem>
                      <ListItem
                        secondaryAction={
                          <Tooltip title="Snooze for 1 hour">
                            <IconButton edge="end" size="small">
                              <SnoozeIcon />
                            </IconButton>
                          </Tooltip>
                        }
                      >
                        <ListItemText
                          primary="Study Group Reminder"
                          secondary="Today, 3:00 PM"
                          primaryTypographyProps={{ color: 'text.primary' }}
                          secondaryTypographyProps={{ color: 'text.secondary' }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </StyledCard>
              </Fade>
            </Grid>
          </Grid>
        </MainContent>
        <AddEventDialog
        open={addEventDialogOpen}
        onClose={handleAddEventDialogClose}
        onAddEvent={handleAddEvent}
      />
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
