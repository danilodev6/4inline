export const players = {
  player1: "×",
  player2: "○",
};

export function checkWinner(boardToCheck) {
  // Function to check line given a starting point and direction
  function checkLine(start, increment) {
    const symbol = boardToCheck[start];
    if (!symbol) return null;

    for (let i = 1; i < 4; i++) {
      const position = start + increment * i;
      // Check if we're still in the same row for horizontal checks
      if (
        increment === 1 &&
        Math.floor(start / 7) !== Math.floor(position / 7)
      ) {
        return null;
      }
      if (position < 0 || position >= 42 || boardToCheck[position] !== symbol) {
        return null;
      }
    }
    return symbol === players.player1 ? players.player1 : players.player2;
  }

  // Check horizontal, vertical, and both diagonals
  for (let pos = 0; pos < 42; pos++) {
    // Check horizontal (→)
    if (pos % 7 < 4) {
      const horizontal = checkLine(pos, 1);
      if (horizontal) return horizontal;
    }

    // Check vertical (↓)
    if (pos < 21) {
      const vertical = checkLine(pos, 7);
      if (vertical) return vertical;
    }

    // Check diagonal (↘)
    if (pos % 7 < 4 && pos < 21) {
      const diagonal1 = checkLine(pos, 8);
      if (diagonal1) return diagonal1;
    }

    // Check diagonal (↗)
    if (pos % 7 < 4 && pos >= 21) {
      const diagonal2 = checkLine(pos, -6);
      if (diagonal2) return diagonal2;
    }
  }

  // Check for draw
  if (boardToCheck.every((cell) => cell !== null)) {
    return "draw";
  }

  return null;
}
