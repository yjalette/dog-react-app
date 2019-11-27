import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'
import UpperNav from './UpperNav';
import logo from '../../images/logo.png';

const Nav = () => {
    const { auth } = useContext(AuthContext);
    return (
        <>
            <section className="navigation">
                <UpperNav auth={auth} />
                <nav>
                    <Link to="/" id="logo"><img src={logo} className="logo" alt="logo" /></Link>
                    <div className="dropdown">
                        <div className="dropdown-content">
                            <Link to="/grooming">grooming</Link>
                            <Link to="/adoption">adoption</Link>
                            <Link to="/news">dog news</Link>
                            <Link to="/contact">contact</Link>
                            {/* <li className="book-btn"><Link to="./booking" >Book Now</Link></li> */}
                        </div >
                    </div>
                </nav >
            </section>
        </>
    )
}

export default Nav
