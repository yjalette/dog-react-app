import React, { useState, useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { withRouter } from 'react-router-dom'

const SignUp = ({ msg_context, location }) => {
    const [inputs, setInputs] = useState({ firstName: "", lastName: "", email: "", password: "" });

    const context = useContext(AuthContext);

    const msg = location.state && location.state.msg;

    console.log(location)

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        fetch('http://localhost:5000/api/users', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.msg) {
                msg_context.setMsg({
                    type: { error: data.msg }
                })
                throw new Error
            }
            msg_context.setMsg({
                type: { success: "Please confirm your email to complete registration" }
            })
            fetch(`http://localhost:5000/api/emailEvents/confirm-email/${data.token}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res)
                return res.json()
            }).then(data => console.log(data) || context.setAuth(data))
        }).catch(err => console.log(err))
    }

    return (
        <>
            <form className="form sign-up" onSubmit={handleSubmit}>
                <h2>{msg_context.msg.type.success || "Sign up and book your first appt today!"}</h2>
                <h4 className="error">{msg_context.msg.type.error}</h4>
                <div className="input-wrapper">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={inputs.firstName} onChange={handleChange} />
                </div>
                <div className="input-wrapper">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={inputs.lastName} onChange={handleChange} />
                </div>
                <div className="input-wrapper">
                    <label>Email</label>
                    <input type="email" name="email" value={inputs.email} onChange={handleChange} />
                </div>
                <div className="input-wrapper">
                    <label>Password</label>
                    <input type="password" name="password" value={inputs.password} onChange={handleChange} />
                </div>
                <button type="submit" className="submit">Sign Up</button>
            </form>
        </>
    )
}

export default withRouter(SignUp); 
