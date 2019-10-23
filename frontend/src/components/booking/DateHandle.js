import React, { useState } from 'react';
import Calendar from 'react-calendar';

const DateHandle = ({handleDate, date}) => {
    return (
        <>
            <Calendar
                onChange={handleDate}
                value={date}
                name="date"
                
            />
        </>
    )
}

export default DateHandle
