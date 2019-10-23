import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';
import AddBooking from './AddBooking';

const BookingList = () => {
    const [inputs, setInputs] = useState({
        items: [],
        loading: false
    })


    // const handleClick = () => {
    //     const name = prompt("enter name ...")
    //     if(name){
    //         setInputs(inputs => ({
    //             items:[...inputs.items, {name}]
    //         }))
    //     }

    // }

    useEffect(() => {
        axios
            .get('./api/items')
            .then(res => {
                setInputs({
                    ...inputs,
                    items: res.data

                })
            })

    }, [])

    

    const handleDelete = (id) => {
        setInputs(inputs => ({
            items: inputs.items.filter(item => item.id !== id)
        }))
    }

    

    return (
        <div>
            <AddBooking items={inputs.items}/>
            <ul>
                <TransitionGroup>
                    {inputs.items.map(({ _id, name }) => (
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                            <li>{name}
                                <button onClick={() => handleDelete(_id)}>delete</button>
                            </li>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ul>
        </div>
    )
}

export default BookingList
