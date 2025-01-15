import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import Player from './components/Player';
import './app.css';

function getRandomCard() {
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13]; 
  const suits = ['hearts', 'clubs', 'spades', 'diamonds'];

  const value = values[Math.floor(Math.random() * values.length)];
  const suit = suits[Math.floor(Math.random() * suits.length)];

  const cardImage = `/Cards/${getCardName(value)}_of_${suit}.png`;
    
  

  return { value, suit, cardImage };
}

function getCardName(value) {
  switch(value) {
    case 11:
      return 'jack';
    case 12:
      return 'queen';
    case 13:
      return 'king';
    default:
      return value.toString();
  }
}

function App() {
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const drawCards = () => {
    const player1Card = getRandomCard();
    const player2Card = getRandomCard();

    setPlayer1Cards([player1Card, ...player1Cards.slice(0, 2)]);
    setPlayer2Cards([player2Card, ...player2Cards.slice(0, 2)]);

    if (player1Card.value > player2Card.value) {
      setPlayer1Score(player1Score + 1);
    } else if (player2Card.value > player1Card.value) {
      setPlayer2Score(player2Score + 1);
    }
  };

  return (
    <div className="App">
      <Typography variant="h4" gutterBottom>Three Cards</Typography>
      <div className="game">
        <div className="player">
          <Typography variant="h6">Player 1</Typography>
          <div className="cards">
            {player1Cards.map((card, index) => (
              <div key={index} className="card">
                <img src={card.cardImage} alt={`${card.value} of ${card.suit}`} style={{ width: '100%', height: '100%' }} />
              </div>
            ))}
          </div>
          <Typography variant="h6">Score: {player1Score}</Typography>
        </div>
        <div className="player">
          <Typography variant="h6">Player 2</Typography>
          <div className="cards">
            {player2Cards.map((card, index) => (
              <div key={index} className="card">
                <img src={card.cardImage} alt={`${card.value} of ${card.suit}`} style={{ width: '100%', height: '100%' }} />
              </div>
            ))}
          </div>
          <Typography variant="h6">Score: {player2Score}</Typography>
        </div>
      </div>
      <button onClick={drawCards}>Draw Cards</button>
    </div>
  );
}

export default App;
