import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import cloud from '../../images/cloud-home.png';
import UserNav from './UserNav';

const UpperNav = ({ auth, history }) => {
    return (
        <ul className="upper-nav">
            <li><Link to="./"><img src={cloud} className="cloud" alt="cloud" /></Link></li>
            <li className="user-menu">{auth ? <UserNav username={auth.firstName}/> : <Link to="./authentication" className="cloud-btn">Login</Link>}</li>
            <li className="book-btn" onClick={()=> auth ? history.push("/booking") : history.push("/authentication", {msg: "Please Login To Continiue"})} >Book Now</li>
        </ul>
    )
}

export default withRouter(UpperNav);
