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

    useEffect(() => {
        axios
            .get("./api/googleEvents")
            .then(res => console.log(res))
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('./api/googleEvents', inputs)
            .then(res => console.log(res))
        axios
            .post('./api/dbEvents', inputs)
            .then(res => console.log(res))
    }

    return (
        <section className="add-booking">
            <form onSubmit={handleSubmit}>
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
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                        </select>
                    </div>
                </div>
                <div className="col">
                    <DatePicker handleDate={handleDate} inputs={inputs} />
                </div>
                <button type="submit" >add a new event</button>
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
