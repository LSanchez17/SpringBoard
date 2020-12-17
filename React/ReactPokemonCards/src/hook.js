/*
*  Custom hook to reduce repetition of two particular functions
*  Flipping a card is used by both PlayingCard & PokemonCard
*  They both use Axios as well, repeatedly.  Abstract that logic to one function call
*/
import {useState} from 'react';
import axios from 'axios';
import uuid from 'uuid';

const useCardFlip = (cardState) => {
    //We assign the state, with whatever is currently being sent(True or False)
    const [cardFaceUp, setCardPosition] = useState(cardState);

    //We then "flip" it, and invert the state to allow a card flip
    const flipMe = () => {
        setCardPosition(cardFaceUp => !cardFaceUp);
    }
    
    //we return the True/False, and the function that flips it, so its a hook!
    return [cardFaceUp,flipMe];
}


const useAxios = (BASE_URL, pokemon = null) => {
    const [cards, setCards] = useState([]);

    if(!pokemon){
        const callCards = async () => {
            const response = await axios.get(BASE_URL);

            setCards(cards => [...cards, { ...response.data, id: uuid() }]);
        }

        return[cards, callCards];
    }

    if(pokemon){
        const addPokemon = async (pokemon) => {
            const response = await axios.get(BASE_URL+pokemon);
            setCards(pokemon => [...pokemon, { ...response.data, id: uuid() }]);
        };

        return[cards, addPokemon];
    }
}


export {useCardFlip, useAxios};