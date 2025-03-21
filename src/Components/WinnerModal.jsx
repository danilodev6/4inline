import { Square } from "./Square";

export const WinnerModal = ({ winner, resetGame }) => {
  const winnerText = winner === "draw" ? "Draw" : "Winner:";

  if (winner === null) return null;
  return (
    <div className="winner">
      <h2>{winnerText}</h2>
      <div>{winner !== "draw" && <Square>{winner}</Square>}</div>
      <button className="resetButton" onClick={resetGame} type="">
        Reset Game
      </button>
    </div>
  );
};
