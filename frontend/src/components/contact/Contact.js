import React, { useState } from 'react';
import Form from './Form';
import picture_before from '../../images/dogphone.png';
import picture_after from '../../images/dog-on-phone.png';

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
        <div className="contact wrapper">
            <h1>{sent ? "Thank you for contacting us – we will get back to you soon!" : "Contact"}</h1>
            <section className="contact-wrapper wrapper-header">
                <Form handleChange={handleChange} handleSubmit={handleSubmit} inputs={inputs} />
                <div>
                    <img src={sent ? picture_after : picture_before} alt="picture" />
                </div>
            </section>
        </div>
    )
}

export default Contact
