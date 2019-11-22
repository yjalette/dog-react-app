import React from 'react'
import Calendar from 'react-calendar';

const DatePicker = ({handleDate, eventDate}) => {
    return (
        <> 
                <Calendar
                    onChange={handleDate}
                    value={eventDate}
                    name="appt_date"
                    minDate={new Date()}
                    tileDisabled={({ date}) => date.getDay() === 1 || date.getDay() === 0}
                />
        </>
    )
}

export default DatePicker;
