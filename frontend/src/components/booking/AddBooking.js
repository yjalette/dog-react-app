import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from './DatePicker';

const AddBooking = () => {
    const [inputs, setInputs] = useState({ name: "", appt_date: new Date(), appt_time: ""});

    const handleChange = e => {
        setInputs({
            [e.target.name]: e.target.value
        })
    }
    const handleDate = (selectedDate) => {
        console.log(selectedDate)
        setInputs({
            ...inputs,
            date: selectedDate
        })
    }
    const handleSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: inputs.name,
            date: inputs.appt_date
        }

        axios
            .post('./api/items', newItem)
            .then(res => console.log(res))

    }

    return (
        <section className="add-booking">
            <form onSubmit={handleSubmit}  className="col">
                <div className="input-wrapper">
                    <label>name</label>
                    <input name="name" onChange={handleChange} />
                </div>
                <DatePicker handleDate={handleDate} inputs={inputs}/>
                <button type="submit" >add a new event</button>
                <div className="input-wrapper">
                    <label>time</label>
                    <select name="appt_time" onChange={handleChange}>
                        <option>1pm</option>
                        <option>2pm</option>
                        <option>3pm</option>
                        <option>4pm</option>
                    </select>
                </div>
            </form>
            <div className="col">
               <span>Name: {inputs.name}</span>
               {/* <span>Date: {JSON.stringify(inputs.date).slice(1, 11)}</span> */}
               <span>Date: </span>
               <span>Time: </span>
            </div>
        </section>
    )
}

export default AddBooking
