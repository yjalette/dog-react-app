import React from 'react';
import Form from './Form';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddBooking = ({ onAdd, validateEvent }) => {
    const token = Cookies.get('token');
    const handleSubmit = newEvent => {
        validateEvent(newEvent);
        axios
            .post(`./api/events/${token}`, {
                ...newEvent
            })
            .then(res => {
                if (typeof onAdd === 'function') onAdd(res.data);
            })
            .catch(err => console.log(err.msg))
    }
    return (
        <Form onSubmit={handleSubmit} msg="Book A Grooming" />
    )
}

export default AddBooking
