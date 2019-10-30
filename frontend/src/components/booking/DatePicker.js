import React, { useState } from 'react'
import Calendar from 'react-calendar';

const DatePicker = ({handleDate, inputs}) => {
    // const [inputs, setInputs] = useState({ date: new Date() });
    // const handleDate = (selectedDate) => {
    //     console.log(selectedDate)
    //     setInputs({
    //         ...inputs,
    //         date: selectedDate
    //     })
    // } 
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
