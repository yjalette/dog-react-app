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

    let title = "Welcome back, please login" || msg;

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
            return res.json();
        }).then(data => {
            console.log(data);
            if (data.msg) {
                msg_context.setMsg({
                    type: { error: data.msg }
                })
                throw new Error
            }
            const { token, user } = data;
            user_context.setAuth(user);
            Cookies.set('token', token, { expires: isChecked ? 1000 : 1 })
            props.history.push("/booking");
        })
            .catch(err => console.log("login err", err))
    }
    return (
        <>
            <form className="form sign-in" onSubmit={handleSubmit}>
                <h2>{title}</h2>
                <h4 className="error">{msg_context.msg.type.error}</h4>
                <div className="input-wrapper" >
                    <label>Email</label>
                    <input type="email" name="email" value={inputs.email} onChange={handleChange} />
                </div>
                <div className="input-wrapper" >
                    <label>Password</label>
                    <input type="password" name="password" value={inputs.password} onChange={handleChange} />
                </div>
                <div className="remember-me-wrapper">
                    <label>remember me</label>
                    <input type="checkbox" name="remember" checked={user_context.isChecked} onChange={rememberPwd} />
                </div>
                <div className="input-wrapper" >
                    <Link className="forgot-pwd" to="password-reset">forgot password?</Link>
                </div>
                <div className="input-wrapper" >
                    <button type="submit" className="submit">login</button>
                </div>

            </form>
        </>
    )
}

export default withRouter(Login); 
