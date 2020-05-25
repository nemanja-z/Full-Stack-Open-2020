import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, username, password }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            {...username}
            reset='reset'
          />
        </div>
        <div>
          password
          <input
            {...password}
            reset='reset'
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}
export default LoginForm