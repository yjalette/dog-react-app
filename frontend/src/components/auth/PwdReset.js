import React, {useState} from 'react';
import axios from 'axios';


const PwdReset = () => {
    const [input, setInput] = useState({email: ""});
    const [IsEmailSent, setIsEmailSent] = useState(false);
    const handleChange = (e) => {
        setInput({        
            [e.target.name]: e.target.value
        })
    } 

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .post(`http://localhost:5000/api/emailEvents/reset`, {...input})
        .then(res => {
            if(res.status === 200){
                localStorage.setItem("tempToken", res.data.token);
                setIsEmailSent(true)
            }
        }).catch(err => console.log(err))
    }
    return (
        <div className="wrapper">
            {!IsEmailSent && <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label>email</label>
                    <input value={input.email} name="email" onChange={handleChange}/>
                </div>
                <button>submit</button>
            </form>}
            {IsEmailSent && <h3>Please check your email. For security reasons the link can only be used for one hour. If you do not receive your email within five minutes check your spam folder.</h3>}
        </div>
    )
}

export default PwdReset;
