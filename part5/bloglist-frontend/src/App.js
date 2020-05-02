import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blog, setBlogs] = useState({})

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const blogFormRef = React.createRef()


  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    if (loggedIn) {
      setMessage('successful login')
      setTimeout(() =>
        setMessage(null), 5000)
    }
    if (!loggedIn) {
      window.localStorage.removeItem('loggedUser')
      setUser(null)
    }

  }, [loggedIn])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setLoggedIn(true)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then(response => {
        setBlogs(blog.concat(response))
      })
    setMessage(`A new blog by ${user.name} is added`)
    setTimeout(() => {
      setMessage(null)
    },
      5000)
  }
  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )
  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  if (user === null) {
    return (
      <div>
        <h2>Login to application</h2>
        {message === null ? null : <h3>{message}</h3>}
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      {message === null ? null : <h2>{message}</h2>}
      <button onClick={() => setLoggedIn(!loggedIn)}>{loggedIn ? 'logout' : 'login'}</button>
      <h3>{user.name}</h3>
      <div>
        {blog.map(b =>
          <Blog key={b.id} blog={b} />)}
      </div>
      {blogForm()}
    </div>
  )
}



export default App