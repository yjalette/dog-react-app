import React from 'react';
import { Link } from 'react-router-dom';
import UserNav from './UserNav';

const LoginLinks = () => {
    return (
        <>
            <li><Link  to="./booking" className="cloud-btn">Book Now</Link></li>
            <UserNav />
        </>
    )
}

export default LoginLinks
