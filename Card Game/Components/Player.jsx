import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

function Player({ cards, score, playerName }) {
  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{playerName}</Typography>
        <Box display="flex" justifyContent="center" gap={1}>
          {cards.map((card, index) => (
            <Box key={index} sx={{ padding: '5px', textAlign: 'center' }}>
              <img src={card.cardImage} alt={`${card.value} of ${card.suit}`} style={{ width: '60px', height: '80px' }} />
            </Box>
          ))}
        </Box>
        <Typography variant="h6" sx={{ marginTop: '10px' }}>Score: {score}</Typography>
      </CardContent>
    </Card>
  );
}

export default Player;
