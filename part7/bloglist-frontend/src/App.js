import React, { useEffect } from 'react';
import Blog from './components/Blog';
import BlogDetails from './components/BlogDetails';
import Users from './components/Users';
import User from './components/User';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import { initBlogs, addBlogs } from './reducers/blogReducer';
import { login, logout, getUser } from './reducers/userReducer';
import { initUsers } from './reducers/usersReducer';
import {
  useRouteMatch, Switch, Route, useHistory
} from 'react-router-dom';
import { useField } from './hooks/useField';
import { newMessage } from './reducers/messageReducer';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const username = useField('text');
  const password = useField('password');
  const blogFormRef = React.createRef();
  const dispatch = useDispatch();
  const message = useSelector(state => state.message);
  const blog = useSelector(state => state.blog);
  const user = useSelector(state => state.user);
  const users = useSelector(state => state.users);
  const history = useHistory();

  
  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUsers());
    dispatch(getUser());
  }, [dispatch]);
  const handleLogin = async (e) => {
    e.preventDefault();
    const creds = {
      username: username.value,
      password: password.value
    };
    try {
      dispatch(login(creds));
      username.reset();
      password.reset();
      dispatch(newMessage('successful login'));

    } catch (exception) {
      username.reset();
      password.reset();
      dispatch(newMessage('wrong credentials'));
    }
  };
  const loggedOut = () => {
    dispatch(logout());
    history.push('/');
  };
  const sortedBlogs = [...blog].sort((a, b) => a.likes < b.likes);
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try{ dispatch(addBlogs(blogObject));
       dispatch(newMessage(`A new blog by ${user.username} is added`));
    }catch(e){
      console.log(e.response.message);
    }
  };
 
  
  const matchUsers = useRouteMatch('/users/:id');
  const showUser = matchUsers ? users.find(u => u.id === matchUsers.params.id) : null;
  const matchBlog = useRouteMatch('/blogs/:id');
  const showBlog = matchBlog ? blog.find(b => b.id === matchBlog.params.id) : null;
  
  return (
    <div>
    {!user ? (<div>
          <h2>Login to application</h2>
        <Notification message={message} />
        <LoginForm
      username={username}
      password={password}
      handleSubmit={handleLogin}
        />
      </div>) : (<div>
      <h2>Blogs</h2>
      <Navigation user={user} loggedOut={loggedOut} />
      <Switch>
        <Route path='/users/:id'>
          <User user={showUser} />
        </Route>
        <Route path='/blogs/:id'>
          <BlogDetails history={history} key={blog.id} user={user} blog={showBlog} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/login'>
            <LoginForm
              username={username}
              password={password}
              handleSubmit={handleLogin}
            />
        </Route>
        <Route path='/'>
          <Notification message={message} />
          <h3>{user.name}</h3>
          {sortedBlogs.map((blog) =>
            <Blog key={blog.id} blog={blog} />
          )}
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
        </Route>
      </Switch>
      </div>)}
    </div>
  );
};



export default App;
