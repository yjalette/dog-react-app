import React, { useState, useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";

const SignUp = () => {
    const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
    const context = useContext(AuthContext);
    
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
            console.log(res)
            return res.json()
        }).then(data => {
            console.log(data)
            context.setAuth(data)
        })

    }
    return (
        <form className="form sign-up" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label>
                <span>Name</span>
                <input type="text" name="name" value={inputs.firstName} onChange={handleChange} />
            </label>
            <label>
                <span>Email</span>
                <input type="email" name="email" value={inputs.email} onChange={handleChange} />
            </label>
            <label>
                <span>Password</span>
                <input type="password" name="password" value={inputs.password} onChange={handleChange} />
            </label>
            <button type="submit" className="form-btn">Sign Up</button>
        </form>
    )
}

export default SignUp
