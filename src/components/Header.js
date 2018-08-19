import React from "react";
import "../styles/Header.css";

const header = (props) => {
  return (
    <div className="header">
      <h1>Breaking Bad Memory Game</h1>
      <button className="btn third" onClick={props.restart}>Restart</button>
    </div>
  );
}

export default header;