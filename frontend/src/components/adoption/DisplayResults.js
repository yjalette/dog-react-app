import React, { useState, useContext, useEffect } from 'react';
import { TokenContext } from './Adoption';
import Grid from '../grid/Grid';
import { fetchDogs } from './fetchDogs';
import Form from './Form';
import { MsgContext } from '../../contexts/MsgContext';
import Details from '../grid/Details';

const myDivToFocus = React.createRef()

const DisplayResults = () => {

    const [inputs, setInputs] = useState({
        gender: 'male',
        breed: '',
        color: 'black',
        good_with_cats: false,
        good_with_dogs: false,
        good_with_children: false,
        location: '10032',
        distance: 50,
        sort: ""
    });

    const [results, setResults] = useState(null);

    const [filter, showFilter] = useState(false);

    const { token } = useContext(TokenContext);

    const context = useContext(MsgContext)

    const handleClick = async () => {
        await showFilter(true);
        myDivToFocus.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const handleCancel = () => {
        showFilter(false);
    }

    useEffect(() => {
        if (!token) return;
        fetchDogs({}, token)
            .then(data => {
                const animals = data.animals.filter(animal => animal.photos.length !== 0)
                if (!data.animals) {
                    console.log("this is error")
                    throw new Error("no animals");
                }
                else setResults(animals)
            })
            .catch(err => console.log('error: ', err));
    }, [token])

    const handleChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleEnvironmentChange = e => {
        setInputs({
            ...inputs,
                [e.target.name]: true
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        context.setMsg(
            {
            type: {
                error: ""
            }
        })
        try {
            const data = await fetchDogs(inputs, token);
            if (!data.animals) {
                showFilter(false);
                context.setMsg({
                    type: {
                        error: "Sorry, but nothing matched your search criteria. Please try again with some different keywords."
                    }})
                throw new Error("no animals");
            }
            else
            showFilter(false);
            setResults(data.animals);
        }
        catch (err) {
            return console.log('error: ', err);
        }
    }

    return (
        <>
            <div className="grid-form-wrapper">
                <h2 className="error">{context.msg.type.error}</h2>
                <Form handleClick={handleClick} handleCancel={handleCancel} handleSubmit={handleSubmit} handleChange={handleChange} handleEnvironmentChange={handleEnvironmentChange} inputs={inputs} filter={filter} myDivToFocus={myDivToFocus} />
                <div className={filter ? "opacity" : ""}>
                    <Grid animals={results}/>
                </div>
            </div>

        </>
    )
}

export default DisplayResults;
