
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { useApolloClient } from '@apollo/client'
const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const client = useApolloClient()

  console.log(token, 'token')
  const notify = message => {
    setErrorMessage(message)
    setTimeout(() => { setErrorMessage(null) }, 5000)
  }
  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify} />
      </div>
    )
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token === null ? <button onClick={logout}>logout</button> :
          <button onClick={() => setPage('add')}>add book</button>
        }
      </div>

      <Authors
        token={token} show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        setError={setErrorMessage} show={page === 'add'}
      />

    </div>
  )
}

export default App