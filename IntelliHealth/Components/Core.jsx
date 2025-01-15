import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';  // Import styled-components

// Define styled components (CSS in JS)
const CoreContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;  // Centers the text and the button inside the container
`;

const BackButton = styled.button`
  padding: 5px 10px;  // Reduced padding for smaller button
  width: auto;  // Set width to auto for better fit
  background-color: #007bff;  // Blue color
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;  // Smaller font size
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;  // Darker blue on hover
  }
`;

const ExerciseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const ExerciseCard = styled.div`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const GifContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const ExerciseDescription = styled.p`
  margin-top: 10px;
  color: #555;
`;

const FixedGif = styled.img`
  width: 250px;  // Set fixed width for the GIF
  height: 150px;  // Set fixed height for the GIF
  object-fit: cover;  // Ensures the aspect ratio is preserved and prevents stretching
`;

const Core = () => {
  const navigate = useNavigate();

  const exercises = [
    { name: 'Plank', gif: 'data:image/png;base64,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', description: 'Hold the position to engage your core muscles.' },
    { name: 'Russian Twists', gif: 'https://www.thebestfitnesstrainer.com/webapp/uploads/icons/russian_twist.gif', description: 'Rotate from side to side to work the obliques.' },
    { name: 'Leg Raises', gif: 'https://media2.giphy.com/media/8lu35Dm05CBlGIKAGB/200w.gif?cid=6c09b952nb2yhg82pq0zihkkntfqp5e42716fpcf5qbuh59u&ep=v1_gifs_search&rid=200w.gif&ct=g', description: 'Lift your legs to strengthen your lower abs.' },
    { name: 'Bicycle Crunches', gif: 'https://i.pinimg.com/originals/1b/03/6f/1b036f9aa0fdeaecbac70152faa9d6ca.gif', description: 'Alternate touching your elbows to your knees for an engaging workout.' },
  ];

  return (
    <CoreContainer>
      <BackButton onClick={() => navigate('/home2')}>
        &larr; Back to Home
      </BackButton>
      <h2>Core Exercises</h2>
      <p>Follow these core exercises to strengthen your abdominal and lower back muscles!</p>
      <ExerciseGrid>
        {exercises.map((exercise, index) => (
          <ExerciseCard key={index}>
            <h3>{exercise.name}</h3>
            <GifContainer>
              <FixedGif src={exercise.gif} alt={`${exercise.name} gif`} />
            </GifContainer>
            <ExerciseDescription>{exercise.description}</ExerciseDescription>
          </ExerciseCard>
        ))}
      </ExerciseGrid>
    </CoreContainer>
  );
};

export default Core;
