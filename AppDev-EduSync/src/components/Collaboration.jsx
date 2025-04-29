import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  TextField,
  Chip,
  Fade,
  Tooltip,
  IconButton,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Avatar,
  Badge,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Group as GroupIcon,
  Add as AddIcon,
  Event as EventIcon,
  Task as TaskIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
  Chat as ChatIcon,
  Link as LinkIcon,
  People as PeopleIcon,
  BarChart as AnalyticsIcon,
  Send as SendIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

// Styled Components
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

const ChatBox = styled(Box)(({ theme }) => ({
  maxHeight: '300px',
  overflowY: 'auto',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
}));

const Collaboration = ({ theme }) => {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'CS101 Project Group',
      members: ['Alice', 'Bob', 'You'],
      tasks: [
        { id: 1, text: 'Complete API integration', due: 'Tomorrow', status: 'Pending', assignedTo: 'Alice' },
        { id: 2, text: 'Design UI mockups', due: 'In 2 days', status: 'In Progress', assignedTo: 'Bob' },
      ],
      meetings: [
        { id: 1, title: 'Sprint Planning', time: 'Today, 3:00 PM' },
        { id: 2, title: 'Code Review', time: 'Tomorrow, 10:00 AM' },
      ],
      messages: [
        { id: 1, sender: 'Alice', text: 'Hey, I’ve started the API integration!', timestamp: '10 mins ago' },
        { id: 2, sender: 'Bob', text: 'Great, I’ll finish the mockups by tonight.', timestamp: '5 mins ago' },
      ],
      resources: [
        { id: 1, name: 'Project Specs', url: 'https://docs.google.com/document/1' },
        { id: 2, name: 'API Reference', url: 'https://api.example.com/docs' },
      ],
      analytics: { tasksCompleted: 5, totalTasks: 10, meetingsHeld: 3 },
    },
    {
      id: 2,
      name: 'Math Study Group',
      members: ['Charlie', 'You'],
      tasks: [
        { id: 3, text: 'Solve Chapter 5 problems', due: 'Today', status: 'Pending', assignedTo: 'You' },
      ],
      meetings: [
        { id: 3, title: 'Calculus Review', time: 'Today, 5:00 PM' },
      ],
      messages: [
        { id: 3, sender: 'Charlie', text: 'Ready for the calculus review?', timestamp: '15 mins ago' },
      ],
      resources: [
        { id: 3, name: 'Calculus Notes', url: 'https://notion.so/calculus' },
      ],
      analytics: { tasksCompleted: 2, totalTasks: 4, meetingsHeld: 1 },
    },
  ]);

  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newTask, setNewTask] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newResource, setNewResource] = useState('');
  const [newMeetingTitle, setNewMeetingTitle] = useState('');
  const [newMeetingTime, setNewMeetingTime] = useState('');

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      const newGroup = {
        id: Date.now(),
        name: newGroupName,
        members: ['You'],
        tasks: [],
        meetings: [],
        messages: [],
        resources: [],
        analytics: { tasksCompleted: 0, totalTasks: 0, meetingsHeld: 0 },
      };
      setGroups([...groups, newGroup]);
      setNewGroupName('');
      setSelectedGroup(newGroup);
    }
  };

  const handleAddTask = () => {
    if (newTask.trim() && selectedGroup && newTaskAssignee) {
      const updatedGroups = groups.map((group) =>
        group.id === selectedGroup.id
          ? {
              ...group,
              tasks: [
                ...group.tasks,
                {
                  id: Date.now(),
                  text: newTask,
                  due: 'Today',
                  status: 'Pending',
                  assignedTo: newTaskAssignee,
                },
              ],
              analytics: {
                ...group.analytics,
                totalTasks: group.analytics.totalTasks + 1,
              },
            }
          : group
      );
      setGroups(updatedGroups);
      setSelectedGroup({
        ...selectedGroup,
        tasks: [
          ...selectedGroup.tasks,
          {
            id: Date.now(),
            text: newTask,
            due: 'Today',
            status: 'Pending',
            assignedTo: newTaskAssignee,
          },
        ],
        analytics: {
          ...selectedGroup.analytics,
          totalTasks: selectedGroup.analytics.totalTasks + 1,
        },
      });
      setNewTask('');
      setNewTaskAssignee('');
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id
        ? {
            ...group,
            tasks: group.tasks.filter((task) => task.id !== taskId),
          }
        : group
    );
    setGroups(updatedGroups);
    setSelectedGroup({
      ...selectedGroup,
      tasks: selectedGroup.tasks.filter((task) => task.id !== taskId),
    });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedGroup) {
      const updatedGroups = groups.map((group) =>
        group.id === selectedGroup.id
          ? {
              ...group,
              messages: [
                ...group.messages,
                {
                  id: Date.now(),
                  sender: 'You',
                  text: newMessage,
                  timestamp: 'Just now',
                },
              ],
            }
          : group
      );
      setGroups(updatedGroups);
      setSelectedGroup({
        ...selectedGroup,
        messages: [
          ...selectedGroup.messages,
          {
            id: Date.now(),
            sender: 'You',
            text: newMessage,
            timestamp: 'Just now',
          },
        ],
      });
      setNewMessage('');
    }
  };

  const handleAddResource = () => {
    if (newResource.trim() && selectedGroup) {
      const updatedGroups = groups.map((group) =>
        group.id === selectedGroup.id
          ? {
              ...group,
              resources: [
                ...group.resources,
                {
                  id: Date.now(),
                  name: newResource.split('/').pop() || 'Resource',
                  url: newResource,
                },
              ],
            }
          : group
      );
      setGroups(updatedGroups);
      setSelectedGroup({
        ...selectedGroup,
        resources: [
          ...selectedGroup.resources,
          {
            id: Date.now(),
            name: newResource.split('/').pop() || 'Resource',
            url: newResource,
          },
        ],
      });
      setNewResource('');
    }
  };

  const handleScheduleMeeting = () => {
    if (newMeetingTitle.trim() && newMeetingTime && selectedGroup) {
      // Format the datetime-local input to a readable string
      const formattedTime = new Date(newMeetingTime).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      const updatedGroups = groups.map((group) =>
        group.id === selectedGroup.id
          ? {
              ...group,
              meetings: [
                ...group.meetings,
                {
                  id: Date.now(),
                  title: newMeetingTitle,
                  time: formattedTime,
                },
              ],
              analytics: {
                ...group.analytics,
                meetingsHeld: group.analytics.meetingsHeld + 1,
              },
            }
          : group
      );
      setGroups(updatedGroups);
      setSelectedGroup({
        ...selectedGroup,
        meetings: [
          ...selectedGroup.meetings,
          {
            id: Date.now(),
            title: newMeetingTitle,
            time: formattedTime,
          },
        ],
        analytics: {
          ...selectedGroup.analytics,
          meetingsHeld: selectedGroup.analytics.meetingsHeld + 1,
        },
      });
      setNewMeetingTitle('');
      setNewMeetingTime('');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 4, bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
        Collaboration
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Collaborate with your study groups, manage tasks, and schedule meetings.
      </Typography>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          {/* Your Groups */}
          <Fade in={true} timeout={500}>
            <StyledCard sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                  Your Groups
                </Typography>
                <TextField
                  fullWidth
                  placeholder="New group name..."
                  variant="outlined"
                  size="small"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<AddIcon />}
                  onClick={handleAddGroup}
                  color="primary"
                >
                  Add Group
                </Button>
                <List dense>
                  {groups.map((group) => (
                    <ListItemButton
                      key={group.id}
                      selected={selectedGroup.id === group.id}
                      onClick={() => setSelectedGroup(group)}
                      sx={{
                        borderRadius: theme.shape.borderRadius,
                        '&.Mui-selected': { bgcolor: 'primary.main', color: 'primary.contrastText' },
                        '&.Mui-selected:hover': { bgcolor: 'primary.dark' },
                      }}
                    >
                      <ListItemIcon>
                        <GroupIcon color={selectedGroup.id === group.id ? 'inherit' : 'primary'} />
                      </ListItemIcon>
                      <ListItemText primary={group.name} />
                      <Badge badgeContent={group.members.length} color="secondary" />
                    </ListItemButton>
                  ))}
                </List>
              </CardContent>
            </StyledCard>
          </Fade>

          {/* Group Members */}
          {selectedGroup && (
            <Fade in={true} timeout={700}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Group Members
                  </Typography>
                  <List dense>
                    {selectedGroup.members.map((member) => (
                      <ListItem key={member}>
                        <ListItemIcon>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
                            {member[0]}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={member}
                          primaryTypographyProps={{ color: 'text.primary' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button variant="text" startIcon={<PeopleIcon />} color="primary">
                    Invite Member
                  </Button>
                </CardContent>
              </StyledCard>
            </Fade>
          )}
        </Grid>

        {/* Middle Column */}
        <Grid item xs={12} md={4}>
          {/* Tasks */}
          {selectedGroup && (
            <Fade in={true} timeout={900}>
              <StyledCard sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {selectedGroup.name} - Tasks
                    </Typography>
                    <Button variant="text" startIcon={<ShareIcon />} color="primary">
                      Share Task
                    </Button>
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="Add a new task..."
                    variant="outlined"
                    size="small"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>Assign To</InputLabel>
                    <Select
                      value={newTaskAssignee}
                      label="Assign To"
                      onChange={(e) => setNewTaskAssignee(e.target.value)}
                    >
                      {selectedGroup.members.map((member) => (
                        <MenuItem key={member} value={member}>
                          {member}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<AddIcon />}
                    onClick={handleAddTask}
                    color="primary"
                  >
                    Add Task
                  </Button>
                  <List dense>
                    {selectedGroup.tasks.map((task) => (
                      <ListItem
                        key={task.id}
                        secondaryAction={
                          <Tooltip title="Delete Task">
                            <IconButton edge="end" onClick={() => handleDeleteTask(task.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        }
                      >
                        <ListItemIcon>
                          <TaskIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={task.text}
                          secondary={`Due: ${task.due} | Assigned: ${task.assignedTo}`}
                          primaryTypographyProps={{ color: 'text.primary' }}
                          secondaryTypographyProps={{ color: 'text.secondary' }}
                        />
                        <Chip
                          label={task.status}
                          color={task.status === 'Pending' ? 'warning' : 'success'}
                          size="small"
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </StyledCard>
            </Fade>
          )}

          {/* Meetings */}
          {selectedGroup && (
            <Fade in={true} timeout={1100}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {selectedGroup.name} - Meetings
                    </Typography>
                    <Button variant="text" startIcon={<AddIcon />} color="primary">
                      Schedule Meeting
                    </Button>
                  </Box>
                  <List dense>
                    {selectedGroup.meetings.map((meeting) => (
                      <ListItem key={meeting.id}>
                        <ListItemIcon>
                          <EventIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={meeting.title}
                          secondary={meeting.time}
                          primaryTypographyProps={{ color: 'text.primary' }}
                          secondaryTypographyProps={{ color: 'text.secondary' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </StyledCard>
            </Fade>
          )}
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Group Chat */}
          {selectedGroup && (
            <Fade in={true} timeout={1300}>
              <StyledCard sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Group Chat
                  </Typography>
                  <ChatBox>
                    {selectedGroup.messages.map((message) => (
                      <Box
                        key={message.id}
                        sx={{
                          mb: 2,
                          p: 1,
                          bgcolor: message.sender === 'You' ? 'primary.light' : 'grey.200',
                          borderRadius: 1,
                          maxWidth: '80%',
                          ml: message.sender === 'You' ? 'auto' : 0,
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {message.sender} • {message.timestamp}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                          {message.text}
                        </Typography>
                      </Box>
                    ))}
                  </ChatBox>
                  <TextField
                    fullWidth
                    placeholder="Type a message..."
                    variant="outlined"
                    size="small"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<SendIcon />}
                    onClick={handleSendMessage}
                    color="primary"
                  >
                    Send
                  </Button>
                </CardContent>
              </StyledCard>
            </Fade>
          )}

          {/* Shared Resources */}
          {selectedGroup && (
            <Fade in={true} timeout={1500}>
              <StyledCard sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Shared Resources
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Add a resource URL..."
                    variant="outlined"
                    size="small"
                    value={newResource}
                    onChange={(e) => setNewResource(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<LinkIcon />}
                    onClick={handleAddResource}
                    color="primary"
                  >
                    Add Resource
                  </Button>
                  <List dense>
                    {selectedGroup.resources.map((resource) => (
                      <ListItemButton
                        key={resource.id}
                        component="a"
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ListItemIcon>
                          <LinkIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={resource.name}
                          primaryTypographyProps={{ color: 'text.primary' }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </CardContent>
              </StyledCard>
            </Fade>
          )}

          {/* Schedule Meeting */}
          {selectedGroup && (
            <Fade in={true} timeout={1700}>
              <StyledCard sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Schedule Meeting
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Meeting title..."
                    variant="outlined"
                    size="small"
                    value={newMeetingTitle}
                    onChange={(e) => setNewMeetingTitle(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    type="datetime-local"
                    label="Meeting Date & Time"
                    value={newMeetingTime}
                    onChange={(e) => setNewMeetingTime(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<CalendarIcon />}
                    onClick={handleScheduleMeeting}
                    color="primary"
                  >
                    Schedule
                  </Button>
                </CardContent>
              </StyledCard>
            </Fade>
          )}

          {/* Group Analytics */}
          {selectedGroup && (
            <Fade in={true} timeout={1900}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Group Analytics
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CircularProgress
                      variant="determinate"
                      value={(selectedGroup.analytics.tasksCompleted / selectedGroup.analytics.totalTasks) * 100 || 0}
                      size={60}
                      thickness={5}
                      sx={{ color: 'secondary.main', mr: 2 }}
                    />
                    <Box>
                      <Typography variant="body1" color="text.primary">
                        {selectedGroup.analytics.tasksCompleted}/{selectedGroup.analytics.totalTasks} Tasks Completed
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {Math.round((selectedGroup.analytics.tasksCompleted / selectedGroup.analytics.totalTasks) * 100) || 0}% Complete
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.primary">
                    Meetings Held: {selectedGroup.analytics.meetingsHeld}
                  </Typography>
                  <Button variant="text" startIcon={<AnalyticsIcon />} color="primary" sx={{ mt: 2 }}>
                    View Detailed Analytics
                  </Button>
                </CardContent>
              </StyledCard>
            </Fade>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Collaboration;
