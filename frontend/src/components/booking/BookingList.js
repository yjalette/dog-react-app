import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBooking from './AddBooking';

const BookingList = () => {
    const [inputs, setInputs] = useState({
        events: [],
        loading: false
    })

    useEffect(() => {
        axios
            .get('./api/dbEvents')
            .then(res => {
                console.log(res)
                setInputs({
                    ...inputs,
                    events: res.data

                })
            })

    }, [])

    const handleDelete = (id) => {
        console.log("delete id")
        axios
            .delete(`./api/dbEvents/${id}`)
            .then(res => {
                console.log(res)
                setInputs(inputs => ({
                    events: inputs.events.filter(event => event._id !== id)
                }))
            })

        axios
            .delete(`./api/googleEvents/${id}`)
            .then(res => {
                console.log(res)
                setInputs(inputs => ({
                    events: inputs.events.filter(event => event.id !== id)
                }))
            })
    }
    return (
        <>
            <AddBooking events={inputs.events} />
            <ul>
                {inputs.events.map(({ _id, name }) => (
                    <li key={_id}>{name}{_id}
                        <button onClick={() => handleDelete(_id)}>delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default BookingList
