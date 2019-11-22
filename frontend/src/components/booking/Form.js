import React, { useState, useEffect } from 'react';
import DatePicker from './DatePicker';


const Form = ({ onSubmit, defaultValues, error }) => {
    const [newEvent, setNewEvent] = useState({service: "", name: "",  size: "", breed: "", appt_date: new Date(), appt_time: "", msg: "" });

    useEffect(() => {
        if (defaultValues) {
            setNewEvent(defaultValues);
        }

    }, [defaultValues])

    const handleDate = (appt_date) => {
        setNewEvent(newEvent => ({
            ...newEvent,
            appt_date
        }));
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setNewEvent(newEvent => ({
            ...newEvent,
            [name]: value
        }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(newEvent);
    }

    console.log(error)

    return (
        <section className="add-booking">
            <h3>Add A New Booking</h3>
            <h4 className="error">{error}</h4>
            <form onSubmit={handleSubmit}>   
                <div className="col">
                    <DatePicker handleDate={handleDate} eventDate={new Date(newEvent.appt_date)} />
                </div>
                <div className="col">
                <div className="input-wrapper">
                        <label>service*</label>
                        <select name="service" value={newEvent.service || ""} onChange={handleChange}>
                            <option value=""></option>
                            <option value="grooming">grooming</option>
                            <option value="walking">walking</option>
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <label>name*</label>
                        <input value={newEvent.name} name="name" onChange={handleChange} />
                    </div>
                    <div className="input-wrapper">
                        <label>breed*</label>
                        <input value={newEvent.breed || ""} name="breed" onChange={handleChange} />
                    </div>
                    <div className="input-wrapper">
                        <label>size</label>
                        <select name="size" value={newEvent.size || ""} onChange={handleChange}>
                            <option value=""></option>
                            <option value="sm">small</option>
                            <option value="md">medium</option>
                            <option value="lg">large</option>
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <label>time*</label>
                        <select name="appt_time" value={newEvent.appt_time || ""} onChange={handleChange}>
                            <option value=""></option>
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
                        <label>additional information</label>
                        <textarea rows="5" value={newEvent.msg || ""} name="msg" onChange={handleChange}/>
                    </div>
                    <div className="input-wrapper">
                        <button type="submit" >submit</button>
                    </div>
                </div>
            </form>
            {/* <div className="">
                <span>Name: {newEvent.name}</span>
                <span>Date: {newEvent.appt_date.toLocaleDateString()}</span>
                <span>Time: {newEvent.appt_time}</span>
            </div> */}
        </section>
    )
}

export default Form
