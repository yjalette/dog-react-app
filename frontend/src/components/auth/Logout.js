import React from 'react'

const Logout = () => {
    
    const handleLogout = e => {
        fetch('http://localhost:5000/api/auth/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            return res.json();  
        }).then(data => {

            console.log(data)
            // props.history.push('./')
        })
    }

    return (
        <span onClick={handleLogout}>Logout</span>
    )
}

export default Logout
