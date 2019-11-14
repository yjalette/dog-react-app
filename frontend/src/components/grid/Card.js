import React from 'react';
import adopt_me from '../../images/adopt.jpg'

const Card = ({ animal }) => {
    const getPic = animal.photos.map(photo => photo.large || photo.medium || photo.small)
    const photo = getPic[0] || getPic[1] || adopt_me;
    console.log(animal)
    return (
        <div className="card">
            <div>
                <img src={photo} alt="Avatar" className="card_img"/>
            </div>
            <p><i className={animal.gender === 'Female' ? "fa fa-venus" : "fa fa-mars"}></i></p>
            <p className="title">{animal.name}</p>
            <p>{animal.breeds.primary}</p>
            <button>more info</button>
        </div>
    )
}

export default Card
