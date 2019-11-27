import React, { useState } from 'react';
import Form from './Form';
import picture from '../../images/dogphone.png';

const state = { name: '', email: '', subject: '', msg: '' };

const Contact = () => {
    const [inputs, setInputs] = useState(state);
    const [sent, IsSent] = useState(false);

    const handleChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault(e);
        fetch("http://localhost:5000/api/emailEvents/send-message", {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) return res.json()
        }).then(() => {
            IsSent(true);
            setInputs(state)
        })

    }

    return (
        <div className="contact">
            {sent && <span>Thank you for contacting us!</span>}
            <section className="wrapper">
                <div>
                    <img src={picture} alt="picture" />
                </div>
                <Form handleChange={handleChange} handleSubmit={handleSubmit} inputs={inputs} />
            </section>
        </div>
    )
}

export default Contact
