import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/login" className="custom-link">Login</Link> |{' '}
          <Link to="/register" className="custom-link">Register</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
        </Routes>
      
      </div>
    </Router>
  );
}

export default App;