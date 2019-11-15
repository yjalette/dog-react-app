import React, { useState } from 'react';

const icons = {
    children: "fa fa-child",
    cats: "fas fa-cat",
    dogs: "fas fa-dog"
}


const Form = ({ handleSubmit, handleEnvironmentChange, handleChange, inputs, filter, myDivToFocus, handleClick, handleCancel }) => {

    return (
        <>
            <div className="adoption-filter-wrapper">
                <i onClick={handleClick} className={filter ? 'none' : 'fa fa-caret-down adoption-filter-btn'}>filter</i>
            </div>
            {filter && <form className="adoption_form" onSubmit={handleSubmit} ref={myDivToFocus}>
                <div className="input_wrapper">
                    <i className="fa fa-close" onClick={handleCancel}></i>
                </div>
                <div className="input_wrapper">
                    <label>gender:</label>
                    <select name="gender" value={inputs.gender} onChange={handleChange}>
                        <option value="male" name="male">male</option>
                        <option value="female" name="female">female</option>
                    </select>
                </div>
                <div className="input_wrapper">
                    <label>breed:</label>
                    <input value={inputs.breed} name="breed" onChange={handleChange} />
                </div>
                <div className="input_wrapper environment_wrapper">
                    <label>environment:</label>
                    <div className="environment_wrapper">
                        {Object.keys(inputs.environment).map(option => (
                            <div key={option} >
                                <i className={icons[option]}></i>
                                <input type="checkbox" onChange={handleEnvironmentChange} value={option} name="environment" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="input_wrapper">
                    <label>color:</label>
                    <input value={inputs.color} name="color" onChange={handleChange} />
                </div>
                <div className="input_wrapper">
                    <label>zipcode:</label>
                    <input value={inputs.zipcode} name="zipcode" onChange={handleChange} />
                </div>
                <div className="input_wrapper">
                    <label></label>
                    <button type="submit">search</button>
                </div>
            </form>}
            <span></span>
        </>
    )
}

export default Form
