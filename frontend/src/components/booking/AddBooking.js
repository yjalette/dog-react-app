import React, {useContext} from 'react';
import Form from './Form';
import axios from 'axios';
import { AuthContext } from "../../contexts/AuthContext";

const AddBooking = () => {
   const context = useContext(AuthContext);

   const handleSubmit = newEvent => {
      axios
          .post('api/events', {
              ...newEvent,
              user_id: context.auth.id
          })
          .then(res => console.log(res))
  }
    return (
       <Form onSubmit={handleSubmit} msg="Book A Grooming"/>
    )
}

export default AddBooking
