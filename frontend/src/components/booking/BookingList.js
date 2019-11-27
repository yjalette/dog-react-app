import React from 'react';
import {timeTransformer} from './const';

const BookingList = ({ handleDelete, events, onEdit }) => {
    return (
        <>
            <section className="booking-list">
                <h3>My Bookings</h3>
                <table >
                    <tbody>
                        <tr>
                            <th>service</th>
                            <th>name</th>
                            <th>date</th>
                            <th>time</th>
                            <th>edit</th>
                            <th>cancel</th>
                        </tr>
                        {events && events.map(({ _id, name, appt_date, appt_time, service }) => (
                            <tr key={_id}>
                                <td>{service}</td>
                                <td>{name}</td>
                                <td>{appt_date.slice(0, 10)}</td>
                                <td>{timeTransformer[appt_time]}</td>
                                <td className="tooltip"><span className="tooltiptext">ffff</span><i className="fa fa-edit" onClick={() => onEdit(_id)}></i></td>
                                <td><i className="fa fa-trash" onClick={() => handleDelete(_id)}></i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!events && <span>No appointment is currently scheduled.</span>}
            </section>
        </>
    )
}

export default BookingList
