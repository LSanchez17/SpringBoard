import React, { useState } from "react";
import backOfCard from "./back.png";
import "./PlayingCard.css"
import {useCardFlip} from './hook';

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {
  //We get the answer to whether the card is face up, and a way to flip it!
  //We start off with true for the "state", and it changes based on the cardFaceUp
  const [cardFaceUp, flipMe] = useCardFlip(true);
  
  return (
    <img
      src={cardFaceUp ? front : back}
      alt="playing card"
      onClick={flipMe}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;
