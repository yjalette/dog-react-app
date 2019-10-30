import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBooking from './AddBooking';

const BookingList = () => {
    const [inputs, setInputs] = useState({
        items: [],
        loading: false
    })

    useEffect(() => {
        axios
            .get('./api/items')
            .then(res => {
                setInputs({
                    ...inputs,
                    items: res.data

                })
            })

    }, [])


    const handleDelete = (id) => {
        setInputs(inputs => ({
            items: inputs.items.filter(item => item.id !== id)
        }))
    }
    return (
        <>
            <AddBooking items={inputs.items} />
            <ul>
                {inputs.items.map(({ _id, name }) => (
                    <li key={_id}>{name}
                        <button onClick={() => handleDelete(_id)}>delete</button>
                    </li>

                ))}

            </ul>
        </>
    )
}

export default BookingList
