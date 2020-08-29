import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message }) => {
  return (
    <>
    {message ?
    <div className='message'>
      {message}
    </div> : null} 
    </>
  )
}
Notification.propTypes={
  message:PropTypes.string
}

export default Notification;
