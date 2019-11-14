import React from 'react'
import Card from './Card'

const Grid = ({animals}) => {
    return (
        <div className="grid">
            {animals && animals.slice(8).map(animal => <Card key={animal.id} animal={animal} />)}
        </div>
    )
}

export default Grid
