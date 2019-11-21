import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AddBooking from './AddBooking';
import BookingList from './BookingList';
import { AuthContext } from "../../contexts/AuthContext";
import EditBooking from './EditBooking';

const Booking = () => {
    const context = useContext(AuthContext);
    const [idEditEvent, setIdEditEvent] = useState(null)

    const [inputs, setInputs] = useState({
        events: [],
        msg: "",
        loading: false
    })

    useEffect(() => {
        axios
            .get('./api/events')
            .then(res => res.data.filter(event => event.user_id === context.auth.id))
            .then(data => {
                if (data.length === 0) {
                    return setInputs({
                        ...inputs,
                        msg: "No appointment is currently scheduled."
                    })
                }
                else {
                    setInputs({
                        ...inputs,
                        events: data
                    })
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

    const onEventUpdate = updatedEvent => {
        console.log(updatedEvent)
        setInputs(inputs => ({
            ...inputs,
            events: inputs.events.map(event => event._id === updatedEvent._id ? updatedEvent : event)
        }))
    }

    return (
        <div className="booking">
            <BookingList handleDelete={handleDelete} setEditMode={setIdEditEvent} events={inputs.events} onEdit={handleEdit}/>      
            {idEditEvent && <EditBooking event={inputs.events.find(event => event._id === idEditEvent)} onEdit={handleEdit} onEventUpdate={onEventUpdate}/>}
            <span>{inputs.msg}</span>
            <hr />
            {!idEditEvent && <AddBooking />}
        </div>
    )
}

export default Booking
