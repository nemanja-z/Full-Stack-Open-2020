import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, username, password }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username.value}
            type={username.type}
            onChange={username.onChange}
            reset={username.reset}
          />
        </div>
        <div>
          password
          <input
            {...password}
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