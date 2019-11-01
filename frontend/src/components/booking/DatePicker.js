import React, { useState } from 'react'
import Calendar from 'react-calendar';

const DatePicker = ({handleDate, inputs}) => {
    return (
        <> 
                <Calendar
                    onChange={handleDate}
                    value={inputs.appt_date}
                    name="appt_date"

                />
        </>
    )
}

export default DatePicker;
