import Header from "./Components/Header";
import PathVisualizer from "./Components/PathVisualizer";
import { useState } from "react";

function App() {
  const [grid, setgrid] = useState([]);

  return (
    <div className="App">
      <Header grid={grid} />
      <PathVisualizer grid={grid} setgrid={setgrid} />
    </div>
  );
}

export default App;
