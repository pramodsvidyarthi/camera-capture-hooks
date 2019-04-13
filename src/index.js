import React from "react";
import ReactDOM from "react-dom";

import Scan from "./Scan";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Scan />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
