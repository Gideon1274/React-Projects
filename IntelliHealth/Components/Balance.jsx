import React from 'react';
import { useNavigate } from 'react-router-dom';

const Balance = () => {
  const navigate = useNavigate();

  const exercises = [
    { name: 'Single Leg Stand', gif: 'https://www.adlsmartcare.co.uk/adlsmartcare/Upload/products/Balancing_on_one_leg_M.gif', description: 'Stand on one leg to improve balance and stability.' },
    { name: 'Heel-to-Toe Walk', gif: 'https://i.pinimg.com/originals/84/66/bd/8466bde73ad1f154cc6fda954f7ba589.gif', description: 'Walk in a straight line by placing one foot directly in front of the other.' },
    { name: 'Tai Chi', gif: 'https://media.tenor.com/ymiXkdxktuQAAAAM/kung-fu-panda.gif', description: 'Slow and controlled movements to improve balance and focus.' },
    { name: 'Balance Board', gif: 'https://content.presentermedia.com/content/animsp/00010000/10011/stick_figure_balance_board_md_nwm_v2.gif', description: 'Use a balance board to engage your core and leg muscles.' },
  ];

  return (
    <div className="balance-container">
      <button className="back-button" onClick={() => navigate('/home2')}>
        &larr; Back to Home
      </button>
      <h2>Balance Exercises</h2>
      <p>Follow these balance exercises to improve stability and coordination!</p>
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
        .balance-container {
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
          padding: 20px;
          text-align: center;
          transition: transform 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 300px; /* Increased width for larger cards */
          height: 380px; /* Increased height for better gif visibility */
        }

        .exercise-card:hover {
          transform: translateY(-5px);
        }

        .gif-container {
          width: 100%;
          height: 200px; /* Set height for GIF container */
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        }

        .gif-container img {
          width: auto;
          max-width: 100%;
          max-height: 100%; /* Ensures the GIF fits properly in the container */
          border-radius: 8px;
          object-fit: contain; /* Ensures the GIF is not stretched */
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

export default Balance;
