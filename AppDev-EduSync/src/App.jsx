import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';
import ProgressTracker from './components/ProgressTracker'; // Import the new ProgressTracker component
import LandingPage from './components/LandingPage';
import { TaskProvider } from './components/TaskContext'; // Import TaskProvider
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#3b82f6' },
      secondary: { main: '#10b981' },
      background: {
        default: darkMode ? '#0f172a' : '#f1f5f9',
        paper: darkMode ? '#1e293b' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#f1f5f9' : '#1e293b',
        secondary: darkMode ? '#cbd5e1' : '#64748b',
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 800 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      body1: { fontWeight: 400 },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/calendar" element={<Calendar theme={theme} />} />
            <Route path="/todo" element={<TodoList theme={theme} />} />
            <Route path="/progress" element={<ProgressTracker theme={theme} />} />
            <Route path="/" element={<LandingPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          </Routes>
        </Router>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
