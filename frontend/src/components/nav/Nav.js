import React from 'react';
import { Link } from 'react-router-dom';
import SignOutLinks from './SignOutLinks'

const Nav = () => {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="./" id="logo">LOGO</Link></li>
                    <SignOutLinks />
                    <Link to="./" id="menu-icon"></Link>
                </ul >
            </nav >
        </>

    )
}

export default Nav
