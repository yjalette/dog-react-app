import React, { useState } from 'react'

const icons = {
    dogs: "fas fa-dog",
    children: "fa fa-child",
    cats: "fas fa-cat"
}

const Details = (props) => {
    const animal = props.location.state;
    console.log(animal)
    const [slide, setSlide] = useState(0);
    const currSlide = animal.photos.find((photo, index) => index === slide.index);
    const environment = Object.keys(animal.environment).filter(key => animal.environment[key] === true)

    const handleIncrement = () => {
        setSlide((index) => index === animal.photos.length - 1 ? 0 : index + 1)
    }

    const handleDecrement = () => {
        setSlide((index) => index === 0 ? animal.photos.length - 1 : index - 1)
    }

    return (
        <>
            <div className="wrapper adoption-wrapper">
                <div className="adoption_details">
                    <section className="about-dog">
                        <div className="input-wrapper">
                            <label>name:</label>
                            <span>{animal.name}</span>
                        </div>
                        <div className="input-wrapper">
                            <label>gender:</label>
                            <span>{animal.gender}</span>
                        </div>
                        <div className="input-wrapper">
                            <label>size:</label>
                            <span>{animal.size}</span>
                        </div>
                        <div className="input-wrapper">
                            <label>breed:</label>
                            <span>{animal.breeds.primary}</span>
                        </div>
                        <div className="input-wrapper">
                            <label>coat:</label>
                            <span>{animal.coat}</span>
                        </div>
                        <div className="input-wrapper">
                            <label>age:</label>
                            <span>{animal.age}</span>
                        </div>
                        <div className="input-wrapper">
                            <label>coat:</label>
                            <span>{animal.coat}</span>
                        </div>
                        <div className="input-wrapper environment_wrapper">
                            <label>environment:</label>
                            {environment.map(option => (
                                <i className={icons[option]} key={option}>&nbsp;</i>
                            ))}
                        </div>
                        <div className="input-wrapper">
                            <label>email:</label>
                            <span>{animal.contact.email}</span>
                        </div>
                        <div className="input-wrapper">
                            <label>phone:</label>
                            <span>{animal.contact.phone}</span>
                        </div>
                        <div className="input-wrapper ">
                            <label>address:</label>
                            {Object.keys(animal.contact.address).map(key => (
                                <span key={key}>{animal.contact.address[key]}&nbsp; </span>
                            ))}

                        </div>
                    </section>
                    <section className="dog-slider">
                        <img src={animal.photos[slide].large} alt="photo" />
                        <div className="prev-next-btn-wrapper">
                            <i className='fas fa-chevron-circle-left' onClick={handleDecrement}></i>
                            <p>{animal.photos.length}&nbsp;{animal.photos.length === 1 ? "photo" : "photos"}</p>
                            <i className='fas fa-chevron-circle-right' onClick={handleIncrement}></i>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Details
