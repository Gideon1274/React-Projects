import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomePage2.css';
import HomeSidebar from './HomeSidebar';

const HomePage2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const navigate = useNavigate();

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  const handleCardioJoin = () => {
    navigate('/cardio');
  };

  const handleStrengthJoin = () => {
    navigate('/strength');
  };

  const handleCoreJoin = () => {
    navigate('/core');  // Navigate to the Core page when Join is clicked
  };

  const handleFlexJoin = () => {
    navigate('/flexibility');  // Navigate to the Core page when Join is clicked
  };

  const handleBalanceJoin = () => {
    navigate('/balance');  // Navigate to the Core page when Join is clicked
  };
  return (
    <div className="homepage">
      {/* Top Navigation Bar */}
      <header className="top-bar">
        <nav className="navbar">
          <div className="logo"><Link to="/"><img src="logo_url" alt="Logo" className="logo-image" /></Link></div>
          <div className="nav-links"></div>
        </nav>
      </header>

      {/* Main content and sidebar wrapper */}
      <div className="content-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="profile-section"></div>
          <div className="features-list">
            <Link to="/hs"><p>Home</p></Link>
            <p onClick={() => openModal('Goal')}>Goal</p>
            <p onClick={() => openModal('Progress')}>Progress</p>
            <Link to="/home2"><p>Exercise</p></Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <h2>Type of ExerRice</h2>
          <div className="workout-plan">
            <div className="workout-item">
              <h3>Cardio</h3>
              <p>Difficulty Level</p>
              <p>Details about the workout plan.</p>
              <button className="join-button" onClick={handleCardioJoin}>Join</button>
            </div>
            <div className="workout-item">
              <h3>Strength</h3>
              <p>Difficulty Level</p>
              <p>Details about the workout plan.</p>
              <button className="join-button" onClick={handleStrengthJoin}>Join</button>
            </div>
            <div className="workout-item">
              <h3>Flexibility</h3>
              <p>Difficulty Level</p>
              <p>Details about the workout plan.</p>
              <button className="join-button" onClick={handleFlexJoin}>Join</button>
            </div>
            <div className="workout-item">
              <h3>Core</h3>
              <p>Difficulty Level</p>
              <p>Details about the workout plan.</p>
              <button className="join-button" onClick={handleCoreJoin}>Join</button>
            </div>
            <div className="workout-item">
              <h3>Balance</h3>
              <p>Difficulty Level</p>
              <p>Details about the workout plan.</p>
              <button className="join-button" onClick={handleBalanceJoin}>Join</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals for Goal and Progress */}
    </div>
  );
};

export default HomePage2;
