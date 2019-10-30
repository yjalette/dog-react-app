import React from 'react';
import { Link } from 'react-router-dom';
import SignOutLinks from './SignOutLinks'
import Logout from '../auth/Logout';

const Nav = () => {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="./" id="logo">LOGO</Link></li>
                    <SignOutLinks />
                    <li><Link  to="./contact">Contact</Link></li >
                    <li><Logout /></li >
                </ul >
            </nav >
        </>

    )
}

export default Nav
