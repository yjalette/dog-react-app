import React from 'react'
import Adoption from './Adoption';
import picture from '../../images/vizla-two.png';

const Adoption_View = () => {
    return (
        <div className="wrapper">
            <div className="wrapper-header">
                <img alt="" className="adopt-hero" src={picture} />
                <div>
                    <h1>Shelter Animal and Save Life </h1>
                    <button>start now</button>
                </div>
            </div>
            <Adoption />
        </div>
    )
}

export default Adoption_View;
