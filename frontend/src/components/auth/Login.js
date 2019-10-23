import React, {useState} from 'react';


const Login = () => {
    const [inputs, setInputs] = useState({email: "", password: ""});
    const handleChange = e => {
        const { name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    return (
        <form className="form sign-in">
            <h2>Welcome back,</h2>
            <label>
                <span>Email</span>
                <input type="email" name="email" value={inputs.email} onChange={handleChange}/>
            </label>
            <label>
                <span>Password</span>
                <input type="password" name="password" value={inputs.password} onChange={handleChange}/>
            </label>
            <p className="forgot-pass">Forgot password?</p>
            <button type="button" className="submit">Sign In</button>
        </form>
    )
}

export default Login
