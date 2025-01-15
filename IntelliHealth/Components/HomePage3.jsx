import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage3 = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home2'); // Navigate to HomePage2
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Your Fitness Journey!</h1>
      <p>
        Achieve your goals with personalized workouts, expert nutrition advice, and a supportive community.
      </p>
      <button onClick={handleGetStarted} style={styles.getStartedButton}>Get Started</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: '2rem',
  },
  getStartedButton: {
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#333',
    color: '#FFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default HomePage3;
