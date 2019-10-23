import React from 'react'
import Card from './Card'

const Grid = ({animals}) => {
    console.log(animals)
    return (
        <div className="grid">
            {animals && animals.map(animal => <Card key={animal.id} animal={animal} />)}
        </div>
    )
}

export default Grid
