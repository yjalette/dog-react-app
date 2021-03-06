import React, { useState, useContext, useEffect } from 'react';
import { TokenContext } from './Adoption';
import Grid from '../grid/Grid';
import { fetchDogs } from './fetchDogs';
import Form from './Form';
import { useSnackBars } from '../../contexts/AlertContext';
import Details from '../grid/Details';
import { withRouter } from 'react-router-dom';

import qs from 'query-string';

const myDivToFocus = React.createRef()

const initState = {
    id: "",
    gender: 'male',
    breed: '',
    color: 'black',
    good_with_cats: false,
    good_with_dogs: false,
    good_with_children: false,
    location: '10032',
    distance: 50,
    sort: ""
}

const DisplayResults = (props) => {

    const [inputs, setInputs] = useState(() => {
        const { search } = props.location;
        console.log(search)
        if (search) return console.log("here") || qs.parse(search);
        return initState
    });



    // const setAlert = useSnackBars();

    const [results, setResults] = useState(null);

    const [filter, showFilter] = useState(false);

    const [details, showDetails] = useState(false);

    const { token } = useContext(TokenContext);

    const handleClick = async () => {
        await showFilter(true);
        myDivToFocus.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const handleCancel = () => {
        showFilter(false);
    }

    const handleShowDetails = () => {
        showDetails(true);
    }

    const handleReset = () => {
        setInputs(initState);
    }

    useEffect(() => {
        if (!token) return;
        console.log(inputs)
        fetchDogs(inputs, token)
            .then(data => {
                const animals = data.animals.filter(animal => animal.photos.length !== 0)
                // if (!data.animals) {
                //     setAlert({msg: "Sorry, but nothing matched your search criteria. Please try again with some different keywords.", type: 'error'})
                //     throw new Error("no animals");
                // }
                setResults(animals);

                // setAlert({msg: `${animals.length} results were found`, type: 'success'})

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
        try {
            const data = await fetchDogs(inputs, token);
            if (!data.animals) {
                showFilter(false);
                // setAlert({msg: "Sorry, but nothing matched your search criteria. Please try again with some different keywords.", type: 'error'})
                throw new Error("no animals");
            }

            showFilter(false);
            setResults(data.animals);
            props.history.push({ search: qs.stringify(inputs) })
        }
        catch (err) {
            return console.log('error: ', err);
        }
    }

    return (
        <>
            <div className="grid-form-wrapper">
                <Form reset={handleReset} handleClick={handleClick} handleCancel={handleCancel} handleSubmit={handleSubmit} handleChange={handleChange} handleEnvironmentChange={handleEnvironmentChange} inputs={inputs} filter={filter} myDivToFocus={myDivToFocus} />
                <div className={filter ? "opacity" : ""}>
                    <Grid animals={results} handleShowDetails={handleShowDetails} />
                </div>
            </div>

        </>
    )
}

export default withRouter(DisplayResults);
