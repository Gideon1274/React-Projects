import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Fade,
  Tooltip,
  CircularProgress,
  InputAdornment,
  LinearProgress,
  Slider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  ArrowBack as ArrowBackIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Replay as ResetIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  NoteAdd as NoteIcon,
  FlashOn as FlashIcon,
  Assignment as TaskIcon,
} from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from './TaskContext';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            Something went wrong: {this.state.error?.message || 'Unknown error'}
          </Typography>
          <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
            Reload Page
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

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

const SidebarBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(2),
  height: 'calc(100vh - 120px)',
  position: 'sticky',
  top: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Flashcard = styled(Box)(({ theme, flipped }) => ({
  perspective: '1000px',
  width: '100%',
  height: 200,
  position: 'relative',
  cursor: 'pointer',
  '& > div': {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
  },
  '& > .front': {
    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  },
  '& > .back': {
    transform: flipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
  },
}));

const StudyTools = ({ theme }) => {
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(TaskContext) || { tasks: [], setTasks: () => {} };
  
  // Log mounting for debugging
  useEffect(() => {
    console.log('StudyTools component mounted', { tasks });
  }, []);

  // Pomodoro Timer State
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [selectedTask, setSelectedTask] = useState('');
  const [studyHoursToday, setStudyHoursToday] = useState(0);

  // Study Goal State
  const [dailyGoal, setDailyGoal] = useState(2); // Hours

  // Flashcard State
  const [flashcards, setFlashcards] = useState([
    { id: 1, front: 'What is 2+2?', back: '4', flipped: false },
    { id: 2, front: 'Capital of France?', back: 'Paris', flipped: false },
  ]);
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');

  // Notes State
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [noteTask, setNoteTask] = useState('');

  // Quick Task Add State
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');

  // Resource Links State
  const [searchQuery, setSearchQuery] = useState('');
  const resources = [
    { name: 'Khan Academy', url: 'https://www.khanacademy.org' },
    { name: 'Quizlet', url: 'https://quizlet.com' },
    { name: 'Coursera', url: 'https://www.coursera.org' },
    { name: 'edX', url: 'https://www.edx.org' },
  ];

  // Timer Logic
  useEffect(() => {
    let timer;
    if (isRunning && pomodoroTime > 0) {
      timer = setInterval(() => {
        setPomodoroTime((prev) => {
          const newTime = prev - 1;
          setStudyHoursToday((hours) => hours + 1 / 3600);
          return newTime;
        });
      }, 1000);
    } else if (isRunning && pomodoroTime === 0 && !isBreak) {
      setIsBreak(true);
      setPomodoroTime(5 * 60);
      setPomodoroCount((prev) => prev + 1);
      if (selectedTask && tasks?.length > 0) {
        setTasks(
          tasks.map((task) =>
            task.id === parseInt(selectedTask) ? { ...task, progress: Math.min(task.progress + 25, 100) } : task
          )
        );
      }
      if (studyHoursToday >= dailyGoal) {
        alert('Daily study goal achieved! Great work!');
      }
    } else if (isRunning && pomodoroTime === 0 && isBreak) {
      setIsBreak(false);
      setPomodoroTime(25 * 60);
    }
    return () => clearInterval(timer);
  }, [isRunning, pomodoroTime, isBreak, selectedTask, setTasks, tasks, studyHoursToday, dailyGoal]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setPomodoroTime(25 * 60);
  };

  // Flashcard Logic
  const addFlashcard = () => {
    if (!newFront.trim() || !newBack.trim()) {
      alert('Both front and back are required');
      return;
    }
    setFlashcards([...flashcards, { id: Date.now(), front: newFront, back: newBack, flipped: false }]);
    setNewFront('');
    setNewBack('');
  };

  const deleteFlashcard = (id) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };

  const flipCard = (id) => {
    setFlashcards(
      flashcards.map((card) => (card.id === id ? { ...card, flipped: !card.flipped } : card))
    );
  };

  // Notes Logic
  const addNote = () => {
    if (!newNote.trim()) {
      alert('Note content is required');
      return;
    }
    setNotes([...notes, { id: Date.now(), content: newNote, taskId: noteTask || null }]);
    setNewNote('');
    setNoteTask('');
  };

  const exportNotes = () => {
    const content = notes.map((note) => {
      const task = tasks.find((t) => t.id === parseInt(note.taskId));
      return `Note: ${note.content}\nTask: ${task ? task.text : 'None'}\n\n`;
    }).join('');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'study_notes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Quick Task Add Logic
  const addQuickTask = () => {
    if (!newTaskText.trim()) {
      alert('Task title is required');
      return;
    }
    const taskObj = {
      id: Date.now(),
      text: newTaskText,
      priority: newTaskPriority,
      due: '',
      completed: false,
      category: 'Study',
      notes: '',
      progress: 0,
    };
    setTasks([...tasks, taskObj]);
    setNewTaskText('');
    setNewTaskPriority('Medium');
  };

  // Filtered Resources
  const filteredResources = resources.filter((resource) =>
    resource.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Study Analytics
  const studyTasks = tasks?.filter((task) => task.category === 'Study')?.length || 0;
  const motivationalMessage = pomodoroCount >= 4 ? "You're a study rockstar!" : "Keep it up!";
  const goalProgress = Math.min((studyHoursToday / dailyGoal) * 100, 100);

  // Sidebar Actions
  const handleQuickTask = () => {
    const text = prompt('Enter task title:');
    if (text?.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text,
        priority: 'Medium',
        due: '',
        completed: false,
        category: 'Study',
        notes: '',
        progress: 0,
      }]);
    }
  };

  const handleQuickFlashcard = () => {
    const front = prompt('Enter flashcard front:');
    const back = prompt('Enter flashcard back:');
    if (front?.trim() && back?.trim()) {
      setFlashcards([...flashcards, { id: Date.now(), front, back, flipped: false }]);
    }
  };

  const handleQuickNote = () => {
    const content = prompt('Enter note content:');
    if (content?.trim()) {
      setNotes([...notes, { id: Date.now(), content, taskId: null }]);
    }
  };

  if (!theme) {
    console.error('Theme prop is missing');
    return <Typography color="error">Error: Theme not provided</Typography>;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default', p: { xs: 2, md: 4 } }}>
          {/* Left Sidebar: Study Shortcuts */}
          <Fade in={true} timeout={300}>
            <SidebarBox sx={{ width: { md: 200 }, mr: { md: 2 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                Shortcuts
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Tooltip title="Start Pomodoro">
                  <Button
                    variant="contained"
                    startIcon={<PlayIcon />}
                    onClick={toggleTimer}
                    sx={{ bgcolor: 'primary.main' }}
                  >
                    Timer
                  </Button>
                </Tooltip>
                <Tooltip title="Add Task">
                  <Button
                    variant="contained"
                    startIcon={<TaskIcon />}
                    onClick={handleQuickTask}
                    sx={{ bgcolor: 'secondary.main' }}
                  >
                    Task
                  </Button>
                </Tooltip>
                <Tooltip title="Add Flashcard">
                  <Button
                    variant="contained"
                    startIcon={<FlashIcon />}
                    onClick={handleQuickFlashcard}
                    sx={{ bgcolor: 'primary.main' }}
                  >
                    Flashcard
                  </Button>
                </Tooltip>
                <Tooltip title="Add Note">
                  <Button
                    variant="contained"
                    startIcon={<NoteIcon />}
                    onClick={handleQuickNote}
                    sx={{ bgcolor: 'secondary.main' }}
                  >
                    Note
                  </Button>
                </Tooltip>
              </Box>
            </SidebarBox>
          </Fade>

          {/* Center Column: Main Content */}
          <Box sx={{ flexGrow: 1, maxWidth: { md: 800 }, mx: 'auto' }}>
            {/* Header */}
            <HeaderBox>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton sx={{ color: 'white', mr: 2 }} onClick={() => navigate(-1)}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Study Tools
                </Typography>
              </Box>
              <Typography variant="body1">{motivationalMessage}</Typography>
            </HeaderBox>

            {/* Fallback if tasks are not available */}
            {tasks?.length === 0 && (
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                No tasks available. Add tasks below or in the To-Do List to link with study tools.
              </Typography>
            )}

            {/* Study Analytics */}
            <Fade in={true} timeout={400}>
              <StyledCard sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Study Analytics
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body2" color="text.secondary">Study Tasks</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {studyTasks}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body2" color="text.secondary">Pomodoro Sessions</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                        {pomodoroCount}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body2" color="text.secondary">Flashcards Created</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {flashcards.length}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body2" color="text.secondary">Study Hours Today</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                        {studyHoursToday.toFixed(1)}h
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </Fade>

            {/* Study Goal Setter */}
            <Fade in={true} timeout={500}>
              <StyledCard sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Daily Study Goal
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Set Daily Goal (Hours)
                      </Typography>
                      <Slider
                        value={dailyGoal}
                        onChange={(e, value) => setDailyGoal(value)}
                        min={1}
                        max={8}
                        step={0.5}
                        valueLabelDisplay="auto"
                        sx={{ mt: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Progress
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={goalProgress}
                          sx={{
                            flexGrow: 1,
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'grey.200',
                            '& .MuiLinearProgress-bar': { bgcolor: 'secondary.main' },
                          }}
                        />
                        <Typography>
                          {studyHoursToday.toFixed(1)} / {dailyGoal}h
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </Fade>

            {/* Quick Task Add */}
            <Fade in={true} timeout={600}>
              <StyledCard sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Quick Task Add
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Task Title"
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select
                          value={newTaskPriority}
                          onChange={(e) => setNewTaskPriority(e.target.value)}
                          label="Priority"
                        >
                          <MenuItem value="High">High</MenuItem>
                          <MenuItem value="Medium">Medium</MenuItem>
                          <MenuItem value="Low">Low</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        fullWidth
                        sx={{ height: '100%' }}
                        onClick={addQuickTask}
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </Fade>

            {/* Pomodoro Timer */}
            <Fade in={true} timeout={700}>
              <StyledCard sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Pomodoro Timer
                  </Typography>
                  {console.log('Pomodoro Timer rendering', { pomodoroTime, isRunning, isBreak, selectedTask })}
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <Typography variant="h4" sx={{ color: isBreak ? 'secondary.main' : 'primary.main' }}>
                        {Math.floor(pomodoroTime / 60)}:{(pomodoroTime % 60).toString().padStart(2, '0')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {isBreak ? 'Break Time' : 'Work Time'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel>Link to Task</InputLabel>
                        <Select
                          value={selectedTask}
                          onChange={(e) => setSelectedTask(e.target.value)}
                          label="Link to Task"
                        >
                          <MenuItem value="">None</MenuItem>
                          {tasks?.filter((task) => task?.category === 'Study')?.map((task) => (
                            <MenuItem key={task.id} value={task.id}>{task.text}</MenuItem>
                          )) || []}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="contained" onClick={toggleTimer} startIcon={isRunning ? <PauseIcon /> : <PlayIcon />}>
                          {isRunning ? 'Pause' : 'Start'}
                        </Button>
                        <Button variant="outlined" onClick={resetTimer} startIcon={<ResetIcon />}>
                          Reset
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">Sessions Completed: {pomodoroCount}</Typography>
                      <CircularProgress
                        variant="determinate"
                        value={(pomodoroCount % 4) * 25}
                        size={50}
                        thickness={5}
                        sx={{ color: 'secondary.main', mt: 1 }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </Fade>

            {/* Flashcard Creator */}
            <Fade in={true} timeout={800}>
              <StyledCard sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Flashcard Creator
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        fullWidth
                        label="Flashcard Front"
                        value={newFront}
                        onChange={(e) => setNewFront(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        fullWidth
                        label="Flashcard Back"
                        value={newBack}
                        onChange={(e) => setNewBack(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        fullWidth
                        sx={{ height: '100%' }}
                        onClick={addFlashcard}
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    {flashcards.map((card) => (
                      <Grid item xs={12} sm={6} key={card.id}>
                        <Box sx={{ position: 'relative' }}>
                          <Flashcard flipped={card.flipped} onClick={() => flipCard(card.id)}>
                            <Box className="front">
                              <Typography>{card.front}</Typography>
                            </Box>
                            <Box className="back">
                              <Typography>{card.back}</Typography>
                            </Box>
                          </Flashcard>
                          <Tooltip title="Delete Flashcard">
                            <IconButton
                              sx={{ position: 'absolute', top: 8, right: 8 }}
                              onClick={() => deleteFlashcard(card.id)}
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </StyledCard>
            </Fade>

            {/* Note-Taking Tool */}
            <Fade in={true} timeout={900}>
              <StyledCard sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Note-Taking
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="New Note"
                        multiline
                        rows={4}
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Link to Task</InputLabel>
                        <Select
                          value={noteTask}
                          onChange={(e) => setNoteTask(e.target.value)}
                          label="Link to Task"
                        >
                          <MenuItem value="">None</MenuItem>
                          {tasks?.filter((task) => task?.category === 'Study')?.map((task) => (
                            <MenuItem key={task.id} value={task.id}>{task.text}</MenuItem>
                          )) || []}
                        </Select>
                      </FormControl>
                      <Button
                        variant="contained"
                        startIcon={<NoteIcon />}
                        fullWidth
                        onClick={addNote}
                      >
                        Add Note
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={exportNotes}
                      >
                        Export Notes
                      </Button>
                    </Grid>
                  </Grid>
                  {notes.map((note) => (
                    <Box key={note.id} sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        {note.content}
                      </Typography>
                      {note.taskId && (
                        <Typography variant="caption" color="text.secondary">
                          Linked Task: {tasks?.find((t) => t.id === parseInt(note.taskId))?.text || 'Unknown'}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </CardContent>
              </StyledCard>
            </Fade>

            {/* Resource Links */}
            <Fade in={true} timeout={1000}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Study Resources
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />
                  <Grid container spacing={2}>
                    {filteredResources.map((resource) => (
                      <Grid item xs={12} sm={6} key={resource.name}>
                        <Button
                          variant="outlined"
                          fullWidth
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {resource.name}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </StyledCard>
            </Fade>
          </Box>

          {/* Right Sidebar: Study Insights */}
          <Fade in={true} timeout={300}>
            <SidebarBox sx={{ width: { md: 200 }, ml: { md: 2 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                Study Insights
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Study Time Today</Typography>
                  <Typography variant="h6" sx={{ color: 'primary.main' }}>
                    {studyHoursToday.toFixed(1)}h
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Daily Goal Progress</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={goalProgress}
                    sx={{
                      height: 6,
                      borderRadius: 4,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': { bgcolor: 'secondary.main' },
                    }}
                  />
                  <Typography variant="caption" sx={{ mt: 0.5 }}>
                    {studyHoursToday.toFixed(1)} / {dailyGoal}h
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Recent Tasks</Typography>
                  {tasks?.filter((task) => task?.category === 'Study')
                    ?.slice(-3)
                    ?.map((task) => (
                      <Typography key={task.id} variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                        {task.text}
                      </Typography>
                    )) || <Typography variant="caption">No recent tasks</Typography>}
                </Box>
              </Box>
            </SidebarBox>
          </Fade>
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default StudyTools;
