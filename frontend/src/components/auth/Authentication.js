import React, { useState, useContext } from 'react'
import Login from './Login';
import SignUp from './SignUp';
import {ErrorContext} from '../../contexts/ErrorContext';

const Authentication = () => {
    const [signUp, setSignUp] = useState(false);
    const error_context = useContext(ErrorContext);
    return (
        <div className={!signUp ? "cont" : "cont s--signup"}>
            <Login error_context={error_context}/>
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
                <SignUp error_context={error_context}/>
            </div>

        </div>
    )
}

export default Authentication
