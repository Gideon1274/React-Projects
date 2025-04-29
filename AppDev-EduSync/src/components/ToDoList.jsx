import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  Fade,
  Tooltip,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  InputAdornment,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  CheckCircle as CheckCircleIcon, 
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Styled Components
const StyledModal = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  outline: 'none',
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

const HeaderBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
}));

const TodoList = ({ theme }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Finish Math Assignment', priority: 'High', due: '2025-04-30', completed: false, category: 'Study', notes: '' },
    { id: 2, text: 'Read Chapter 5', priority: 'Medium', due: '2025-04-29', completed: false, category: 'Study', notes: 'Focus on key concepts' },
    { id: 3, text: 'Prepare for Quiz', priority: 'Low', due: '2025-05-01', completed: true, category: 'Study', notes: '' },
    { id: 4, text: 'Team Meeting', priority: 'High', due: '2025-04-29', completed: false, category: 'Work', notes: 'Discuss project timeline' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newDueDate, setNewDueDate] = useState('');
  const [newCategory, setNewCategory] = useState('Study');
  const [newNotes, setNewNotes] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Handle adding or editing a task
  const handleAddOrEditTask = () => {
    if (!newTask.trim()) {
      alert('Task title is required');
      return;
    }
    const taskObj = {
      id: editingTask ? editingTask.id : Date.now(),
      text: newTask,
      priority: newPriority,
      due: newDueDate,
      completed: editingTask ? editingTask.completed : false,
      category: newCategory,
      notes: newNotes,
    };

    if (editingTask) {
      setTasks(tasks.map((task) => (task.id === editingTask.id ? taskObj : task)));
    } else {
      setTasks([...tasks, taskObj]);
    }
    resetForm();
  };

  // Handle deleting a task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handle toggling task completion
  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle editing a task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask(task.text);
    setNewPriority(task.priority);
    setNewDueDate(task.due);
    setNewCategory(task.category);
    setNewNotes(task.notes);
    setOpenModal(true);
  };

  // Reset form fields
  const resetForm = () => {
    setNewTask('');
    setNewPriority('Medium');
    setNewDueDate('');
    setNewCategory('Study');
    setNewNotes('');
    setOpenModal(false);
    setEditingTask(null);
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    })
    .filter((task) => task.text.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === 'due') {
        return (a.due || '9999-12-31').localeCompare(b.due || '9999-12-31');
      }
      return a.text.localeCompare(b.text);
    });

  // Task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

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
              To-Do List
            </Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 1,
              '& .MuiInputBase-input': { color: 'white' },
              '& .MuiInputBase-input::placeholder': { color: 'white', opacity: 0.7 },
            }}
          />
        </HeaderBox>

        {/* Task Statistics */}
        <Fade in={true} timeout={500}>
          <StyledCard sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                Task Overview
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">Total Tasks</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>{totalTasks}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">Completed</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'secondary.main' }}>{completedTasks}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">Completion Rate</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>{completionRate}%</Typography>
                </Grid>
                <Grid item xs={12}>
                  <LinearProgress
                    variant="determinate"
                    value={completionRate}
                    sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.200', '& .MuiLinearProgress-bar': { bgcolor: 'secondary.main' }, mt: 2 }}
                  />
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
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
                <MenuItem value="priority">Priority</MenuItem>
                <MenuItem value="due">Due Date</MenuItem>
                <MenuItem value="text">Task Name</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              fullWidth
              sx={{ height: '100%' }}
              onClick={() => setOpenModal(true)}
            >
              Add Task
            </Button>
          </Grid>
        </Grid>

        {/* Task List */}
        <Fade in={true} timeout={700}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                Tasks
              </Typography>
              <List>
                {filteredTasks.map((task) => (
                  <React.Fragment key={task.id}>
                    <ListItem
                      sx={{
                        bgcolor: task.completed ? 'action.hover' : 'inherit',
                        borderRadius: 1,
                        mb: 1,
                        '&:hover': { bgcolor: 'action.hover' },
                        transition: 'background-color 0.2s ease',
                      }}
                      secondaryAction={
                        <Box>
                          <Tooltip title={task.completed ? 'Mark as Pending' : 'Mark as Completed'}>
                            <IconButton onClick={() => handleToggleComplete(task.id)}>
                              <CheckCircleIcon color={task.completed ? 'success' : 'disabled'} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Task">
                            <IconButton onClick={() => handleEditTask(task)}>
                              <EditIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Task">
                            <IconButton onClick={() => handleDeleteTask(task.id)}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      }
                    >
                      <ListItemText
                        primary={
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
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              Due: {task.due || 'No due date'}
                            </Typography>
                            {task.notes && (
                              <Typography variant="caption" color="text.secondary">
                                Notes: {task.notes}
                              </Typography>
                            )}
                          </>
                        }
                      />
                      <Chip
                        label={task.priority}
                        color={
                          task.priority === 'High' ? 'error' :
                          task.priority === 'Medium' ? 'warning' : 'success'
                        }
                        size="small"
                        sx={{ ml: 2 }}
                      />
                    </ListItem>
                    <Divider sx={{ mx: 2 }} />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </Fade>

        {/* Task Modal */}
        <Modal open={openModal} onClose={resetForm}>
          <StyledModal>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              {editingTask ? 'Edit Task' : 'Add Task'}
            </Typography>
            <TextField
              fullWidth
              label="Task Title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="Study">Study</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Personal">Personal</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={3}
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button variant="outlined" onClick={resetForm} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleAddOrEditTask}>
                {editingTask ? 'Save' : 'Add'}
              </Button>
            </Box>
          </StyledModal>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default TodoList;
