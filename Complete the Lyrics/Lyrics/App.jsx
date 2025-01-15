import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const singerColors = ["#333333", "#555555", "#777777", "#999999"]; 

const Item = styled(Paper)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor || '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  height: 80,
  width: 200,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: '#fff',
  margin: '0 10px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  textDecoration: 'none',
  borderRadius: '8px',
  transition: 'transform 0.2s ease-in-out',
  "&:hover": {
    transform: 'scale(1.1)' 
  }
}));

export default function CompleteTheLyrics() {
  const [selectedSinger, setSelectedSinger] = React.useState(null);
  const [lyrics, setLyrics] = React.useState("");
  const [allLyrics, setAllLyrics] = React.useState([]); 

  const singers = [
    { name: "First Singer", path: "/singer/first", color: singerColors[0] },
    { name: "Second Singer", path: "/singer/second", color: singerColors[1] },
    { name: "Third Singer", path: "/singer/third", color: singerColors[2] },
    { name: "Fourth Singer", path: "/singer/fourth", color: singerColors[3] }
  ];


  React.useEffect(() => {
    setSelectedSinger(singers[0]); 
  }, []);

  // Handle singer button click
  const handleSingerClick = (singer) => {
    if (selectedSinger && lyrics) {
      handleLyricsAutoSubmit();
    }
    setSelectedSinger(singer);
    setLyrics(""); // Clear the input field when switching singers
  };

  // Function to handle auto lyrics submission on singer switch
  const handleLyricsAutoSubmit = () => {
    if (lyrics) {
      setAllLyrics(prev => [
        ...prev,
        { text: lyrics, singer: selectedSinger.name, color: selectedSinger.color }
      ]);
      setLyrics(""); // Clear the input after submitting lyrics
    }
  };

  return (
    <Router>
      {/* Worm animation in the background */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          overflow: 'hidden'
        }}
      >
        <Worms />
      </motion.div>

      <Box sx={{ textAlign: 'center', padding: '20px 0', fontSize: '28px', fontWeight: 'bold', marginLeft: '200px' }}>
        Complete the Lyrics
      </Box>
      
      {/* Animate singer buttons on load */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginLeft: '200px' }}
      >
        <Grid container spacing={1} columns={12} justifyContent="center">
          {singers.map((singer, index) => (
            <Grid item key={index}>
              <Link to={singer.path} style={{ textDecoration: 'none' }} onClick={() => handleSingerClick(singer)}>
                <Item bgcolor={singer.color}>{singer.name}</Item>
              </Link>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <Routes>
        {singers.map((singer) => (
          <Route
            key={singer.path}
            path={singer.path}
            element={<SingerPage singer={singer.name} lyrics={lyrics} setLyrics={setLyrics} selectedSinger={selectedSinger} />}
          />
        ))}
      </Routes>

      {/* Animate lyrics history */}
      <Box sx={{ marginLeft: '200px', paddingTop: '20px' }}>
        <h3>Lyrics History</h3>
        <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2, maxHeight: '200px', overflowY: 'auto' }}>
          {/* Animate lyrics list */}
          {allLyrics.map((lyric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Add moving color animation to each lyric box */}
              <motion.div
                style={{
                  padding: '8px',
                  margin: '4px 0',
                  borderRadius: '4px',
                  color: 'white',
                  backgroundColor: lyric.color
                }}
                animate={{
                  backgroundColor: ["#ff4b4b", "#ff884b", "#ffc14b", "#4bff4b", "#4bc8ff", "#9b4bff", "#ff4bf2"]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "linear"
                }}
              >
                {lyric.text}
              </motion.div>
            </motion.div>
          ))}

          {/* Display current lyrics in real-time */}
          {lyrics && selectedSinger && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                style={{
                  padding: '8px',
                  margin: '4px 0',
                  borderRadius: '4px',
                  color: 'white',
                  backgroundColor: selectedSinger.color
                }}
                animate={{
                  backgroundColor: ["#ff4b4b", "#ff884b", "#ffc14b", "#4bff4b", "#4bc8ff", "#9b4bff", "#ff4bf2"]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "linear"
                }}
              >
                {lyrics}
              </motion.div>
            </motion.div>
          )}
        </Box>
      </Box>
    </Router>
  );
}


const Worm = ({ initialX, initialY }) => {

  const wormSegments = Array.from({ length: 10 }, (_, i) => (
    <motion.div
      key={i}
      style={{
        width: '20px',
        height: '20px',
        backgroundColor: i % 2 === 0 ? 'limegreen' : 'darkgreen',
        borderRadius: '50%',
        position: 'absolute',
        top: `${i * 20}px`,
      }}
      animate={{
        x: ["0%", "100%", "-100%", "0%"],
        y: ["0%", "100%", "-100%", "0%"]
      }}
      transition={{
        repeat: Infinity,
        duration: 10 + i, 
        ease: "easeInOut"
      }}
    />
  ));

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: initialY,
        left: initialX,
        width: '100%',
        height: '100%'
      }}
    >
      {wormSegments}
    </motion.div>
  );
};


const Worms = () => {
 
  const initialPositions = [
    { x: '0%', y: '0%' },
    { x: '50%', y: '10%' },
    { x: '10%', y: '60%' },
    { x: '80%', y: '80%' }
  ];

  return (
    <>
      {initialPositions.map((position, index) => (
        <Worm key={index} initialX={position.x} initialY={position.y} />
      ))}
    </>
  );
};


function SingerPage({ singer, lyrics, setLyrics, selectedSinger }) {
 
  const isVisible = selectedSinger && selectedSinger.name === singer;

  return (
    <Box sx={{ padding: 3, marginLeft: '200px', backgroundColor: 'white', borderRadius: '8px', boxShadow: 1 }}>
      <h2>{singer}</h2>
      {isVisible && (
        <>
          <motion.input
            type="text"
            placeholder="Enter lyrics"
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '5px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#fff'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </>
      )}
    </Box>
  );
}
