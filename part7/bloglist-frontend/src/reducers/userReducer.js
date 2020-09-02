import loginService from '../services/login';
import { newMessage } from './messageReducer';

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data;
  case 'LOGOUT':
    return null;
  case 'GET':
    return action.data;
  default:
    return state;
  }
};
export const login = (creds) => {
  return async dispatch => {
    const user = await loginService.login(creds);
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    dispatch({
      type: 'LOGIN',
      data: user
    });
    dispatch(newMessage('successful login'));
  };
};
export const getUser = () => {
  return dispatch => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'));
    dispatch({
      type: 'GET',
      data: user
    });
  };
};
export const logout = () => {
  return dispatch => {
    window.localStorage.clear();
    dispatch({
      type: 'LOGOUT',
      data: null
    });
  };
};
export default reducer;