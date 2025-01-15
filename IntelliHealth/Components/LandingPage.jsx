import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const gifList = [
    'https://d2w9rnfcy7mm78.cloudfront.net/20123634/original_603a3a7a1e06dead8c2838f090575ff1.gif?1675116798',
    'https://i.makeagif.com/media/10-12-2015/bcPmCt.gif',
    'https://i.makeagif.com/media/10-12-2015/z0QURe.gif',
    'https://i.makeagif.com/media/4-20-2022/hL1t1P.gif'
  ];

  const [currentGif, setCurrentGif] = useState(gifList[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentGif(prevGif => {
        const currentIndex = gifList.indexOf(prevGif);
        const nextIndex = (currentIndex + 1) % gifList.length;
        return gifList[nextIndex];
      });
    }, 7000);

    return () => clearInterval(intervalId);
  }, [gifList]);

  return (
    <div className="landing-container">
      <header className="navbar">
        <h1>IntelliHealth</h1>
        <nav>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/about')}>About</button>
          <button onClick={() => navigate('/contact')}>Contact</button>
          <button onClick={() => navigate('/login')}>Log In</button>
          <button onClick={() => navigate('/signup')} className="register-btn">Sign Up</button>
        </nav>
      </header>

      <main className="hero-section">
        <div className="hero-text">
          <h2>Unlock Your Potential with IntelliHealth</h2>
          <p>Join our community and get access to personalized workout plans, nutrition guides, and more. Whether you're a beginner or a pro, we've got you covered!</p>
          <button className="cta-btn" onClick={() => navigate('/signup')}>Get Started</button>
        </div>
        <div className="hero-image" style={{ backgroundImage: `url(${currentGif})` }}>
          {/* Placeholder for dynamic GIFs */}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
