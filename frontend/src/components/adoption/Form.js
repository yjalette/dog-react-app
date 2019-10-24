import React, { useState, useContext, useEffect } from 'react';
import { TokenContext } from './Adoption';
import Grid from '../grid/Grid';
import { fetchDogs } from './fetchDogs';

const Form = () => {
    const [inputs, setInputs] = useState({ gender: 'male', breed: '', zipcode: '10032' });
    const [results, setResults] = useState(null);
    const { token } = useContext(TokenContext)

    useEffect(() => {
        if (!token) return;

        fetchDogs({}, token)
            .then(data => {
                if (!data.animals) {
                    throw new Error("no animals");
                }
                else setResults(data.animals)
            })
            .catch(err => console.log('error: ', err));
    }, [token])

    const handleChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        return fetchDogs(inputs, token)
            .then(data => {
                if (!data.animals) {
                    throw new Error("no animals");
                }
                else setResults(data.animals)
            })
            .catch(err => console.log('error: ', err));
    }

    return (
        <>
            <form className="adoption_form" onSubmit={handleSubmit}>
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
                <div className="input_wrapper">
                    <label>zipcode:</label>
                    <input value={inputs.zipcode} name="zipcode" onChange={handleChange} />
                </div>
                <div className="input_wrapper">
                    <label>zipcode:</label>
                    <input value={inputs.zipcode} name="zipcode" onChange={handleChange} />
                </div>
                <div className="input_wrapper">
                    <label>zipcode:</label>
                    <input value={inputs.zipcode} name="zipcode" onChange={handleChange} />
                </div>
                <div className="input_wrapper">
                    <label></label>
                    <button type="submit">search</button>
                </div>
            </form>
            <Grid animals={results} />
        </>
    )
}

export default Form
