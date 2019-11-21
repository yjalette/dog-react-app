import React, {useState} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const EnterNewCred = (props) => {
    const [input, setInput] = useState({password: ""});

    const tempToken = localStorage.getItem('tempToken');

    const handleChange = (e) => {
        setInput({            
            [e.target.name]: e.target.value
        })
    } 

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/users/reset/${tempToken}`, {temp_token: tempToken, password: input.password})
        .then(res => {
            if (res.status === 200){
                localStorage.removeItem('tempToken');
                props.history.push('/authentication')
            } 
        }).catch(err => console.log(err))
    }
    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label>new password</label>
                    <input value={input.password} name="password" onChange={handleChange}/>
                </div>
                <button>submit</button>
            </form>
        </div>
    )
}

export default withRouter(EnterNewCred)
