import React from 'react'
import Calendar from 'react-calendar';

const DatePicker = ({handleDate, eventDate}) => {
    return (
        <> 
                <Calendar
                    onChange={handleDate}
                    value={eventDate}
                    name="appt_date"

                />
        </>
    )
}

export default DatePicker;
