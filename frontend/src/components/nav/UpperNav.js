import React from 'react';
import LoginLinks from './LoginLinks';
import SignOutLinks from './SignOutLinks';
import cloud from '../../images/cloud-home.png'

const UpperNav = ({auth}) => {
    return (
        <ul className="upper-nav">
            <li><img src={cloud} className="cloud"/></li>
            {auth?  <LoginLinks /> : <SignOutLinks />}
        </ul>
    )
}

export default UpperNav;
