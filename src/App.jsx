import "./App.css";
import "./index.css";
import { Board } from "./Components/Board";

function App() {
  return (
    <main>
      <h1>4 in line</h1>
      <section className="game">
        <Board />
      </section>
    </main>
  );
}
export default App;
