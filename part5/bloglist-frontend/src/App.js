import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blog, setBlogs] = useState({})
  const [newBlog, setNewBlog] = useState({ title: '', author: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)



  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
      console.log(blogs)
    }
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
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
      setLoggedIn(loggedIn)
      console.log(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setLoggedIn(true)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      },
        5000)
    }
  }
  const handleBlogChange = e => {
    setNewBlog({
      title: e.target.value,
      author: e.target.value
    })
  }
  const addBlog = (e) => {
    e.preventDefault()
  }
  const blogForm = () => (
    <form onSubmit={addBlog}>
      title:<input
        value={newBlog.title}
        onChange={handleBlogChange}
      />
      author:<input
        value={newBlog.author}
        onChange={handleBlogChange}
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
  /*const blogForm = () => (
    <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form>
  )*/
  if (user === null) {
    return (
      <div>
        <h2>Login to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
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

/* {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in</p>
        {blogForm()}
      </div>*/

export default App