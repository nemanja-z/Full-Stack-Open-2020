import React from 'react';
import './index.css';

const Notification = ({ message }) => {
    if (!message) {
        return null;
    }
    return (
        <div className='info-message'>
            {message}
        </div>
    )

}
export default Notification;