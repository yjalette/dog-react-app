import React from 'react'

const Form = ({ handleChange, handleSubmit, inputs }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label>Name
                   <input name="name" value={inputs.name} onChange={handleChange} />
                </label>
            </div>
            <div className="input-wrapper">
                <label>Email
                   <input name="email" value={inputs.email} onChange={handleChange} />
                </label>
            </div>
            <div className="input-wrapper">
                <label>Email
                   <input name="email" value={inputs.email} onChange={handleChange} />
                </label>
            </div>
            <div className="input-wrapper">
                <label>Subject
                   <input name="subject" value={inputs.subject} onChange={handleChange} />
                </label>
            </div>
            <div className="input-wrapper">
                <label>Message
                   <textarea name="msg" value={inputs.msg} rows="3" onChange={handleChange} />
                </label>
            </div>
            <div className="input-wrapper">
                <button type="submit">send</button>
            </div>
        </form>
    )
}

export default Form
