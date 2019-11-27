import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';

const UserNav = ({username}) => {
    return (
        <>
            <i className='fa fa-user'>{username}</i>
            <div className="dropdown-content">
                <Link to="./booking">my bookings</Link>
                <Link to="./account">settings</Link>
                <Logout />
            </div>
        </>
    )
}

export default UserNav
