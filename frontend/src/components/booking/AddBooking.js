import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from './DatePicker';

const AddBooking = ({ items }) => {
    const [inputs, setInputs] = useState({ name: "" })
    const handleChange = e => {
        setInputs({
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: inputs.name
        }

        axios
            .post('./api/items', newItem)
            .then(res => console.log(res))

    }

    return (
        <form onSubmit={handleSubmit} className="booking-form">
            <div className="col">
                <DatePicker />
            </div>
            <div className="col">
                <div className="input-wrapper">
                    <label>name</label>
                    <input name="name" onChange={handleChange} />
                </div>
                <button type="submit" >add a new event</button>
            </div>

        </form>
    )
}

export default AddBooking
