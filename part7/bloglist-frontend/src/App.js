import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { initBlogs, addBlogs, deleteBlog } from './reducers/blogReducer'
import { newMessage } from './reducers/messageReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  // const [blog, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()
  const message = useSelector(state => state.message)
  const blog = useSelector(state => state.blog)

  useEffect(() => {

    //blogService.getAll().then(response => { setBlogs(response) })

    dispatch(initBlogs())


  }, [blog])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }


  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setLoggedIn(true)
      // setMessage('successful login')
      dispatch(newMessage('successful login'))

      setTimeout(() =>
        dispatch(newMessage(null)), 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      //   setMessage('wrong credentials')
      dispatch(newMessage('wrong credentials'))
      setTimeout(() => {
        dispatch(newMessage(null))
      }, 5000)
    }
  }



  const loggedOut = () => {
    setLoggedIn(!loggedIn)
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const sortedBlogs = blog.sort((a, b) => a.likes < b.likes)
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlogs(blogObject))
    //const result = await blogService.create(blogObject)
    // setBlogs(blog.concat(result))
    //  setMessage(`A new blog by ${user.name} is added`)
    dispatch(newMessage(`A new blog by ${user.name} is added`))
    setTimeout(() => {
      //     setMessage(null)
      dispatch(newMessage(null))
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
  const removeBlog = async (blog) => {
    if (window.confirm(`Do you really want to delete ${blog.title}`)) {
      try {
        dispatch(deleteBlog(blog))
        //blogService.remove(id)
        //   setBlogs(await blogService.getAll())
        //   setMessage(`${blog.title} has been removed`)
        dispatch(newMessage(`${blog.title} has been removed`))
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Login to application</h2>
        <Notification message={message} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={message} />
      <button onClick={loggedOut}>logout</button>
      <h3>{user.name}</h3>
      {sortedBlogs.map((blog) =>
        <Blog key={blog.id} blog={blog} user={user} removeBlog={removeBlog} />
      ).sort((a, b) => a.likes > b.likes)}
      {blogForm()}
    </div>
  )
}



export default App