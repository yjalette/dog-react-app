import React, { useState, useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { MsgContext } from './../../contexts/MsgContext';
import Cookies from 'js-cookie';
import { withRouter, Link } from 'react-router-dom'

const Login = (props) => {
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [isChecked, setIsChecked] = useState(false);

    const user_context = useContext(AuthContext);
    const msg_context = useContext(MsgContext);

    const msg = props.location.state && props.location.state.msg;

    const title = msg || "Welcome back, please login"

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const rememberPwd = () => {
        setIsChecked(true);
    }

    const handleSubmit = e => {
        e.preventDefault();
        fetch('./api/auth', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            if(res.status === 400){
               
                return 
            } 
            return res.json();
        }).then(data => {
            const { token, user } = data;
            user_context.setAuth(user);
            Cookies.set('token', token, { expires: isChecked ? 1000 : 1 })
            props.history.push("/booking");
        }).catch(err => console.log("login err", err))
    }
    return (
        <>
            <form className="form sign-in" onSubmit={handleSubmit}>
                <h2>{title}</h2>
                <h2 className="error"></h2>
                <label>
                    <span>Email</span>
                    <input type="email" name="email" value={inputs.email} onChange={handleChange} />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" name="password" value={inputs.password} onChange={handleChange} />
                </label>
                <label className="remember-me-wrapper">
                    <span>remember me</span>
                    <input type="checkbox" name="remember" checked={user_context.isChecked} onChange={rememberPwd} />
                </label>
                <Link className="forgot-pwd" to="password-reset">Forgot password?</Link>
                <button type="submit" className="submit">Sign In</button>
            </form>
        </>
    )
}

export default withRouter(Login); 
