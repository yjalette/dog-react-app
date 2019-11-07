import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBooking from './AddBooking';
import BookingList from './BookingList';


const Booking = () => {
    const [inputs, setInputs] = useState({
        events: [],
        loading: false
    })

    useEffect(() => {
        axios
            .get('./api/events')
            .then(res => {
                console.log(res)
                setInputs({
                    ...inputs,
                    events: res.data

                })
            })

    }, [])

    const handleDelete = (id) => {
        axios
            .delete(`/api/events/${id}`)
            .then(() => {
                setInputs(inputs => ({
                    events: inputs.events.filter(event => event.id !== id)
                }))
            })
    }
    return (
        <div className="booking">
            <BookingList handleDelete={handleDelete} events={inputs.events}/>
            <hr />
            <AddBooking events={inputs.events} />
        </div>
    )
}

export default Booking
