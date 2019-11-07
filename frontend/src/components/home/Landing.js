import React from 'react';
import ball from '../../images/ball-pink.png';
import dog from '../../images/happy-dog.png'

const Landing = () => {
    return (
        <div className="homepage">
            <div className="landing">
                <div className="hero_image_section">
                    <img src={dog} className="hero_image" />
                    <img src={ball} className="ball" />
                </div>
                <div className="headline">
                    <h1>Rosica’s grooming is your friendly dog groomer located in Queens, NY.</h1>
                    <button>Make an Appointment</button>
                </div>
            </div>
            {/* <div className="services">
            <h1>What We Do</h1>
                <div id="Web_1920___1">
                    <svg className="Ellipse_1">
                        <ellipse id="Ellipse_1" rx="1156" ry="499.5" cx="1156" cy="499.5">
                        </ellipse>
                    </svg>
                </div>
            </div> */}
        </div>

    )
}

export default Landing
