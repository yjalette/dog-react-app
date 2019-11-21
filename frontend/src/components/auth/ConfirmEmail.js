import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const ConfirmEmail = (props) => {
    const [count, setCount] = useState(10);

    useEffect(() => {
      if(count === 0){
          props.history.push("/authentication");
          return 
      }
      setTimeout(() => {
        setCount(state => state - 1)
      }, 1000)
    }, [count])

    return (
        <div>
            <span>Your email was confirmed. You will be redicted to your account page in {count} seconds.</span>
        </div>
    )
}

export default withRouter(ConfirmEmail);
