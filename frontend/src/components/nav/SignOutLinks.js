import React from 'react';
import { Link } from 'react-router-dom';

const SignOutLinks = () => {
    return (
        <>
            {/* <li><Link  to="./booking" className="cloud-btn">Booking</Link></li> */}
            <li><Link  to="./authentication" className="cloud-btn">Sign up/Sign In</Link></li>
        </>
    )
}

export default SignOutLinks
