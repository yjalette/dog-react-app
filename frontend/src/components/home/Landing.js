import React, { useContext } from 'react';
import ball from '../../images/ball-pink.png';
import dog from '../../images/happy-dog.png';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'

const Landing = ({ history }) => {
    const context = useContext(AuthContext);
    return (
        <div className="homepage">
            <div className="landing">
                <div className="hero_image_section">
                    <img src={dog} className="hero_image" alt="heroimage" />
                    <img src={ball} className="ball" alt="ball" />
                </div>
                <div className="headline">
                    <h1>Lojzika grooming is your friendly dog groomer located in Queens, NY.</h1>
                    <button onClick={() => context.auth ? history.push("/booking") : history.push("/authentication", { msg: "Please Login To Continiue" })}>Make an Appointment</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Landing)
