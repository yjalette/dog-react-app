import React from 'react';
import Form from './Form';
import axios from 'axios';

const EditBooking = ({event, onEdit, onEventUpdate}) => {
    const handleUpdate = newEvent => {
        axios
            .put(`api/events/${newEvent._id}`, {
                ...newEvent
            })
            .then(res => console.log(res))
            .then(()=> onEdit(null) )
            .then(()=> console.log("onEvent=====>", newEvent) || onEventUpdate(newEvent))
    }
    return (
                <Form msg="Reschedule Appt" onSubmit={handleUpdate} defaultValues={event}/>
    )
}

export default EditBooking
