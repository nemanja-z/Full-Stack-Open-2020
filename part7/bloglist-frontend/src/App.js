import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogDetails from './components/BlogDetails'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { initBlogs, addBlogs, deleteBlog } from './reducers/blogReducer'
import { login, logout, getUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
import {
  useRouteMatch, Switch, Route
} from 'react-router-dom'
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
  const users = useSelector(state => state.users)

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
  const matchUsers = useRouteMatch('/users/:id')
  const showUser = matchUsers ? users.find(u => u.id === matchUsers.params.id) : null
  const matchBlog = useRouteMatch('/blogs/:id')
  const showBlog = matchBlog ? blog.find(b => b.id === matchBlog.params.id) : null
  console.log(showBlog, 'showBlog')
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
      <Switch>
        <Route path='/users/:id'>
          <User user={showUser} />
        </Route>
        <Route path='/blogs/:id'>
          <BlogDetails key={blog.id} user={user} blog={showBlog} removeBlog={removeBlog} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Notification message={message} />
          <button onClick={loggedOut}>logout</button>
          <h3>{user.name}</h3>
          {sortedBlogs.map((blog) =>
            <Blog key={blog.id} blog={blog} />
          )}
          {blogForm()}
        </Route>


      </Switch>
    </div>
  )
}



export default App