import React, { useState } from 'react'

const SignUp = () => {
    const [inputs, setInputs] = useState({ firstName: "", lastName: "", email: "", password: "" });
    const handleChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    return (
        <form className="form sign-up">
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
            <button type="button" className="form-btn">Sign Up</button>
        </form>
    )
}

export default SignUp
