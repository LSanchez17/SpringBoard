import React from 'react';
import './App.css';

const PokeCard = (props) => {
    let imageLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.id}.png`
    // console.log(id,name,type,baseEXP);
    return(
    <div className='PokemonCard'>
        <h3>{props.pokemon.name}</h3>
        <img src={imageLink} />
        <p>Type:{props.pokemon.type}</p>
        <p>EXP: {props.pokemon.base_experience}</p>
    </div>
    )
}

export default PokeCard;