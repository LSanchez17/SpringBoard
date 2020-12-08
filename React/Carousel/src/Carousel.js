import React, { useState } from "react";
import "./Carousel.css";
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";
import Card from "./Card";

function Carousel(props) {
  //Initialize a card index,changeIndex for state. Initially at 0;j
  const [cardIdx, setCardIdx] = useState(0);

  //The card comes from an array, which is accessed by the index property
  const card = props.cardData[cardIdx];
  
  //The entire length of the array, useful for not going out of bounds
  const total = props.cardData.length;

  //changes card index plus one
  const goForward = () => {
    if(cardIdx === total - 1){
      return;
    }
    setCardIdx(cardIdx + 1);
  }

  //changes card index by less than one
  const goBackward = () => {
    if(cardIdx === 0){
      return;
    }
    setCardIdx(cardIdx - 1);
  }
  return (
    <div className="Carousel">
      <h1>{props.title}</h1>
      <div className="Carousel-main">
        {
        cardIdx != 0 ? <i className="fas fa-chevron-circle-left fa-2x" 
                          onClick={goBackward}
                          data-testid="left-arrow"/> 
                      : 
                        <i data-testid='no-left-arrow'></i>
        }
        <Card
          caption={card.caption}
          src={card.src}
          currNum={cardIdx + 1}
          totalNum={total}
        />
        {
        cardIdx != total - 1 ? <i className="fas fa-chevron-circle-right fa-2x"
                                  onClick={goForward}
                                  data-testid="right-arrow"/> 
                              : 
                                <i data-testid='no-right-arrow'></i> 
        }
      </div>
    </div>
  );
}

Carousel.defaultProps = {
  cardData: [
    {
      src: image1,
      caption: "Photo by Richard Pasquarella on Unsplash"
    },
    {
      src: image2,
      caption: "Photo by Pratik Patel on Unsplash"
    },
    {
      src: image3,
      caption: "Photo by Josh Post on Unsplash"
    }
  ],
  title: "Shells from far away beaches."
};

export default Carousel;
