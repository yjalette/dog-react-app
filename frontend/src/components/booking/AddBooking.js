import React, { useContext } from 'react';
import Form from './Form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MsgContext } from '../../contexts/MsgContext';
import Alert from '../alerts/Alert';

const AddBooking = ({ onAdd, validateEvent }) => {
    const token = Cookies.get('token');
    const context = useContext(MsgContext);
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
                if (typeof onAdd === 'function') {
                    onAdd(res.data);
                    context.setMsg({
                        ...context.msg,
                        alert: { success: true }
                    })
                }
            })
            .catch(err => console.log(err.msg))
    }
console.log(context)
    return (
        <>
            {context.msg.alert.success && <Alert content="Your event has been added successfully." theme="success"/>}
            <Form onSubmit={handleSubmit} msg="Book A Grooming" error={context.msg.type.error} />
        </>
    )
}

export default AddBooking
