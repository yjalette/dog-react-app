import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import AddBooking from './AddBooking';
import BookingList from './BookingList';
import EditBooking from './EditBooking';
import picture from '../../images/dog-booking.png'

const initialState = {
    events: [],
    loading: true,
    idEditEvent: null
};

const types = {
    FETCH_START: 'FETCH_START'
}

function reducer(state, action) {
    switch (action.type) {
        case types.FETCH_START:
            return {
                ...state,
                loading: true
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                events: action.payload
            }
        case 'ADD':
            return {
                ...state,
                events: [...state.events, action.payload]
            }
        case 'UPDATE':
            return {
                ...state,
                events: state.events.map(event => event._id === action.payload._id ? action.payload : event)
            }
        case 'DELETE':
            return {
                ...state,
                events: state.events.filter(event => event._id !== action.payload)
            }
        case 'SET_ID':
            return {
                ...state,
                idEditEvent: action.payload
            }
        default:
            return state
    }
}

const Booking = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { events, loading, idEditEvent } = state;

    useEffect(() => {
        dispatch({
            type: types.FETCH_START
        })
        axios
            .get('./api/events')
            .then(res => res.data)
            .then(data => {
                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: data
                })

            })

    }, [])

    const handleDelete = id => {
        axios
            .delete(`/api/events/${id}`)
            .then(() => {
                dispatch({
                    type: 'DELETE',
                    payload: id
                })
            })
    }

    const handleEdit = (id) => {
        dispatch({
            type: 'SET_ID',
            payload: id
        })
    }

    const handleAdd = event => {
        dispatch({
            type: 'ADD',
            payload: event
        })
    }

    const onEventUpdate = updatedEvent => {
        dispatch({
            type: 'UPDATE',
            payload: updatedEvent
        })
    }

    const validateEvent = (event) => {
        const missing_input = Object.keys(event).filter(key => key !== "msg" && key !== "size").find(key => event[key] === "")
        return missing_input && `${missing_input} can't be empty`
    }


    return (
        <div className="booking wrapper">
            <div className="wrapper-header">
                <img src={picture} alt="picture" />
                <div>
                    <h1>Booking</h1>
                    <span>Booking regular grooming appointments for your dog doesn't just keep him pretty, it keeps him healthy and happy.</span>
                </div>
            </div>
            <hr />
            {!idEditEvent && <AddBooking onAdd={handleAdd} validateEvent={validateEvent} />}
            <hr />
            <BookingList handleDelete={handleDelete} events={events} onEdit={handleEdit} />
            {idEditEvent && <EditBooking event={events.find(event => event._id === idEditEvent)} onEdit={handleEdit} onEventUpdate={onEventUpdate} />}
        </div>
    )
}

export default Booking;

