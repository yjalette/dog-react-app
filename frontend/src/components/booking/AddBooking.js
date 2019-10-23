import React, { useState } from 'react';
import axios from 'axios';

const AddBooking = ({items}) => {
    const [inputs, setInputs] = useState({name: ""})
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
        <form onSubmit={handleSubmit}>
            <input name="name" onChange={handleChange} />
            <button type="submit" >add a new event</button>
        </form>
    )
}

export default AddBooking
