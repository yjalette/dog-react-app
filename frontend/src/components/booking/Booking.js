import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBooking from './AddBooking';
import BookingList from './BookingList';
import EditBooking from './EditBooking';
import picture from '../../images/dog-3.jpg'

const Booking = () => {
    const [idEditEvent, setIdEditEvent] = useState(null)

    const [inputs, setInputs] = useState({
        events: [],
        loading: false
    })

    useEffect(() => {
        axios
            .get('./api/events')
            .then(res => res.data)
            .then(data => {
                if (data.length === 0) {
                    return setInputs({
                        msg: "No appointment is currently scheduled."
                    })
                }
                else {
                    setInputs(inputs => ({
                        ...inputs,
                        events: data
                    }))
                }
            })

    }, [])

    const handleDelete = id => {
        axios
            .delete(`/api/events/${id}`)
            .then(() => {
                setInputs(inputs => ({
                    ...inputs,
                    events: inputs.events.filter(event => event._id !== id)
                }))
            })
    }

    const handleEdit = (id) => {
        setIdEditEvent(id);
    }

    const handleAdd = event => {
        setInputs(inputs => ({
            ...inputs,
            events: [event]
        }));
    }

    const onEventUpdate = updatedEvent => {
        setInputs(inputs => ({
            ...inputs,
            events: inputs.events.map(event => event._id === updatedEvent._id ? updatedEvent : event)
        }))
    }

    const validateEvent = (event) => {
        const missing_input = Object.keys(event).filter(key => key !== "msg" || key !== "size").find(key => event[key] === "")
        return missing_input && `${missing_input} can't be empty`
    }
    

    return (
        <div className="booking">
            <div className="header">
                <img src={picture} alt="picture" />
                <h1>Book Your Grooming Today</h1>
            </div>
            <hr />
            <BookingList handleDelete={handleDelete} setEditMode={setIdEditEvent} events={inputs.events} onEdit={handleEdit} />
            {idEditEvent && <EditBooking event={inputs.events.find(event => event._id === idEditEvent)} onEdit={handleEdit} onEventUpdate={onEventUpdate} />}
            <hr />
            {!idEditEvent && <AddBooking onAdd={handleAdd} validateEvent={validateEvent}/>}
        </div>
    )
}

export default Booking;

