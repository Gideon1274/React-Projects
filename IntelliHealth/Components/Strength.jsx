import React from 'react';
import { useNavigate } from 'react-router-dom';

const Strength = () => {
  const navigate = useNavigate();

  const exercises = [
    { name: 'Push-Ups', gif: 'https://i.pinimg.com/originals/7e/51/8f/7e518fbecfdebefe167b7d222a692efd.gif', description: 'Classic push-up to build upper body strength.' },
    { name: 'Jump-Squats', gif: 'https://i.pinimg.com/originals/11/1c/70/111c70fced6c03e58d305b13658a2751.gif', description: 'Squats to strengthen legs and core.' },
    { name: 'Deadlifts', gif: 'https://i.pinimg.com/originals/29/cd/2e/29cd2ecb6abb91923413b1e68b195347.gif', description: 'Deadlifts for overall body strength.' },
    { name: 'Bench Press', gif: 'https://i.pinimg.com/originals/44/96/dd/4496dd7bcca41328bdc88aca13f848c8.gif', description: 'Bench press to build chest and arm muscles.' },
  ];

  return (
    <div className="cardio-container">
      <button className="back-button" onClick={() => navigate('/home2')}>
        &larr; Back to Home
      </button>
      <h2>Strength Exercises</h2>
      <p>Follow these strength exercises to build power and muscle!</p>
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

      <style jsx>{`
        .cardio-container {
          text-align: center;
          padding: 20px;
          color: #2b2d42;
        }

        h2 {
          color: #008080;
        }

        .exercise-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }

        .exercise-card {
          background-color: #f0f0f0;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          padding: 15px;
          text-align: center;
          transition: transform 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 250px; /* Set a fixed width for the cards */
        }

        .exercise-card:hover {
          transform: translateY(-5px);
        }

        .gif-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        }

        .gif-container img {
          width: 100%;
          max-height: 150px;
          border-radius: 8px;
          object-fit: cover;
        }

        h3 {
          color: #007acc;
        }

        p {
          color: #555;
        }

        .back-button {
          background-color: #007acc;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 20px;
          font-size: 16px;
          transition: background-color 0.3s;
        }

        .back-button:hover {
          background-color: #005fa3;
        }
      `}</style>
    </div>
  );
};

export default Strength;
