import React from 'react';
import adopt_me from '../../images/adopt.png'

const Card = ({ animal }) => {
    const getPic = animal.photos.map(photo => photo.small)
    console.log(animal)
    const photo = getPic[0] || adopt_me;
    return (
        <div className="card">
            <img src={photo} alt="Avatar" className="card_img" />
            <p>{animal.breeds.primary}</p>
            <p className="title">{animal.name}</p>
            <p><button>more info</button></p>
        </div>
    )
}

export default Card
