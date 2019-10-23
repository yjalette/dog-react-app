import React, {useState} from 'react'
import Login from './Login'
import SignUp from './SignUp'

const Authentication = () => {
    const [signUp, setSignUp] = useState(false)
    
    return (
        <div className={!signUp ? "cont" : "cont s--signup"}>
             <Login />
            <div className="sub-cont">
                <div className="img">
                    <div className="img__text m--up">
                        <h2>New here?</h2>
                        <p>Sign up and discover great amount of new opportunities!</p>
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
                <SignUp />
            </div>
            
        </div>
    )
}

export default Authentication
