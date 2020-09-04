import React from 'react';
import PropTypes from 'prop-types';


const Notification = ({ message }) => {
  if (message === null) return null;
  return (
    <div className='message'>
      {message}
    </div>
  );
};

Notification.propTypes={
  message:PropTypes.oneOfType([PropTypes.string,PropTypes.array])
};

export default Notification;
