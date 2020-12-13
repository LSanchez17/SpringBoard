import React from 'react'

const Card = ({image, value, suit}) => {
    console.log('image', image)
    console.log('value', value)
    console.log('suit', suit);
    return(
        <div>
            <h3>{value} of {suit}</h3>
            <img src={image} alt={value + suit}></img>
        </div>
    )
}

export default Card;