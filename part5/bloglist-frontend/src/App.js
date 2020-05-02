import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blog, setBlogs] = useState({})
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)



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
  console.log(message)
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



  const handleTitleChange = e => {
    e.preventDefault()
    setNewTitle(e.target.value)
  }
  const handleAuthorChange = e => {
    e.preventDefault()
    setNewAuthor(e.target.value)
  }

  const handleUrlChange = e => {
    e.preventDefault()
    setNewUrl(e.target.value)
  }
  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService.create(newBlog)
      .then(response => {
        setBlogs(blog.concat(response))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
    setMessage(`A new blog by ${user.name} is added`)
    setTimeout(() => {
      setMessage(null)
    },
      5000)
  }
  const blogForm = () => (
    <form onSubmit={addBlog}>
      title:<input
        value={newTitle}
        onChange={handleTitleChange}
      />
      author:<input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      url:<input
        value={newUrl}
        onChange={handleUrlChange}
      />
      <button type="submit">save</button>
    </form>
  )
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
           <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
           <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
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