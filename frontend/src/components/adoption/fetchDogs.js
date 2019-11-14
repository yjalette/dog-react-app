export const fetchDogs = (params, token )=> {
    const searchParams = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([ , value])=> value)))
    return fetch(`https://api.petfinder.com/v2/animals?type=dog&${searchParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.log(err))
}