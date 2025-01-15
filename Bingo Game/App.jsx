import React, { useState } from 'react';

const BingoApp = () => {
  const [cards, setCards] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [messages, setMessages] = useState([]);
  const [markedCells, setMarkedCells] = useState([]);
  const [gameCode, setGameCode] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [winnerCards, setWinnerCards] = useState([]);
  const [alert, setAlert] = useState('');

  const fetchBingoCard = (code) => {
    fetch(`http://www.hyeumine.com/getcard.php?bcode=${code}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.card) {
          setCards((prevCards) => [...prevCards, data.card]);
          setTokens((prevTokens) => [...prevTokens, data.playcard_token]);
          setMessages((prevMessages) => [...prevMessages, null]);
          setMarkedCells((prevMarked) => [...prevMarked, Array(5).fill().map(() => Array(5).fill(false))]);
          setAlert('');
        } else {
          setAlert('Invalid code. Please check the game code.');
        }
      })
      .catch((error) => {
        setAlert('Error loading card. Try again.');
        console.error('Error fetching Bingo card:', error);
      });
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (gameCode) {
      fetchBingoCard(gameCode);
      setIsPlaying(true);
    }
  };

  const startNewGame = () => {
    setCards([]);
    setTokens([]);
    setMessages([]);
    setMarkedCells([]);
    setGameCode('');
    setIsPlaying(false);
    setGameStarted(false);
    setWinnerCards([]);
    setAlert('');
  };

  const markCell = (cardIndex, row, col) => {
    if (winnerCards.includes(cardIndex)) return;

    setMarkedCells((prevCells) => {
      const updatedCells = [...prevCells];
      updatedCells[cardIndex] = updatedCells[cardIndex].map((r, rowIdx) =>
        rowIdx === row ? r.map((marked, colIdx) => (colIdx === col ? !marked : marked)) : r
      );
      return updatedCells;
    });
  };

  const verifyWin = (index) => {
    const playToken = tokens[index];
    if (!playToken) {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[index] = 'Error: No token found.';
        return updatedMessages;
      });
      return;
    }

    fetch(`http://www.hyeumine.com/checkwin.php?playcard_token=${playToken}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          if (data === 1) {
            updatedMessages[index] = 'You win!';
            setWinnerCards((prevWinners) => [...prevWinners, index]);
          } else {
            updatedMessages[index] = 'Not a winning card.';
          }
          return updatedMessages;
        });
      })
      .catch((error) => console.error('Error verifying win:', error));
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f0f8ff', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: '#0056b3' }}>Play Bingo!</h1>
      <form onSubmit={handleCodeSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={gameCode}
          onChange={(e) => setGameCode(e.target.value)}
          placeholder="Enter Game Code"
          style={{
            padding: '10px',
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '200px',
            fontSize: '16px',
          }}
          disabled={gameStarted}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0056b3',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '16px',
          }}
          disabled={gameStarted}
        >
          Join Game
        </button>
      </form>

      {alert && <p style={{ color: 'red' }}>{alert}</p>}

      {isPlaying && !gameStarted && (
        <button
          onClick={() => setGameStarted(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff9800',
            color: 'black',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '20px',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        >
          Start Playing
        </button>
      )}

      <button
        onClick={() => fetchBingoCard(gameCode)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px',
          borderRadius: '4px',
          fontSize: '16px',
        }}
        disabled={!gameCode || gameStarted}
      >
        Add Another Card
      </button>

      {cards.length > 0 ? (
        cards.map((card, idx) => (
          <div
            key={idx}
            style={{
              margin: '20px',
              textAlign: 'center',
              border: winnerCards.includes(idx) ? '5px solid #4CAF50' : 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#ffffff',
              padding: '20px',
              transition: '0.3s',
            }}
          >
            <h2 style={{ color: '#333' }}>Card #{idx + 1}</h2>
            <p style={{ fontWeight: 'bold' }}><strong>Token:</strong> {tokens[idx]}</p>
            <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['B', 'I', 'N', 'G', 'O'].map((letter) => (
                    <th key={letter} style={{ padding: '10px', border: '1px solid #333', backgroundColor: '#e7e7e7' }}>{letter}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4].map((rowIdx) => (
                  <tr key={rowIdx}>
                    {['B', 'I', 'N', 'G', 'O'].map((col, colIdx) => (
                      <td
                        key={col}
                        onClick={() => markCell(idx, rowIdx, colIdx)}
                        style={{
                          border: '1px solid #333',
                          padding: '10px',
                          width: '50px',
                          height: '50px',
                          backgroundColor: markedCells[idx][rowIdx][colIdx] ? '#ffff00' : '#ffffff',
                          cursor: winnerCards.includes(idx) ? 'not-allowed' : 'pointer',
                          transition: 'background-color 0.2s',
                          fontSize: '18px',
                          fontWeight: markedCells[idx][rowIdx][colIdx] ? 'bold' : 'normal',
                        }}
                      >
                        {card[col][rowIdx]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {!winnerCards.includes(idx) && (
              <button
                onClick={() => verifyWin(idx)}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  backgroundColor: '#0069d9',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontSize: '16px',
                }}
              >
                Check Win
              </button>
            )}
            {messages[idx] && <p style={{ marginTop: '10px' }}>{messages[idx]}</p>}
          </div>
        ))
      ) : (
        <p style={{ fontStyle: 'italic' }}>Enter a game code to load a Bingo card.</p>
      )}

      <button
        onClick={startNewGame}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '4px',
          fontSize: '16px',
        }}
      >
        New Game
      </button>
    </div>
  );
};

export default BingoApp;
