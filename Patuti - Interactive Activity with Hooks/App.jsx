import React, { useEffect, useState } from "react";
import area from './images/area.png';
import backGroundImage from './images/background.png';
import bullet_h from './images/bullet_h.png'; // Import horizontal bullet
import bullet_v from './images/bullet_v.png'; // Import vertical bullet
import dock1 from './images/dock-1.png';
import dock2 from './images/dock-2.png';
import dock3 from './images/dock-3.png';
import dock4 from './images/dock-4.png';
import dock5 from './images/dock-5.png';
import idle1 from './images/idle-1.png';
import idle2 from './images/idle-2.png';
import left1 from './images/left-1.png';
import left2 from './images/left-2.png';
import left3 from './images/left-3.png';
import left4 from './images/left-4.png';
import left6 from './images/left-6.png';
import right1 from './images/right-1.png';
import right2 from './images/right-2.png';
import right3 from './images/right-3.png';
import right4 from './images/right-4.png';
import right5 from './images/right-5.png';

const dockAnimation = [dock1, dock2, dock3, dock4, dock5];
const idleAnimation = [idle1, idle2];
const leftAnimation = [left1, left2, left3, left4, left6];
const rightAnimation = [right1, right2, right3, right4, right5];

const Game = () => {
  const areaWidth = 300;
  const areaHeight = 170;

  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 60, y: window.innerHeight / 2 - areaHeight - 120 });
  const [bullets, setBullets] = useState([]);
  const [isJumping, setIsJumping] = useState(false);
  const [isDocking, setIsDocking] = useState(false);
  const [isIdle, setIsIdle] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [health, setHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [direction, setDirection] = useState("right");

  const platformX = window.innerWidth / 2 - areaWidth / 2;
  const platformY = window.innerHeight / 2 - areaHeight / 2;

  const handleKeyDown = (e) => {
    if (gameOver) return;

    switch (e.key) {
      case "ArrowLeft":
        setPosition((prev) => ({ ...prev, x: Math.max(platformX, prev.x - 10) }));
        setIsIdle(false);
        setDirection("left");
        break;
      case "ArrowRight":
        setPosition((prev) => ({ ...prev, x: Math.min(platformX + areaWidth - 120, prev.x + 10) }));
        setIsIdle(false);
        setDirection("right");
        break;
      case "ArrowUp":
        if (!isJumping) {
          setIsJumping(true);
          setIsIdle(false);
        }
        break;
      case "ArrowDown":
        setIsDocking(true);
        setIsIdle(false);
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (e) => {
    if (gameOver) return;

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowRight":
        setIsIdle(true);
        break;
      case "ArrowDown":
        setIsDocking(false);
        setIsIdle(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const jumpInterval = setInterval(() => {
      if (isJumping) {
        setPosition((prev) => {
          if (prev.y > platformY - 150) {
            return { ...prev, y: prev.y - 20 };
          } else {
            setIsJumping(false);
            return prev;
          }
        });
      } else if (position.y < platformY - 120) {
        setPosition((prev) => ({ ...prev, y: prev.y + 20 }));
      }
    }, 25);

    return () => clearInterval(jumpInterval);
  }, [isJumping, position.y]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameOver]);

  useEffect(() => {
    const frameInterval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % 2);
    }, 200);

    return () => clearInterval(frameInterval);
  }, []);

  // Bullet Spawning Logic
  useEffect(() => {
    const spawnBulletInterval = setInterval(() => {
      const randomX = Math.floor(Math.random() * window.innerWidth);
      const randomDirection = Math.random() < 0.5 ? "down" : "horizontal"; // Randomly choose bullet direction

      setBullets((prevBullets) => [
        ...prevBullets,
        {
          x: randomX,
          y: randomDirection === "down" ? 0 : Math.floor(Math.random() * window.innerHeight),
          direction: randomDirection,
        },
      ]);
    }, 1500); // Spawns a bullet every 1500 milliseconds

    return () => clearInterval(spawnBulletInterval);
  }, []);

  // Bullet Movement Logic
  useEffect(() => {
    const moveBulletsInterval = setInterval(() => {
      setBullets((prevBullets) =>
        prevBullets
          .map((bullet) => {
            if (bullet.direction === "down") {
              return { ...bullet, y: bullet.y + 18 }; // Increase downward speed
            } else {
              return { ...bullet, x: bullet.x + 15 }; // Move horizontally to the right faster
            }
          })
          .filter(
            (bullet) =>
              bullet.y < window.innerHeight && bullet.x > 0 && bullet.x < window.innerWidth
          ) // Keep bullets within bounds
      );
    }, 50); // Faster update for smoother movement
  
    return () => clearInterval(moveBulletsInterval);
  }, []);

  // Check for collision with bullets
  useEffect(() => {
    const collisionInterval = setInterval(() => {
      setBullets((prevBullets) => {
        prevBullets.forEach((bullet) => {
          const bulletRect = {
            left: bullet.x,
            right: bullet.x + 30, // Assuming bullet width is 30
            top: bullet.y,
            bottom: bullet.y + 30, // Assuming bullet height is 30
          };
  
          const characterRect = {
            left: position.x,
            right: position.x + 120, // Assuming character width is 120
            top: position.y,
            bottom: position.y + 120, // Assuming character height is 120
          };
  
          const isColliding = !(
            bulletRect.right < characterRect.left ||
            bulletRect.left > characterRect.right ||
            bulletRect.bottom < characterRect.top ||
            bulletRect.top > characterRect.bottom
          );
  
          if (isColliding) {
            setHealth((prevHealth) => {
              const newHealth = prevHealth - 10; // Decrease health by 10
              if (newHealth <= 0) {
                setGameOver(true); // Set game over if health drops to zero
              }
              return newHealth;
            });
          }
        });
  
        // Return all bullets without filtering (keep bullets on screen)
        return prevBullets;
      });
    }, 100); // Check for collisions every 100 milliseconds
  
    return () => clearInterval(collisionInterval);
  }, [bullets, position]);
  const restartGame = () => {
    setPosition({ x: platformX + areaWidth / 2 - 60, y: platformY - 120 });
    setBullets([]);
    setIsJumping(false);
    setIsDocking(false);
    setIsIdle(true);
    setCurrentFrame(0);
    setHealth(100);
    setGameOver(false);
    setDirection("right");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${backGroundImage})`,
        backgroundSize: "cover",
        position: "relative",
      }}
    >
     {gameOver && (
  <div style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    zIndex: 10, // Ensure it's on top
  }}>
    <h1>Game Over</h1>
    <button
      onClick={restartGame}
      style={{
        padding: "10px 20px",
        fontSize: "18px",
        borderRadius: "5px",
        backgroundColor: "#FF4444",
        color: "white",
        border: "none",
        cursor: "pointer",
        marginTop: "10px",
        zIndex: 11, // Ensures button is clickable
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF6666")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF4444")}
    >
      Restart
    </button>
  </div>
)}
      <div style={{
        position: "absolute",
        top: 20,
        left: 20,
        width: "200px",
        height: "30px",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        border: "2px solid white",
      }}>
        <div
          style={{
            width: `${health}%`,
            height: "100%",
            backgroundColor: "green",
          }}
        />
      </div>
      <img
        src={area}
        style={{
          position: "absolute",
          left: `${platformX}px`,
          top: `${platformY}px`,
          width: `${areaWidth}px`,
          height: `${areaHeight}px`,
        }}
        alt="Platform"
      />
      <img
        src={isDocking ? dockAnimation[currentFrame] : idleAnimation[currentFrame]}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "120px",
          height: "120px",
        }}
        alt="Character"
      />
      {bullets.map((bullet, index) => (
        <img
          key={index}
          src={bullet.direction === "down" ? bullet_v : bullet_h}
          style={{
            position: "absolute",
            left: `${bullet.x}px`,
            top: `${bullet.y}px`,
            width: "30px",
            height: "30px",
          }}
          alt="Bullet"
        />
      ))}
    </div>
  );
};

export default Game;
