import React, { useState, useContext } from 'react'
import Account from './Account';
import Cookies from 'js-cookie';
import { AuthContext } from '../../contexts/AuthContext';
import { MsgContext } from '../../contexts/MsgContext';
import axios from 'axios';
import picture from '../../images/dog-comp.png';

const UpdateInputs = () => {

    const user_context = useContext(AuthContext);
    const msg_context = useContext(MsgContext);

    const [inputs, setinputs] = useState({
        creds: user_context.auth,
        pwd: {
            newPassword: "",
            oldPassword: ""
        }
    }
    )

    const token = Cookies.get('token')

    const handleChange = (e) => {
        setinputs({
            ...inputs,
            creds: {
                ...inputs.creds,
                [e.target.name]: e.target.value
            }

        })
    }

    const handleChangePassword = (e) => {
        setinputs({
            ...inputs,
            pwd: {
                ...inputs.pwd,
                [e.target.name]: e.target.value
            }
        })
    }

    const updatePassword = e => {
        e.preventDefault()
        axios
            .put(`api/auth/change-password/${token}`, {
                ...inputs.pwd
            })
            .catch(err => console.log("eto===>", err.response))
    }

    const updateCreds = e => {
        e.preventDefault()
        axios
            .put(`api/auth/change-creds/${token}`, {
                ...inputs.creds
            }).then(() => {
                axios
                    .get(`api/auth/user`)
                    .then(res => {
                        Cookies.set('user', {
                            id: res.data._id,
                            email: res.data.email,
                            firstName: res.data.firstName,
                            lastName: res.data.lastName,
                        })

                    }).catch(err => console.log(err.message))
            }).catch(err => console.log(err.message))
    }
    return (
        <section className="account wrapper">
            <div className="wrapper-header">
                <div>
                    <img alt="adoption-heroimage" className="adoption-heroimage" src={picture} />
                </div>
                <h1>Update Account</h1>
            </div>
            <Account error={msg_context.msg.type.error} handleChangePassword={handleChangePassword} updatePassword={updatePassword} handleChange={handleChange} updateCreds={updateCreds} inputs={inputs} />
        </section>
    )
}

export default UpdateInputs
