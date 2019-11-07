import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'
import UpperNav from './UpperNav';
import logo from '../../images/logo.png'

const Nav = () => {
    const { auth } = useContext(AuthContext);
    return (
        <section className="navigation">
            <UpperNav auth={auth}/>
        
            <nav>
                <ul>
                    <li><Link to="/" id="logo"><img src={logo} className="logo"/></Link></li>
                    <li><Link to="/grooming">Grooming</Link></li>
                    <li><Link to="/adoption">Adoption</Link></li>
                    <li><Link to="/news">Doggy News</Link></li>
                    <li><Link to="/contact">Contact</Link></li >
                </ul >
            </nav >
        </section>

    )
}

export default Nav
