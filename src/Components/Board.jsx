import { useState } from "react";
import { Square } from "./Square";
import { players } from "../assets/utils/players.js";
import { Turns } from "../assets/utils/turns";
import { WinnerModal } from "./WinnerModal.jsx";
import { MouseFollower } from "./M-follower.jsx";
import { checkWinner } from "../assets/utils/winnerCheck.js";

export const Board = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(42).fill(null);
  });

  const [currentPlayer, setCurrentPlayer] = useState(() => {
    const currentPlayerFromStorage = window.localStorage.getItem("player");
    return currentPlayerFromStorage
      ? currentPlayerFromStorage
      : players.player1;
  });

  const [winner, setWinner] = useState(null);

  const [hoveredColumn, setHoveredColumn] = useState(null);
  const handleColumnHover = (index) => {
    const column = index % 7;
    setHoveredColumn(column);
  };

  const handleColumnLeave = () => {
    setHoveredColumn(null);
  };

  const resetGame = () => {
    setBoard(Array(42).fill(null));
    setCurrentPlayer(players.player1);
    setWinner(null);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("player");
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    // Calculate column from index
    const column = index % 7;

    // Find the lowest empty space in that column
    let lowestEmptyIndex = null;
    for (let row = 5; row >= 0; row--) {
      const currentIndex = row * 7 + column;
      if (!board[currentIndex]) {
        lowestEmptyIndex = currentIndex;
        break;
      }
    }

    // If column is full, return
    if (lowestEmptyIndex === null) return;

    const newBoard = [...board];
    newBoard[lowestEmptyIndex] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }

    const newPlayer =
      currentPlayer === players.player1 ? players.player2 : players.player1;
    setCurrentPlayer(newPlayer);

    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("player", newPlayer);
  };

  return (
    <div className="game">
      <section className="board">
        {board.map((_, index) => {
          return (
            <Square
              key={index}
              updateBoard={updateBoard}
              index={index}
              onHover={handleColumnHover}
              onLeave={handleColumnLeave}
              isHovered={hoveredColumn === index % 7}
            >
              {board[index]}
            </Square>
          );
        })}
        <MouseFollower />
      </section>
      <Turns currentPlayer={currentPlayer} />
      <button className="resetButton" onClick={resetGame} type="">
        Reset Game
      </button>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </div>
  );
};
