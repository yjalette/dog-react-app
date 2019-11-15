import React, { useState, useContext, useEffect } from 'react';
import { TokenContext } from './Adoption';
import Grid from '../grid/Grid';
import { fetchDogs } from './fetchDogs';
import Form from './Form';

const myDivToFocus = React.createRef()

const DisplayResults = () => {
    const [inputs, setInputs] = useState({
        gender: 'male',
        breed: '',
        zipcode: '10032',
        color: 'black',
        environment: {
            cats: false,
            children: false,
            dogs: false
        }
    });
  
    const [results, setResults] = useState(null);
    const [filter, showFilter] = useState(false);
    const { token } = useContext(TokenContext);

    const handleClick = async () => {
        await showFilter(true);
        myDivToFocus.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    const handleCancel = () => {
        showFilter(true);
    }

    useEffect(() => {
        if (!token) return;
        fetchDogs({}, token)
            .then(data => {
                console.log(data)
                if (!data.animals) {
                    throw new Error("no animals");
                }
                else setResults(data.animals)
            })
            .catch(err => console.log('error: ', err));
    }, [token])

    const handleChange = e => {
        console.log(inputs)
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleEnvironmentChange = e => {
        console.log(e.target.value)
        setInputs({
            ...inputs,
            environment: {
                ...inputs.environment,
                [e.target.value]: true
            }
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(inputs)
        try {
            const data = await fetchDogs(inputs, token);
            if (!data.animals) {
                throw new Error("no animals");
            }
            else
                setResults(data.animals);
        }
        catch (err) {
            return console.log('error: ', err);
        }
    }

    return (
        <>
            <div className="grid-form-wrapper">
                <Form handleClick={handleClick} handleCancel={handleCancel} handleSubmit={handleSubmit} handleChange={handleChange} handleEnvironmentChange={handleEnvironmentChange} inputs={inputs} filter={filter} myDivToFocus={myDivToFocus} />
               <div className={filter ? "opacity" : ""}>
                     <Grid animals={results}/>
               </div>
            </div>
           
        </>
    )
}

export default DisplayResults;
