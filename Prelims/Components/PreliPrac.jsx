import React, { useState, useRef } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const colors = [
    '#36454F', // Charcoal Gray
    '#6A5ACD', // Slate Gray
    '#696969', // Dim Gray
    '#483D8B', // Dark Slate Blue
    '#2A3439', // Gunmetal
    '#4682B4', // Steel Blue
    '#6B8E23', // Olive Drab
    '#556B2F', // Dark Olive Green
    '#2F4F4F', // Dark Slate Gray
  ];

const Item = styled(Paper)(({ color }) => ({
  backgroundColor: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 0,
  paddingBottom: '100%',
  borderRadius: '4px',
  overflow: 'hidden',
  border: '3px solid transparent',
}));

export default function GridWithButton() {
  const [clickCounts, setClickCounts] = useState(Array(colors.length).fill(0));
  const [activeIndex, setActiveIndex] = useState(null);
  const [rolling, setRolling] = useState(false);
  const rollIntervalRef = useRef(null);

  const handleColorClick = (index) => {
    if (!rolling) {
      const newCounts = [...clickCounts];
      newCounts[index] += 1;
      setClickCounts(newCounts);
    }
  };

  const startRoll = () => {
    if (!rolling) {
      setRolling(true);
      let lastIndex = null;

      rollIntervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        setActiveIndex(randomIndex);
        lastIndex = randomIndex;
      }, 100);

      setTimeout(() => {
        stopRoll();
      }, 3000);
    }
  };

  const stopRoll = () => {
    if (rolling) {
      clearInterval(rollIntervalRef.current);
      setRolling(false);

      if (activeIndex !== null) {
        const newCounts = [...clickCounts];
        newCounts[activeIndex] += 1;
        setClickCounts(newCounts);
      }
      setActiveIndex(null);
    }
  };

  return (
    <div className="App">
      <center><h1>Prelim Exam: Color Picker</h1></center>
      <div className="counter-display">
        {colors.map((color, index) => (
          <div key={index} className="counter" style={{ backgroundColor: color }}>
            {clickCounts[index]}
          </div>
        ))}
      </div>
      <Grid container spacing={{ xs: 2, md: 6 }} columns={12} sx={{ marginBottom: 2 }}>
        {colors.map((color, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <Item 
              color={color} 
              onClick={() => handleColorClick(index)} 
              style={{ cursor: 'default', border: rolling && index === activeIndex ? '3px solid #fff' : '3px solid transparent' }}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Button 
          variant="outlined" 
          onClick={rolling ? stopRoll : startRoll} 
          disabled={rolling && activeIndex === null}
        >
          {rolling ? 'Stop Roll' : 'Start Roll'}
        </Button>
      </Box>
    </div>
  );
}
