import React, { useState } from "react";
import "./PokemonCard.css";
import {useCardFlip} from './hook';

/* Renders a single pokemon card. */
function PokemonCard({ front, back, name, stats }) {
  //We get the answer to whether the card is face up, and a way to flip it!
  //We start off with true for the "state", and it changes based on the cardFaceUp
  const [cardFaceUp, flipMe] = useCardFlip(true);
  
  return (
    <div onClick={flipMe} className="PokemonCard Card">
      {cardFaceUp ? (
        <div className="PokemonCard-front">
          <img src={front} alt={`{name} front`} />
          <div>
            <p className="PokemonCard-name">{name}</p>
            <ul className="PokemonCard-stats">
              {stats.map(stat => (
                <li key={stat.name}>
                  <em>{stat.name}</em>: {stat.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="PokemonCard-back">
          <img src={back} alt={`{name} back`} />
        </div>
      )}
    </div>
  );
}

export default PokemonCard;
