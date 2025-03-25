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
  AppBar,
  Toolbar,
  CssBaseline,
  useMediaQuery,
  Collapse,
  TextField,
  ListItemButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  Person as PersonIcon,
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Add as AddIcon,
  Done as DoneIcon,
  AccessTime as AccessTimeIcon,
  FormatQuote as QuoteIcon,
} from '@mui/icons-material';

// Styled components
const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: 80,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 80,
    background: '#1a1d29',
    borderRight: '1px solid #2a2f3d',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    transition: 'width 0.3s ease',
    [theme.breakpoints.down('sm')]: {
      width: 0,
      '&.open': { width: 80 },
    },
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
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 30px rgba(0, 0, 0, 0.4)',
    borderColor: '#60a5fa',
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
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 30px rgba(0, 0, 0, 0.4)',
    borderColor: '#60a5fa',
  },
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const [notifications] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState({ 'Core Features': true, 'Collaboration & Resources': true });
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Finish report', completed: false },
    { id: 2, text: 'Prepare presentation', completed: true },
    { id: 3, text: 'Schedule meeting', completed: false },
  ]);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleExpand = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const menuItems = [
    { text: 'Dashboard', icon: <EventIcon />, link: '/dashboard', tooltip: 'Dashboard' },
    { text: 'To-Do List', icon: <ListIcon />, link: '/todo', tooltip: 'To-Do List' },
    { text: 'Pomodoro', icon: <TimerIcon />, link: '/pomodoro', tooltip: 'Pomodoro Timer' },
    { text: 'Collaboration', icon: <GroupIcon />, link: '/collaboration', tooltip: 'Collaboration' },
    { text: 'Resources', icon: <SchoolIcon />, link: '/resources', tooltip: 'Academic Resources' },
    { text: 'Notifications', icon: <NotificationsIcon />, link: '/notifications', tooltip: 'Notifications' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Team Meeting', date: 'Tomorrow, 10:00 AM' },
    { id: 2, title: 'Project Deadline', date: 'Mar 28, 5:00 PM' },
    { id: 3, title: 'Study Group', date: 'Mar 30, 2:00 PM' },
    { id: 4, title: 'Client Review', date: 'Apr 1, 3:00 PM' },
    { id: 5, title: 'Workshop', date: 'Apr 3, 11:00 AM' },
  ];

  const recentActivity = [
    { id: 1, action: 'Completed Task: Finish Report', time: '2 hours ago' },
    { id: 2, action: 'Started Pomodoro Session', time: '4 hours ago' },
    { id: 3, action: 'Added Event: Team Sync', time: 'Yesterday' },
    { id: 4, action: 'Joined Study Group', time: '2 days ago' },
    { id: 5, action: 'Updated Profile', time: '3 days ago' },
  ];

  const progressData = [
    { label: 'Project A', value: 75 },
    { label: 'Project B', value: 40 },
    { label: 'Study Goals', value: 90 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#1a1d29' }}>
        {/* AppBar for Mobile */}
        {isMobile && (
          <AppBar position="fixed" sx={{ bgcolor: '#1a1d29', boxShadow: 'none', borderBottom: '1px solid #2a2f3d' }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                <MenuIcon sx={{ color: '#ffffff' }} />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff' }}>
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        {/* Sidebar Drawer */}
        <DrawerStyled variant={isMobile ? 'temporary' : 'permanent'} open={drawerOpen} onClose={toggleDrawer} className={drawerOpen ? 'open' : ''}>
          <Avatar sx={{ bgcolor: '#3b82f6', mb: 4, width: 48, height: 48 }}>K</Avatar>
          {menuItems.map((item) => (
            <Tooltip title={item.tooltip} placement="right" key={item.text}>
              <ListItem
                button
                component={Link}
                to={item.link}
                sx={{
                  justifyContent: 'center',
                  mb: 2,
                  borderRadius: '8px',
                  width: '48px',
                  height: '48px',
                  '&:hover': { bgcolor: '#2a2f3d' },
                }}
              >
                <ListItemIcon sx={{ color: '#9ca3af', minWidth: 'auto' }}>{item.icon}</ListItemIcon>
              </ListItem>
            </Tooltip>
          ))}
          <Divider sx={{ bgcolor: '#2a2f3d', width: '50%', my: 2 }} />
          <Tooltip title="Settings" placement="right">
            <ListItem
              button
              sx={{
                justifyContent: 'center',
                mb: 2,
                borderRadius: '8px',
                width: '48px',
                height: '48px',
                '&:hover': { bgcolor: '#2a2f3d' },
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
                '&:hover': { bgcolor: '#2a2f3d' },
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
            bgcolor: '#1a1d29',
            width: { sm: 'calc(100% - 80px)', md: 'calc(100% - 80px)' },
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {isMobile && <Box sx={{ height: '64px' }} />}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              Welcome, User!
            </Typography>
            <Badge badgeContent={notifications} color="error">
              <NotificationsIcon sx={{ color: '#9ca3af', cursor: 'pointer' }} />
            </Badge>
          </Box>

          {/* Stats Section */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { icon: <EventIcon />, title: 'Total Events', value: '8,739.76' },
              { icon: <ListIcon />, title: 'Tasks Today', value: '146.76' },
              { icon: <TimerIcon />, title: 'Focus Hours', value: '12.5' },
              { icon: <GroupIcon />, title: 'Group Projects', value: '3 Active' },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StatCard>
                  {React.cloneElement(stat.icon, { sx: { color: '#3b82f6', mr: 2, fontSize: '2rem' } })}
                  <Box>
                    <Typography variant="h6" sx={{ color: '#ffffff', fontSize: '1.1rem' }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9ca3af', fontSize: '1rem' }}>
                      {stat.value}
                    </Typography>
                  </Box>
                </StatCard>
              </Grid>
            ))}
          </Grid>

          {/* Quick Add Task & Upcoming Events */}
          <Grid container spacing={3} sx={{ mb: 4, flexGrow: 1 }}>
            {/* Quick Add Task */}
            <Grid item xs={12} md={6}>
              <StyledCard sx={{ height: '100%', minHeight: '400px' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                    Quick Add Task
                  </Typography>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Add a new task..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      sx={{
                        mr: 1,
                        '& .MuiOutlinedInput-root': {
                          background: '#2a2f3d',
                          color: '#ffffff',
                          borderRadius: '8px',
                        },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#3b82f6' },
                      }}
                    />
                    <IconButton color="primary" onClick={handleAddTask}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <List sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {tasks.map((task) => (
                      <ListItemButton key={task.id} onClick={() => handleCompleteTask(task.id)}>
                        <ListItemIcon>
                          {task.completed ? <DoneIcon sx={{ color: '#3b82f6' }} /> : <AccessTimeIcon sx={{ color: '#9ca3af' }} />}
                        </ListItemIcon>
                        <ListItemText
                          primary={task.text}
                          sx={{ color: task.completed ? '#9ca3af' : '#ffffff', textDecoration: task.completed ? 'line-through' : 'none' }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Upcoming Events */}
            <Grid item xs={12} md={6}>
              <StyledCard sx={{ height: '100%', minHeight: '400px' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                    Upcoming Events
                  </Typography>
                  <TableContainer>
                    <Table sx={{ minWidth: 300 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: '#9ca3af' }}>Event</TableCell>
                          <TableCell sx={{ color: '#9ca3af' }}>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {upcomingEvents.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell sx={{ color: '#ffffff' }}>{event.title}</TableCell>
                            <TableCell sx={{ color: '#9ca3af' }}>{event.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>

          {/* Feature Cards */}
          <Grid container spacing={3} sx={{ mb: 4, flexGrow: 1 }}>
            {[
              {
                title: 'Core Features',
                items: [
                  { icon: <EventIcon />, title: 'Event Calendar', desc: 'Sync with Google, Apple, or Outlook.', action: 'View Calendar', link: '/calendar' },
                  { icon: <ListIcon />, title: 'To-Do List', desc: 'Manage tasks with priority and due dates.', action: 'View Tasks', link: '/todo' },
                  { icon: <TimerIcon />, title: 'Pomodoro Timer', desc: 'Focus with timed study sessions.', action: 'Start Timer', link: '/pomodoro' },
                ],
              },
              {
                title: 'Collaboration & Resources',
                items: [
                  { icon: <GroupIcon />, title: 'Collaboration', desc: 'Share schedules and manage projects.', action: 'Collaborate', link: '/collaboration' },
                  { icon: <SchoolIcon />, title: 'Academic Assistance', desc: 'Access resources and GPA calculator.', action: 'Explore', link: '/resources' },
                  { icon: <NotificationsIcon />, title: 'Notifications', desc: 'Stay updated with reminders.', action: 'View Alerts', link: '/notifications' },
                ],
              },
            ].map((section, index) => (
              <Grid item xs={12} key={index}>
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, cursor: 'pointer' }} onClick={() => handleExpand(section.title)}>
                    <Typography variant="h5" sx={{ color: '#ffffff', mr: 1 }}>
                      {section.title}
                    </Typography>
                    {expanded[section.title] ? <ExpandLessIcon sx={{ color: '#9ca3af' }} /> : <ExpandMoreIcon sx={{ color: '#9ca3af' }} />}
                  </Box>
                  <Collapse in={expanded[section.title] || !isMobile}>
                    <Grid container spacing={3}>
                      {section.items.map((item, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                          <StyledCard>
                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                {React.cloneElement(item.icon, { sx: { color: '#3b82f6', mr: 1, fontSize: '1.5rem' } })}
                                <Typography variant="h6" sx={{ color: '#ffffff', fontSize: '1.25rem' }}>
                                  {item.title}
                                </Typography>
                              </Box>
                              <Typography variant="body2" sx={{ color: '#9ca3af', mb: 3, flexGrow: 1 }}>
                                {item.desc}
                              </Typography>
                              <Button
                                variant="contained"
                                component={Link}
                                to={item.link}
                                sx={{
                                  bgcolor: '#3b82f6',
                                  color: '#ffffff',
                                  borderRadius: 20,
                                  '&:hover': { bgcolor: '#2563eb' },
                                  mt: 'auto',
                                }}
                              >
                                {item.action}
                              </Button>
                            </CardContent>
                          </StyledCard>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Recent Activity, Progress Tracker & Motivational Quote */}
          <Grid container spacing={3} sx={{ mb: 4, flexGrow: 1 }}>
            {/* Recent Activity */}
            <Grid item xs={12} md={4}>
              <StyledCard sx={{ height: '100%', minHeight: '350px' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                    Recent Activity
                  </Typography>
                  <List sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {recentActivity.map((activity) => (
                      <ListItem key={activity.id}>
                        <ListItemText
                          primary={activity.action}
                          secondary={activity.time}
                          primaryTypographyProps={{ color: '#ffffff' }}
                          secondaryTypographyProps={{ color: '#9ca3af' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Progress Tracker */}
            <Grid item xs={12} md={4}>
              <StyledCard sx={{ height: '100%', minHeight: '350px' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                    Progress Tracker
                  </Typography>
                  {progressData.map((progress, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography variant="body1" sx={{ color: '#ffffff', mb: 1 }}>
                        {progress.label}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={progress.value}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: '#2a2f3d',
                          '& .MuiLinearProgress-bar': { backgroundColor: '#3b82f6' },
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#9ca3af', mt: 1 }}>
                        {progress.value}%
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Motivational Quote */}
            <Grid item xs={12} md={4}>
              <StyledCard sx={{ height: '100%', minHeight: '350px' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <QuoteIcon sx={{ color: '#3b82f6', fontSize: '2.5rem', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
                    "Success is the sum of small efforts, repeated day in and day out."
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                    — Robert Collier
                  </Typography>
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
