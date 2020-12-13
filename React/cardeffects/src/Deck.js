import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Card from './Card';

const Deck = () => {
    //set up deck
    const [deck, setDeck] = useState(null);
    //empty array to store cards
    const [cards, setCard] = useState([]);
    //set up a way to draw cards each second
    const [autoDraw, setAutoDraw] = useState(false);
    const timer = useRef(null);


    useEffect(() => {
        async function drawDeck() {
            //gets new deck from axios request
            let res = await axios.get('https://deckofcardsapi.com/api/deck/new/');
            //set the deck state to the response
            setDeck(res.data);
        }

        //Call the synchrounous function
        drawDeck(); 
        //We depend on setDeck, to redraw a new deck, we'd initialize the deck to null again
        //which then hooks onto useEffect()
    }, [setDeck]);

    useEffect(() => {
        const newCard = async() => {
            let {deck_id} = deck;

            let res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)

            if(res.data.remaining === 0){
                throw new Error('No cards left');
            }

            setCard(cards =>
                [...cards, 
                {image: res.data.cards[0].image,
                 suit: res.data.cards[0].suit,
                 value: res.data.cards[0].value
                }
            ])
        }
        
        if(autoDraw && !timer.current){
            timer.current = setInterval(async () => {
                await newCard();
            }, 1500);
        }

        return () => {
            clearInterval(timer.current);
            timer.current = null;
        }
    }, [autoDraw, setAutoDraw, deck]);

    const activateAutoDraw = () => {
        setAutoDraw(autoDraw => !autoDraw);
    }

    const displayCard = cards.map((card,idx) => {
        return <Card image={card.image} value={card.value} suit={card.suit} key={idx}/>
    });

    return(
        <div>
            <p>Deck Drawing Game</p>
            {deck 
             ?
            <div>
                <p>Deck id: {deck.deck_id}, cards remaining: {deck.remaining}</p>
                <button onClick={activateAutoDraw}>Start drawing cards randomly</button>
            </div>
             :
             <h1>Loading...</h1>
            }
            {cards.length !== 0
                 ?
                 displayCard
                 :
                 <h2>No cards drawn yet</h2>
            }
        </div>
    )
}

export default Deck;