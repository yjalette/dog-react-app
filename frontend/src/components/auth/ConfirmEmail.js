import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom'

const ConfirmEmail = () => {

const [redirect, setRedirect] = useState(false);
const [count, setCount] = useState(10);
useEffect(() => {
    setTimeout(() => {
        setRedirect(true)
    }, 10000);
})
    return (
        <div>
            <span>Your email was confirmed. You will be redicted to your account page in {count} seconds.</span>
            {redirect && <Redirect exact to="/authentication" />}
        </div>
    )
}

export default ConfirmEmail
