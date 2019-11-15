import React from 'react';
import { Link } from 'react-router-dom';
import cloud from '../../images/cloud-home.png';
import UserNav from './UserNav';

const UpperNav = ({ auth }) => {
    return (
        <ul className="upper-nav">
            <li><img src={cloud} className="cloud" alt="cloud" /></li>
            <li className="book-btn"><Link to="./booking" >Book Now</Link></li>
            <li className="user-menu">{auth ? <UserNav username={auth.firstName}/> : <Link to="./authentication" className="cloud-btn">Sign up/Sign In</Link>}</li>
        </ul>
    )
}

export default UpperNav;
