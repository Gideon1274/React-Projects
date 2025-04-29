import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Chip,
  Collapse,
  TextField,
  Fade,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  GetApp as ExportIcon,
} from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from './TaskContext';
import { CSVLink } from 'react-csv';

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

const HeaderBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
}));

const ProgressTracker = ({ theme }) => {
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(TaskContext);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('progress');
  const [expandedTasks, setExpandedTasks] = useState({});

  // Handle progress update
  const handleProgressUpdate = (id, progress) => {
    const newProgress = Math.max(0, Math.min(100, parseInt(progress) || 0));
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, progress: newProgress, completed: newProgress === 100 } : task
      )
    );
  };

  // Toggle task notes expansion
  const toggleNotes = (id) => {
    setExpandedTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      if (filter === 'study') return task.category === 'Study';
      if (filter === 'work') return task.category === 'Work';
      if (filter === 'personal') return task.category === 'Personal';
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'progress') return b.progress - a.progress;
      if (sortBy === 'due') return (a.due || '9999-12-31').localeCompare(b.due || '9999-12-31');
      return a.text.localeCompare(b.text);
    });

  // Analytics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const overdueTasks = tasks.filter((task) => task.due && new Date(task.due) < new Date() && !task.completed).length;
  const tasksByCategory = {
    Study: tasks.filter((task) => task.category === 'Study').length,
    Work: tasks.filter((task) => task.category === 'Work').length,
    Personal: tasks.filter((task) => task.category === 'Personal').length,
  };

  // CSV export data
  const csvData = tasks.map((task) => ({
    Task: task.text,
    Priority: task.priority,
    Category: task.category,
    Due: task.due || 'No due date',
    Progress: `${task.progress}%`,
    Completed: task.completed ? 'Yes' : 'No',
    Notes: task.notes || '',
  }));

  // Motivational message
  const motivationalMessage =
    completionRate >= 80 ? "You're crushing it! Keep up the amazing work!" :
    completionRate >= 50 ? "Great progress! You're halfway there!" :
    "You've got this! Start tackling those tasks!";

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Header */}
        <HeaderBox>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton sx={{ color: 'white', mr: 2 }} onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Progress Tracker
            </Typography>
          </Box>
          <Typography variant="body1">{motivationalMessage}</Typography>
        </HeaderBox>

        {/* Analytics Dashboard */}
        <Fade in={true} timeout={500}>
          <StyledCard sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                Task Analytics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Typography variant="body2" color="text.secondary">Total Tasks</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>{totalTasks}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="body2" color="text.secondary">Completed</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'secondary.main' }}>{completedTasks}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="body2" color="text.secondary">Overdue</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'error.main' }}>{overdueTasks}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="body2" color="text.secondary">Completion Rate</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress
                      variant="determinate"
                      value={completionRate}
                      size={40}
                      thickness={5}
                      sx={{ color: 'secondary.main', mr: 1 }}
                    />
                    <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>{completionRate}%</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Tasks by Category</Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Chip label={`Study: ${tasksByCategory.Study}`} color="primary" />
                    <Chip label={`Work: ${tasksByCategory.Work}`} color="secondary" />
                    <Chip label={`Personal: ${tasksByCategory.Personal}`} color="warning" />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Fade>

        {/* Controls */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Filter</InputLabel>
              <Select value={filter} onChange={(e) => setFilter(e.target.value)} label="Filter">
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="study">Study</MenuItem>
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="personal">Personal</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
                <MenuItem value="progress">Progress</MenuItem>
                <MenuItem value="due">Due Date</MenuItem>
                <MenuItem value="text">Task Name</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              startIcon={<ExportIcon />}
              fullWidth
              sx={{ height: '100%' }}
            >
              <CSVLink
                data={csvData}
                filename="task_progress.csv"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Export Progress
              </CSVLink>
            </Button>
          </Grid>
        </Grid>

        {/* Task Progress List */}
        <Fade in={true} timeout={700}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                Task Progress
              </Typography>
              {filteredTasks.map((task) => (
                <Box key={task.id} sx={{ mb: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        sx={{
                          color: 'text.primary',
                          textDecoration: task.completed ? 'line-through' : 'none',
                          mr: 1,
                        }}
                      >
                        {task.text}
                      </Typography>
                      <Chip
                        label={task.category}
                        size="small"
                        sx={{
                          bgcolor:
                            task.category === 'Study' ? 'primary.light' :
                            task.category === 'Work' ? 'secondary.light' : 'warning.light',
                          color: 'text.primary',
                        }}
                      />
                      <Chip
                        label={task.priority}
                        color={
                          task.priority === 'High' ? 'error' :
                          task.priority === 'Medium' ? 'warning' : 'success'
                        }
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Box>
                    <IconButton onClick={() => toggleNotes(task.id)}>
                      {expandedTasks[task.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Due: {task.due || 'No due date'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={task.progress}
                      sx={{ flexGrow: 1, height: 8, borderRadius: 4, bgcolor: 'grey.200', '& .MuiLinearProgress-bar': { bgcolor: 'secondary.main' } }}
                    />
                    <TextField
                      type="number"
                      value={task.progress}
                      onChange={(e) => handleProgressUpdate(task.id, e.target.value)}
                      size="small"
                      sx={{ width: 60 }}
                      inputProps={{ min: 0, max: 100 }}
                      label="%"
                    />
                  </Box>
                  <Collapse in={expandedTasks[task.id]}>
                    {task.notes && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Notes: {task.notes}
                      </Typography>
                    )}
                  </Collapse>
                </Box>
              ))}
            </CardContent>
          </StyledCard>
        </Fade>
      </Box>
    </ThemeProvider>
  );
};

export default ProgressTracker;
