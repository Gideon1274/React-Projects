import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import stickmanImage from './happy-man.png'; // Import your stickman image

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [eyesCovered, setEyesCovered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    if (email === 'test@test.com' && password === 'password') {
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  useEffect(() => {
    // When password field is filled, cover the eyes
    if (password) {
      setEyesCovered(true);
    } else {
      setEyesCovered(false);
    }
  }, [password]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // You can animate the stickman following input here
  };

  return (
    <div className="form-container">
      <form className="form-content" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {/* Stickman Container */}
        <div className="stickman-container">
          <img
            src={stickmanImage} // Display the stickman image
            alt="Stickman"
            className="stickman"
            style={{
              transform: `translateX(${email.length * 8}px)`, // Adjust based on the length of the email
              transition: 'transform 0.2s ease-in-out', // Smooth transition for following the email input
            }}
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
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
        <button type="submit">Login</button>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
