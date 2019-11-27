import React, { useState, useContext } from 'react'
import Login from './Login';
import SignUp from './SignUp';
import {MsgContext} from '../../contexts/MsgContext';

const Authentication = () => {
    const [signUp, setSignUp] = useState(false);
    const msg_context = useContext(MsgContext);
    return (
        <div className={!signUp ? "cont" : "cont s--signup"}>
            <Login msg_context={msg_context}/>
            <div className="sub-cont">
                <div className="img">
                    <div className="img__text m--up">
                        <h2>New here?</h2>
                        <p>Sign up and book your first appt today!</p>
                    </div>
                    <div className="img__text m--in">
                        <h2>One of us? </h2>
                        <p>If you already has an account, just sign in. We've missed you!</p>
                    </div>
                    <div className="img__btn" onClick={() => signUp ? setSignUp(false) : setSignUp(true)}>
                        <span className="m--up">Sign Up</span>
                        <span className="m--in" >Sign In</span>
                    </div>
                </div>
                <SignUp msg_context={msg_context}/>
            </div>

        </div>
    )
}

export default Authentication
