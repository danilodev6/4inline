import { players } from "./players";
import { Square } from "../../Components/Square";

export const Turns = ({ currentPlayer }) => {
  return (
    <section className="turns">
      <Square isSelected={currentPlayer === players.player1}>
        {players.player1}
      </Square>
      <Square isSelected={currentPlayer === players.player2}>
        {players.player2}
      </Square>
    </section>
  );
};
