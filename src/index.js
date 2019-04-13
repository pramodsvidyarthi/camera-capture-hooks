import React from "react";
import ReactDOM from "react-dom";

import Scan from "./Scan";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h6>
        Access camera and capture the screen shot and releated hooks for the
        same
      </h6>
      <Scan />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
