import React from 'react';
import adopt_me from '../../images/adopt.png'

const Card = ({ animal }) => {
    const getPic = animal.photos.map(photo => photo.large || photo.medium || photo.small)
    const photo = getPic[0] || getPic[1] || adopt_me;
    return (
        <div className="card">
            <div>
                <img src={photo} alt="Avatar" className="card_img"/>
            </div>
            <p>{animal.breeds.primary}</p>
            <p className="title">{animal.name}</p>
            <button>more info</button>
        </div>
    )
}

export default Card
