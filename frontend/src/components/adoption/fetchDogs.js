export const fetchDogs = (params, token )=> {
    const searchParams = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([ , value])=> value)))
    console.log(searchParams)
    return fetch(`https://api.petfinder.com/v2/animals?type=dog&page=2&limit=59&${searchParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        })
            .then(res => console.log(res) || res.json())
            .catch(err => console.log(err))
}