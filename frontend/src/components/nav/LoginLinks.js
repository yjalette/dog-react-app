import React from 'react';
import { Link } from 'react-router-dom';

const LoginLinks = () => {
    return (
        <>
            <li><Link  to="./">Home</Link></li>
            <li><Link  to="">Doggy News</Link></li>
            <li><Link  to="./adoption">Adoption</Link></li>
            <li><Link  to="./booking">Booking</Link></li>
            <li><Link  to="./authentication">Sign up/Sign In</Link></li >
            <li><Link  to="./">Contact</Link></li >
        </>
    )
}

export default LoginLinks
