import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'
import picture from '../../images/services.png';
import DogWalkingServices from '../../images/DogWalkingServices.jpg';
import DogGroomingServices from '../../images/DogGroomingServices.jpg';
import client_1 from '../../images/client-1.jpeg';
import client_2 from '../../images/client-2.jpeg';
import client_3 from '../../images/client-3.jpeg';

const types = [
    { picture: DogGroomingServices, title: "Grooming", content: "Our goal is to provide your dog with a quality grooming service in a safe and relaxing environment free from cages and drying cabinets – and of course at great prices. We take the best possible care of your dog using top of the range products." },
    { picture: DogWalkingServices, title: "Walking", content: "Why not have your dog walked by a professional trainer? During our walks, We'll be training, stimulating your dog's drive, and most importantly, will focus on making your dog happier and confident! This is all included for the same price as most companies who offer just dog walk. Oh, did we mention your first walk is FREE!" }
]

const clients = [
    { picture: client_1, title: "Lemon", age: 2 },
    { picture: client_2, title: "Rossie", age: 14 },
    { picture: client_3, title: "Max", age: 7 }
]

const Services = ({ history }) => {
    const context = useContext(AuthContext);
    const btn =  <button onClick={() => context.auth ? history.push("/booking") : history.push("/authentication", { msg: "Please Login To Continiue" })}>Make an Appointment</button>

    return (
        <section className=" services wrapper">
            <div className="wrapper-header">
                <div>
                    <img src={picture} alt="img" />
                </div>
                <div>
                    <h1>What We Do</h1>
                    <span>Being animal owner and lover I created Lojzika’s to offer others the service I want my own animals to experience. Each service includes a consultation with the actual groomer that cares for your pet.</span>
                </div>

            </div>
            <div className="services">
                <div id="Web_1920___1">
                    <svg className="Ellipse_1">
                        <ellipse id="Ellipse_1" rx="1156" ry="499.5" cx="1156" cy="499.5"> </ellipse>
                    </svg>

                </div>
                <div className="services_about">
                    <h3>Services</h3>
                    <section className="services-types grid">
                        {types.map(type => (
                            <div className="card" key={type.title}>
                                <div className="card_header">
                                    <div className="card_img_wrapper">
                                        <img src={type.picture} alt="card_img" className="card_img" />
                                    </div>
                                </div>

                                <div className="card_body">
                                    <p className="title">{type.title}</p>
                                    <p className="content">{type.content}</p>
                                    {btn}
                                </div>
                            </div>
                        ))}
                    </section>
                </div>             
                <div className="services_clients services_about">
                    <h3>Happy Clients</h3>
                    <section className="services-types grid">
                        {clients.map(type => (
                            <div className="card" key={type.title}>
                                <div className="card_body">
                                    <p className="title">{type.title}, {type.age} years</p>
                                </div>
                                <div className="card_header">
                                    <div className="card_img_wrapper">
                                        <img src={type.picture} alt="card_img" className="card_img" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
                <div className="services_contact">
                    <h3>Contact me today and get 20% of your first service</h3>
                    {btn}
                </div>
            </div>
        </section>
    )
}

export default withRouter(Services);
