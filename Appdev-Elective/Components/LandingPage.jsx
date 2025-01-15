// LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="landing-container" 
      style={{ 
        backgroundImage: 'url(https://d2w9rnfcy7mm78.cloudfront.net/20123634/original_603a3a7a1e06dead8c2838f090575ff1.gif?1675116798)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <header className="navbar">
        <h1>IntelliHealth</h1>
        <nav>
          <button onClick={() => navigate('/login')}>Log In</button>
          <button onClick={() => navigate('/signup')} className="register-btn">
            Sign In
          </button>
        </nav>
      </header>

      <main className="hero-section">
        <h2>
          Welcome to IntelliHealth, Your Personalized Health & Fitness Hub!
        </h2>
        <p>
          At IntelliHealth, we aim to provide customized workout plans to help
          you achieve your fitness goals. Whether you’re a beginner just
          starting your journey or a professional athlete, we have something
          tailored just for you!
        </p>
        <p>
          Our goal is to promote sustainable and healthy living by offering
          guidance and workout routines that fit your lifestyle. Join us today
          and embark on a transformative fitness experience!
        </p>
      </main>

      {/* <footer className="footer">
        <p>© 2024 IntelliHealth. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default LandingPage;
