
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, LinearProgress, Paper } from '@mui/material';
import TaskList from './TaskList';

const StateManagement = () => {
  const [numberArray, setNumberArray] = useState([]);
  const [hPTask, setHPTask] = useState([]); // High Priority Queue
  const [regTask1, setRegTask1] = useState([]); // Regular Task Queue 1
  const [regTask2, setRegTask2] = useState([]); // Regular Task Queue 2
  const [regTask3, setRegTask3] = useState([]); // Regular Task Queue 3

  const [hpProgress, setHPProgress] = useState(0);
  const [rt1Progress, setRT1Progress] = useState(0);
  const [rt2Progress, setRT2Progress] = useState(0);
  const [rt3Progress, setRT3Progress] = useState(0);

  
  const addRandomTask = () => {
    const isPriority = Math.random() * 10 < 2; 
    const randomTask = {
      value: Math.floor(Math.random() * 200), 
      isPriority: isPriority,
    };
    setNumberArray((prevNumArray) => [...prevNumArray, randomTask]);
  };

  
  const admitTask = () => {
    if (numberArray.length !== 0) {
      let num = numberArray.shift();

      if (num.isPriority) {
        setHPTask((prev) => [...prev, num]);
        setHPProgress(num.value);
      } else {
        const lowestQueue = [regTask1, regTask2, regTask3].reduce(
          (acc, cur, idx) => (cur.length < acc.len ? { idx, len: cur.length } : acc),
          { idx: 0, len: Infinity }
        );
        const setQueue = [setRegTask1, setRegTask2, setRegTask3][lowestQueue.idx];
        const setProgress = [setRT1Progress, setRT2Progress, setRT3Progress][lowestQueue.idx];
        setQueue((prev) => [...prev, num]);
        setProgress(num.value);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      admitTask();
    }, 1000);

    return () => clearInterval(interval);
  }, [numberArray]);

  
  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (hpProgress > 0) setHPProgress((prev) => prev - 1);
      if (rt1Progress > 0) setRT1Progress((prev) => prev - 1);
      if (rt2Progress > 0) setRT2Progress((prev) => prev - 1);
      if (rt3Progress > 0) setRT3Progress((prev) => prev - 1);
    }, 100); 

    return () => clearInterval(progressInterval);
  }, [hpProgress, rt1Progress, rt2Progress, rt3Progress]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Button variant="contained" color="primary" onClick={addRandomTask}>
        Add Random Task
      </Button>

      <Typography variant="h4" sx={{ marginTop: '1rem' }}>
        Task Queues with Progress
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: '2rem',
          marginTop: '2rem',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {/* High Priority Queue */}
        <Paper
          elevation={5}
          sx={{
            padding: '1.5rem',
            borderRadius: '10px',
            width: '250px',
            backgroundColor: '#FFEBEE',
            border: '2px solid #f44336',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ color: '#f44336' }}>
            High Priority Queue
          </Typography>
          <TaskList tasks={hPTask} isPriority />
          <LinearProgress
            variant="determinate"
            value={Math.max(hpProgress, 0)}
            sx={{
              height: '10px',
              borderRadius: '5px',
              marginTop: '1rem',
              backgroundColor: '#ffcdd2',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#e53935',
              },
            }}
          />
        </Paper>

        {/* Regular Queue 1 */}
        <Paper
          elevation={5}
          sx={{
            padding: '1.5rem',
            borderRadius: '10px',
            width: '250px',
            backgroundColor: '#E3F2FD',
            border: '2px solid #2196f3',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ color: '#2196f3' }}>
            Regular Queue 1
          </Typography>
          <TaskList tasks={regTask1} />
          <LinearProgress
            variant="determinate"
            value={Math.max(rt1Progress, 0)}
            sx={{
              height: '10px',
              borderRadius: '5px',
              marginTop: '1rem',
              backgroundColor: '#BBDEFB',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#1976D2',
              },
            }}
          />
        </Paper>

        {/* Regular Queue 2 */}
        <Paper
          elevation={5}
          sx={{
            padding: '1.5rem',
            borderRadius: '10px',
            width: '250px',
            backgroundColor: '#E8F5E9',
            border: '2px solid #4CAF50',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ color: '#4CAF50' }}>
            Regular Queue 2
          </Typography>
          <TaskList tasks={regTask2} />
          <LinearProgress
            variant="determinate"
            value={Math.max(rt2Progress, 0)}
            sx={{
              height: '10px',
              borderRadius: '5px',
              marginTop: '1rem',
              backgroundColor: '#C8E6C9',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#388E3C',
              },
            }}
          />
        </Paper>

        {/* Regular Queue 3 */}
        <Paper
          elevation={5}
          sx={{
            padding: '1.5rem',
            borderRadius: '10px',
            width: '250px',
            backgroundColor: '#FFF3E0',
            border: '2px solid #FF9800',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ color: '#FF9800' }}>
            Regular Queue 3
          </Typography>
          <TaskList tasks={regTask3} />
          <LinearProgress
            variant="determinate"
            value={Math.max(rt3Progress, 0)}
            sx={{
              height: '10px',
              borderRadius: '5px',
              marginTop: '1rem',
              backgroundColor: '#FFE0B2',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#F57C00',
              },
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default StateManagement;
