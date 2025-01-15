import { Container, Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import MyStack from '../Components/Stack';
import MyButton from '../Components/MyButtons';

const colors = [
  '#FF5733', 
  '#33FFBD', 
  '#FFC300', 
  '#DAF7A6', 
  '#FF33FF', 
  '#33B5FF', 
  '#FF5733', 
  '#33FFBD', 
  '#FFC300', 
  '#DAF7A6', 
  '#FF33FF', 
  '#33B5FF', 
  '#FF8C00', 
  '#00CED1', 
  '#6A5ACD', 
  '#FF4500', 
  '#8A2BE2', 
  '#7FFF00', 
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const ColorGame = () => {
  const [sequence, setSequence] = useState(shuffleArray(colors).slice(0, 9)); 
  const [revealedColors, setRevealedColors] = useState(Array(9).fill('grey.200'));
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index) => {
    const newRevealedColors = [...revealedColors];
    const correctColor = sequence[currentIndex];

    
    newRevealedColors[index] = sequence[index]; 

    if (correctColor === newRevealedColors[index]) {
      
      setCurrentIndex(currentIndex + 1);

      
      if (currentIndex + 1 === sequence.length) {
        // Game complete logic (if needed)
      }
    } else {
      // Incorrect guess, cover all buttons again
      setCurrentIndex(0);
      setTimeout(() => {
        setRevealedColors(Array(9).fill('grey.200'));
      }, 500); // Delay for covering buttons again to give feedback
    }

    setRevealedColors(newRevealedColors);
  };

  return (
    <Container
      maxWidth='sm' // Reduce the size of the game container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{ flexWrap: 'wrap', justifyContent: 'center', marginBottom: 2 }}
      >
        {sequence.map((color, index) => (
          <MyStack key={index} bg={color} />
        ))}
      </Stack>
      <Grid container spacing={1}>
        {revealedColors.map((color, index) => (
          <MyButton 
            key={index} 
            handleClick={() => handleClick(index)} 
            bgColor={color || 'grey.200'} // Default to light gray if not revealed
          />
        ))}
      </Grid>
    </Container>
  );
};

export default ColorGame;
