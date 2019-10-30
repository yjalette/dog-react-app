import React from 'react'

const Form = ({handleChange, handleSubmit, inputs}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
               <label>Name
                   <input name="name" value={inputs.name} onChange={handleChange}/>
                </label>
               <label>Email
                   <input name="email" value={inputs.email} onChange={handleChange}/>
                </label>
                <label>Subject
                   <input name="subject" value={inputs.subject} onChange={handleChange}/>
                </label>
               <label>Message
                   <textarea name="msg" value={inputs.msg} rows="5" onChange={handleChange}/>
                </label>
                <button type="submit">send</button>
            </form>      
        </div>
    )
}

export default Form
