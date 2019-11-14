import React from 'react';

const BookingList = ({handleDelete, events, onEdit}) => {
    
    return (
        <>
        <h3>My Bookings</h3>
            <table className="booking-list">
            <tbody>
                <tr>
                    <th>name</th>
                    <th>breed</th>
                    <th>size</th>
                    <th>date</th>
                    <th>time</th>
                    <th>edit</th>
                    <th>cancel</th>
                </tr>
                {events.map(({ _id, name, appt_date, appt_time, breed, size}) => (
                    <tr key={_id}>
                        <td>{name}</td>
                        <td>{breed}</td>
                        <td>{size}</td>
                        <td>{appt_date.slice(0,10)}</td>
                        <td>{appt_time}</td>
                        <td><i className="fa fa-edit" onClick={() => onEdit(_id)}></i></td>
                        <td><i className="fa fa-trash" onClick={() => handleDelete(_id)}></i></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default BookingList
