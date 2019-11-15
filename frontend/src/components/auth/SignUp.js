import React, { useState, useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";

const SignUp = ({msg, setMsg}) => {
    const [inputs, setInputs] = useState({ firstName: "", lastName: "", email: "", password: "" });

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
            if (res.status === 200) {
                return res.json();
            } else {
                setMsg("User already exits")
                throw new Error("User already exits")
            }
        }).then(data => {
            console.log(data)
            setMsg("Please confirm your email to complete registration")
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
                <h2>Sign Up</h2>
                <label>
                    <span>First Name</span>
                    <input type="text" name="firstName" value={inputs.firstName} onChange={handleChange} />
                </label>
                <label>
                    <span>Last Name</span>
                    <input type="text" name="lastName" value={inputs.lastName} onChange={handleChange} />
                </label>
                <label>
                    <span>Email</span>
                    <input type="email" name="email" value={inputs.email} onChange={handleChange} />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" name="password" value={inputs.password} onChange={handleChange} />
                </label>
                <button type="submit" className="submit">Sign Up</button>
            </form>
        </>
    )
}

export default SignUp
