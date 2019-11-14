import React from 'react'

const Account = ({ updateName, updateEmail, updatePwd }) => {
    return (
        <div className="account">
            <div className="input-wrapper">
                <label>name <i className="fa fa-edit"></i></label>
                <input value="" name="name" onChange={updateName} />
            </div>
            <div className="input-wrapper">
                <label>email <i className="fa fa-edit"></i></label>
                <input value="" name="name" onChange={updateEmail} />
            </div>
            <div className="input-wrapper">
                <label>password <i className="fa fa-edit"></i></label>
                <input value="" name="name" onChange={updatePwd} />
            </div>
        </div>
    )
}

export default Account
