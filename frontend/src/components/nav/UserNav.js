import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';

const UserNav = ({username}) => {
    return (
        <>
            <i className='fa fa-user-circle-o'>{username}</i>
            <div className="dropdown-content">
                <span>My Bookings<Link to="./booking"></Link></span>
                <span>Settings</span>
                <Logout />
            </div>
        </>
    )
}

export default UserNav
