import React from 'react';

const BookingList = ({handleDelete, events}) => {
    return (
        <>
        <h3>My Bookings</h3>
            <table className="booking-list">
            <tbody>
                <tr>
                    <th>name</th>
                    <th>date</th>
                    <th>time</th>
                    <th>cancel</th>
                </tr>
                {events.map(({ _id, name, appt_date, appt_time}) => (
                    <tr key={_id}>
                        <td>{name}</td>
                        <td>{appt_date.slice(0,10)}</td>
                        <td>{appt_time}</td>
                        <td><i className="fa fa-trash" onClick={() => handleDelete(_id)}></i></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default BookingList
