import React from 'react';
import './error-message.css'
import error from './error.jpg';

const ErrorMessage = () => {
    return (
      <>
          <h3>Данные съел один из моих драконов.</h3>
          <img className='error' src={error} alt="error image"/>
      </>
    )
}

export default ErrorMessage;