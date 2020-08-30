import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blog, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const blogFormRef = React.createRef();


  useEffect(() => {
    const fetchBlogs = async () => {
      try{
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      }catch(e){
        console.log(e);
      }};
    fetchBlogs();
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setLoggedIn(true);
      setMessage('successful login');
      setTimeout(() =>
        setMessage(null), 5000);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('wrong credentials');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  const loggedOut = () => {
    setLoggedIn(!loggedIn);
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const result = await blogService.create(blogObject);
    setBlogs(blog.concat(result));
    setMessage(`A new blog by ${user.name} is added`);
    setTimeout(() => {
      setMessage(null);
    },
    5000);
  };

  const removeBlog = async (blog) => {
    const { id } = blog;
    if (window.confirm(`Do you really want to delete ${blog.title}`)) {
      try {
        await blogService.remove(id);
        setBlogs(await blogService.getAll());
        setMessage(`${blog.title} has been removed`);
        setTimeout(() => {
          setMessage(null);
        },
        5000);
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  return (<>
    {!user ? (
      <div>
        <h2>Login to application</h2>
        <Notification message={message} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}/>
      </div>) :
      ( <div>
        <h2>Blogs</h2>
        <Notification message={message} />
        <button onClick={loggedOut}>logout</button>
        <h3>{user.name}</h3>
        {blog.map((blog) =>
          <Blog key={blog.id} blog={blog} user={user} removeBlog={removeBlog} />
        ).sort((a, b) => a.likes < b.likes)}
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
      </div>)}
  </>
  );
};

export default App;