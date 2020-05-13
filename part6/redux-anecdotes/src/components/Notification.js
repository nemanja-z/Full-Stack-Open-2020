import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


const Notification = () => {
  const message = useSelector(state => state.notification)

  const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log('message is:', message)
  return (
    <div style={style}>
      {message && <div>{message}</div>}
    </div>
  )
}
//   {message.map((m, i) => <p key={i}>{m}</p>)}
export default Notification