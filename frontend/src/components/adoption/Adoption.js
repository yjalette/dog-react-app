import React, { useEffect, useState, createContext } from 'react'
import Grid from '../grid/Grid';
import Form from './Form';
import DisplayResults from './DisplayResults';

export const TokenContext = createContext();

const Adoption = () => {
    const [token, setToken] = useState();

    useEffect(() => {
        fetch('https://api.petfinder.com/v2/oauth2/token', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                grant_type: 'client_credentials',
                client_id: 'DPTD79b2yoZvD48dmIsFL1iaD0dl3AEhd25NeY5QSXbPPnF9Cd',
                client_secret: 'wkpL87U7TJRV5vOyI1X7uMs751DoGoDaykitHmAF'
            })
        })
            .then(response => response.json())
            .then(res => setToken(res.access_token))
            .catch(err => console.log(err))
    }, [])

    return (
        <TokenContext.Provider value={{ token: token }}>
            <DisplayResults />
            <Grid />
        </TokenContext.Provider>
    )
}

export default Adoption
