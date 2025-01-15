import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function MyButton({ handleClick, bgColor }) {
  return (
    <Grid item xs={4} sm={4}>
      <Box 
        sx={{ 
          bgcolor: bgColor, 
          color: 'primary.contrastText', 
          p: 2, // Reduce padding to make the box smaller
          m: 1, 
          height: '50px', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
        onClick={handleClick}
      />
    </Grid>
  );
}
