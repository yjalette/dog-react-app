import React, {useState} from 'react'
import DateHandle from './DateHandle';

const Form = () => {
    const [inputs, setInputs] = useState({date: new Date()});
    const handleDate = (selectedDate) => {
        console.log(selectedDate)
        setInputs({
            ...inputs,
            date: selectedDate
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(JSON.stringify(inputs.date))
    }
    return (
        <>
        <form onSubmit={handleSubmit} className="booking-form">
            <DateHandle handleDate={handleDate} date={inputs.date}/>
            <button type="submit"> submit</button>
        </form>
        
        <span>{JSON.stringify(inputs.date).slice(1,11)}</span>
        </>
    )
}

export default Form
