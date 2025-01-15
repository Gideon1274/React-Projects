import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';  

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Save user credentials to localStorage
    localStorage.setItem('user', JSON.stringify({ name, email, password }));

    // Navigate to ProfileInput after signup
    navigate('/profile'); 
  };

  return (
    <div className="form-container">
      <form className="form-content" onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        <p className="signup-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
