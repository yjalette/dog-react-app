import React from 'react'

const Account = ({ handleChange, inputs, updateCreds, handleChangePassword, updatePassword, error}) => {
    return (
        <>
        <h4>{error}</h4>
        <section className="updates">
            <div className="input-wrapper">
                <label>First Name</label>
                <input value={inputs.creds.firstName} name="firstName" onChange={handleChange} />
                <button type="click" onClick={updateCreds}>save</button>
            </div>
            <div className="input-wrapper">
                <label>Last Name</label>
                <input value={inputs.creds.lastName} name="lastName" onChange={handleChange} />
                <button type="click" onClick={updateCreds}>save</button>
            </div>
            <div className="input-wrapper">
                <label>email </label>
                <input value={inputs.creds.email} name="email" onChange={handleChange} />
                <button type="click" onClick={updateCreds}>save</button>
            </div>
            <div className="input-wrapper">
                <label>old password </label> 
                <input value={inputs.pwd.oldPassword} name="oldPassword" onChange={handleChangePassword} />
                <label>new password </label> 
                <input value={inputs.pwd.newPassword} name="newPassword" onChange={handleChangePassword} />
                <button type="click" onClick={updatePassword}>save</button>              
            </div>
        </section>
       

                
    
        </>
    )
}

export default Account
