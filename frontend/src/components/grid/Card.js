import React from 'react';
import adopt_me from '../../images/adopt.jpg';
import {withRouter} from 'react-router-dom';

const icons = {
    dogs: "fas fa-dog",
    children: "fa fa-child",
    cats: "fas fa-cat"
}

const Card = ({ animal, history, handleShowDetails }) => {
    const getPic = animal.photos.map(photo => photo.large || photo.medium || photo.small);
    const photo = getPic.length === 0 ? adopt_me : getPic[0]
    const environment = Object.keys(animal.environment).filter(key => animal.environment[key] === true)

    const handleClick = () => {
        handleShowDetails();
        history.push({pathname: 'adoption-details', state: animal})
    }
    return (
        <>
        <div className="card">
            <div className="card_header">
                <div className="card_left">
                    {environment.map(icon => (
                        <i className={`${icons[icon]} animal-icon`} key={icon}></i>
                    ))}
                </div>
                <div className="card_right">
                    <i className={animal.gender === 'Female' ? "fa fa-venus" : "fa fa-mars"}></i>
                    <i className="fa fa-map-marker">{Math.round(animal.distance)}</i>
                </div>
                <div className="card_img_wrapper">
                    <img src={photo} alt="card_img" className="card_img" />
                </div>
            </div>

            <div className="card_body">
                <p className="title">{animal.name} * {animal.breeds.primary} </p>
                <button onClick={handleClick}>more info</button>
            </div>
        </div>
        </>
    )
}

export default withRouter(Card);
