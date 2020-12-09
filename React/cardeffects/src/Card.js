import React from 'react'

const Card = ({image, value, suit}) => {
    return(
        <div>
            <h3>{value} of {suit}</h3>
            <img src={image} alt={value + suit}></img>
        </div>
    )
}

export default Card;