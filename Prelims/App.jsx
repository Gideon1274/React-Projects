// import React, { useState, useRef } from 'react';
// import './App.css';

// const colors = [
//   '#FF0000', // Red
//   '#FFA500', // Orange
//   '#FFFF00', // Yellow
//   '#90EE90', // Light Green
//   '#008000', // Green
//   '#ADD8E6', // Light Blue
//   '#4B0082', // Indigo
//   '#EE82EE', // Violet
//   '#FFC0CB', // Pink
// ];

// function App() {
//   const [clickCounts, setClickCounts] = useState(Array(colors.length).fill(0));
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [rolling, setRolling] = useState(false);
//   const rollIntervalRef = useRef(null);

//   const startRoll = () => {
//     if (!rolling) {
//       setRolling(true);
//       let lastIndex = null;

//       rollIntervalRef.current = setInterval(() => {
//         const randomIndex = Math.floor(Math.random() * colors.length);
//         setActiveIndex(randomIndex);
//         lastIndex = randomIndex;
//       }, 300);

//       setTimeout(() => {
//         stopRoll();
//       }, 3000);
//     }
//   };

//   const stopRoll = () => {
//     if (rolling) {
//       clearInterval(rollIntervalRef.current);
//       setRolling(false);

//       if (activeIndex !== null) {
//         const newCounts = [...clickCounts];
//         newCounts[activeIndex] += 1;
//         setClickCounts(newCounts);
//       }
      
//       setActiveIndex(null);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Color Picker</h1>

//       {/* Counter Display */}
//       <div className="counter-display">
//         {colors.map((color, index) => (
//           <div key={index} className="counter" style={{ backgroundColor: color }}>
//             {clickCounts[index]}
//           </div>
//         ))}
//       </div>

//       {/* Color Grid */}
//       <div className={`grid ${rolling ? 'disabled' : ''}`}>
//         {colors.map((color, index) => (
//           <div
//             key={index}
//             className={`color-tile ${activeIndex === index ? 'active' : ''}`}
//             style={{ backgroundColor: color }}
//           />
//         ))}
//       </div>

//       {/* Start/Stop Roll Button */}
//       <button onClick={rolling ? stopRoll : startRoll} disabled={rolling && activeIndex === null}>
//         {rolling ? 'Stop Roll' : 'Start Roll'}
//       </button>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import './App.css';
import GridWithButton from './components/PreliPrac'; 

function App() {
  return (
    <div className="App">
      <GridWithButton />
    </div>
  );
}

export default App;

