import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { initBlogs, addBlogs, deleteBlog } from './reducers/blogReducer'
import { login, logout, getUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'

import { newMessage } from './reducers/messageReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()
  const message = useSelector(state => state.message)
  const blog = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [])
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login({ username, password }))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(newMessage('wrong credentials'))
    }
  }
  const loggedOut = () => {
    dispatch(logout())
  }
  const sortedBlogs = blog.sort((a, b) => a.likes < b.likes)
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlogs(blogObject))
    dispatch(newMessage(`A new blog by ${user.username} is added`))
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
      )}
      {blogForm()}
      <Users />
    </div>
  )
}



export default App
