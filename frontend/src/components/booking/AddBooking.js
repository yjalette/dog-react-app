import React, { useContext } from 'react';
import Form from './Form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MsgContext } from '../../contexts/MsgContext';

const AddBooking = ({ onAdd, validateEvent }) => {
    const token = Cookies.get('token');
    const context = useContext(MsgContext);
    // const handleSubmit = newEvent => {
    //     const validation = validateEvent(newEvent);
    //     if (validation) {
    //         context.setMsg({
    //             type: { error: validateEvent(newEvent) }
    //         })
    //     }
    //     else {
    //         axios
    //             .post(`./api/events/${token}`, {
    //                 ...newEvent
    //             })
    //             .then(res => {
    //                 if (typeof onAdd === 'function') onAdd(res.data);
    //                 context.setError("")
    //             })
    //             .catch(err => console.log(err.msg))
    //     }
    // }

    const handleSubmit = async newEvent => {
        const validation = validateEvent(newEvent);

        if (validation) {
            context.setMsg({
                type: { error: validateEvent(newEvent) }
            })
            
            throw "error validation"
        }      
        return axios
                .post(`./api/events/${token}`, {
                    ...newEvent
                })
                .then(res => {
                    if (typeof onAdd === 'function') onAdd(res.data);
                    context.setError("")
                })
                .catch(err => console.log(err.msg))
    }

    return (
        <>
            <Form onSubmit={handleSubmit} msg="Book A Grooming" error={context.msg.type.error} />
        </>
    )
}

export default AddBooking
