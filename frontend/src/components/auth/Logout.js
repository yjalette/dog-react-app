import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Cookies from 'js-cookie';

const Logout = (props) => {
    const { setAuth } = useContext(AuthContext);    
    const handleLogout = e => {
        setAuth(null)
        Cookies.remove('token');
        props.history.push('/')
    }

    return (
        <span onClick={handleLogout}>Logout</span>
    )
}

export default withRouter(Logout);
