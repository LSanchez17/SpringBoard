import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Card from './Card';

const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [cards, setCard] = useState([]);
    const [drew, setDraw] = useState(false);

    useEffect(() => {
        //assign async function to retrive a new deck
        //Then assign the deck property 
        async function getNewDeck() {
            const res = await axios.get('https://deckofcardsapi.com/api/deck/new/');
            console.log(res.data);
            setDeck(res.data);
        }

        getNewDeck();
    }, [setDeck]);

    useEffect(() => {
        async function drawCard() {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
            
            if(res.data.remaining === 0){
                throw new Error('Out of Cards');
            }

            console.log('Drawn!')
            setCard(cards => [
                ...cards, 
                {
                    image: res.data.cards[0].image,
                    value: res.data.cards[0].value,
                    suit: res.data.cards[0].suit
                }
            ]);
        }
        
        drawCard();

    }, [drew, setDraw]);

    const showCards = cards.map((card, idx) => {
        //Rendering of a card from the list of drawn cards
        return <Card key={idx} image={card.value} suit={card.suit} />
    });

    const drawNewCard = () => {
        //invert state logic and return it as the new state
        setDraw(drew => !drew);
    }

    return(
        <div>
            {
            deck 
            ? 
            <div>
                <p>Your deck is {deck.deck_id}, with {deck.remaining} remaining</p> 
                <button onClick={drawNewCard}>Draw new Card</button>
            </div>
            : 
            <h3>Loading...</h3> 
            }
            <div>{showCards}</div>
        </div>
    )
}

export default Deck;