// Cardio.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cardio.css';

const Cardio = () => {
  const navigate = useNavigate();

  const exercises = [
    { name: 'Jogging', gif: 'https://cdn.pixabay.com/animation/2023/07/01/15/20/15-20-44-805_512.gif', description: 'A steady jog to improve cardiovascular health.' },
    { name: 'Walking', gif: 'https://i.pinimg.com/originals/9e/3d/33/9e3d33d5b3f3829d01e12f77bce789e1.gif', description: 'A brisk walk for active recovery and heart health.' },
    { name: 'Cycling', gif: 'https://i.pinimg.com/originals/24/ae/8d/24ae8def288851503cf68340df174963.gif', description: 'Cycling to enhance endurance and leg strength.' },
    { name: 'Swimming', gif: 'https://i.pinimg.com/originals/1f/37/7a/1f377a713044a0a3ff47410b5fe07561.gif', description: 'Full-body exercise that increases stamina and strength.' },
  ];

  return (
    <div className="cardio-container">
      <button className="back-button" onClick={() => navigate('/home2')}>
        &larr; Back to Home
      </button>
      <h2>Cardio Exercises</h2>
      <p>Follow these cardio exercises to improve your endurance and stamina!</p>
      <div className="exercise-grid">
        {exercises.map((exercise, index) => (
          <div key={index} className="exercise-card">
            <h3>{exercise.name}</h3>
            <div className="gif-container">
              <img src={exercise.gif} alt={`${exercise.name} gif`} />
            </div>
            <p>{exercise.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cardio;
