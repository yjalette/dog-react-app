import React, { useState, useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom'
// import { withRouter } from 'react-router-dom';

const Login = () => {
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [user, setUser] = useState(false)
    const context = useContext(AuthContext);
    console.log(context)

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
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
            return res.json();  
        }).then(data => {
            console.log(data)
            const { token, user } = data;
            context.setAuth(user);
            Cookies.set('token', token);
            setUser(true)
            // props.history.push('./')
        })
    }
    return (
        <>
        <form className="form sign-in" onSubmit={handleSubmit}>
            <h2>Welcome back,</h2>
            <label>
                <span>Email</span>
                <input type="email" name="email" value={inputs.email} onChange={handleChange} />
            </label>
            <label>
                <span>Password</span>
                <input type="password" name="password" value={inputs.password} onChange={handleChange} />
            </label>
            <p className="forgot-pass">Forgot password?</p>
            <button type="submit" className="submit">Sign In</button>
        </form>
        {user&& <Redirect to="/booking" />}
        </>
    )
}

export default Login
