import React from 'react';

function Card(props) {
    return (
        <img className="Card" src={props.image} alt={props.name}/>
    )
}

export default Card;