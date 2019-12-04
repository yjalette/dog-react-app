import React, { useState, useContext } from 'react'
import Login from './Login';
import SignUp from './SignUp';
import { MsgContext } from '../../contexts/MsgContext';
import bg_image from '../../images/hero_image.jpg'

const bg_style = {
    'backgroundImage': `url(${bg_image})`
}

const Authentication = () => {
    const [signUp, setSignUp] = useState(false);
    const msg_context = useContext(MsgContext);
    return (
        <div className="wrapper">
            <hr />
            <div className="registration">
                <section className="form-wrapper">
                    {signUp ? <SignUp msg_context={msg_context} /> : <Login msg_context={msg_context} />}
                    <div className="switch_btn_wrapper" onClick={() => signUp ? setSignUp(false) : setSignUp(true)}>
                        <p className="regis-link">{!signUp ? "New here? Sign up and book your first appt today!" : "If you already has an account, just sign in. We've missed you!"}</p>
                    </div>
                </section>
                <div className="sub-cont" style={bg_style}></div>
            </div>
        </div>
    )
}

export default Authentication
