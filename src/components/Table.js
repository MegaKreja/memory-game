import React from "react";
import "../styles/Table.css";
import cardBack from "../styles/images/card-back.jpg";

const table = (props) => {
  const grid = props.grid.map((card, i) => {
    return (
      <div onClick={!card.correct ? () => props.openCard(i): null} key={i} className="card">
        {!card.flipped ? <img src={cardBack} alt="back"/> : <img src={card.img} alt=""/>}
      </div>
    );
  });

  return (
    <div className="grid">
      {grid}
    </div>
  );
}

export default table;