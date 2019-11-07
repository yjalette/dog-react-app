import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';

const UserNav = () => {
    return (
        <li className="user-menu">
            <i className='fa fa-user-circle-o'></i>
            <ul className="dropdown-content">
                <li>My Bookings<Link to="./booking"></Link></li>
                <li>Settings</li>
                <Logout />
            </ul>
        </li>
    )
}

export default UserNav
