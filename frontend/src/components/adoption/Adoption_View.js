import React from 'react'
import Adoption from './Adoption';
import picture from '../../images/vizla-two.png';

const Adoption_View = () => {
    return (
        <div className="wrapper">
            <div className="wrapper-header">
                <img alt="adoption-heroimage" className="adoption-heroimage" src={picture} />
                <div>
                    <h1>Shelter Animal and Save Life </h1>
                    <span>Adopt a homeless puppy and provide a second chance for a deserving animal to know love. Help Save Lives. </span>
                </div>
            </div>
            <Adoption />
        </div>
    )
}

export default Adoption_View;
