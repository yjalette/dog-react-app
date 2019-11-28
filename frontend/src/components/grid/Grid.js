import React from 'react'
import Card from './Card'

const Grid = ({animals, handleShowDetails}) => {
    return (
        <div className="grid">
            {animals && animals.slice(11).map(animal => <Card key={animal.id} animal={animal} handleShowDetails={handleShowDetails}/>)}
        </div>
    )
}

export default Grid
