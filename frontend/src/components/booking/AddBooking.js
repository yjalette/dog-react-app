import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from './DatePicker';

const AddBooking = () => {
    const [inputs, setInputs] = useState({ name: "", appt_date: new Date(), appt_time: "", size: "", breed: "" });
    const handleChange = e => {
        const { name, value } = e.target;
        setInputs(inputs => ({
            ...inputs,
            [name]: value
        }));
    }
    const handleDate = (appt_date) => {
        if (appt_date.getDay() === 1 || appt_date.getDay() === 5) {
            alert("this day is busy");
            return
        }

        setInputs(inputs => ({
            ...inputs,
            appt_date
        }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('api/events', inputs)
            .then(res => console.log(res))
    }

    return (
        <section className="add-booking">
            <h3>Book A Grooming</h3>
            <form onSubmit={handleSubmit}>
                <div className="col">
                    <DatePicker handleDate={handleDate} inputs={inputs} />
                </div>
                <div className="col">
                    <div className="input-wrapper">
                        <label>name</label>
                        <input name="name" onChange={handleChange} />
                    </div>
                    <div className="input-wrapper">
                        <label>breed</label>
                        <input name="breed" onChange={handleChange} />
                    </div>
                    <div className="input-wrapper">
                        <label>size</label>
                        <select name="size" onChange={handleChange}>
                            <option value="sm">small</option>
                            <option value="md">medium</option>
                            <option value="lg">large</option>
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <label>time</label>
                        <select name="appt_time" onChange={handleChange}>
                            <option value="10">10 am</option>
                            <option value="11">11 am</option>
                            <option value="12">12 pm</option>
                            <option value="13">1 pm</option>
                            <option value="14">2 pm</option>
                            <option value="15">3 pm</option>
                            <option value="16">4 pm</option>
                            <option value="17">5 pm</option>
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <button type="submit" >submit</button>
                    </div>
                </div>
            </form>
            <div className="">
                <span>Name: {inputs.name}</span>
                <span>Date: {inputs.appt_date.toLocaleDateString()}</span>
                <span>Time: {inputs.appt_time}</span>
            </div>
        </section>
    )
}

export default AddBooking
