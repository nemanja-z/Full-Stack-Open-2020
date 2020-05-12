import React from 'react'
import { message, show } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'


const Notification = () => {
  const message = useSelector(state => state.notification)

  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log(message)
  return (
    <div style={style}>
      {message.map((m, i) => <p key={i}>{m}</p>)}
    </div>
  )
}

export default Notification