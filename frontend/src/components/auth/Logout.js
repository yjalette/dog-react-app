import React, {useContext} from 'react';
import { AuthContext } from '../../contexts/AuthContext'

const Logout = () => {

    const { setAuth } = useContext(AuthContext);
    
    const handleLogout = e => {
        setAuth(null)
        localStorage.removeItem('user')
    }

    return (
        <li onClick={handleLogout}>Logout</li>
    )
}

export default Logout
