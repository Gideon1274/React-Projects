import React from 'react';
import { useNavigate } from 'react-router-dom';

const Flexibility = () => {
  const navigate = useNavigate();

  const exercises = [
    { name: 'Yoga', gif: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/59b7c198206659.5ed6f840b25bd.gif', description: 'A set of poses to enhance flexibility.' },
    { name: 'Stretching', gif: 'https://i.pinimg.com/originals/b5/af/30/b5af309e14ac9ae12d34e056520eff2a.gif', description: 'Stretching exercises to improve muscle elasticity.' },
    { name: 'Pilates', gif: 'https://media3.giphy.com/media/zMBf4OJl9s2dZSFGmK/source.gif', description: 'Pilates moves to enhance flexibility and strength.' },
    { name: 'Dance', gif: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/bd57ba113225101.602392663a5dc.gif', description: 'Dance moves to improve flexibility and coordination.' },
  ];

  return (
    <div className="cardio-container">
      <button className="back-button" onClick={() => navigate('/home2')}>
        &larr; Back to Home
      </button>
      <h2>Flexibility Exercises</h2>
      <p>Follow these flexibility exercises to improve mobility and reduce injury!</p>
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

export default Flexibility;
