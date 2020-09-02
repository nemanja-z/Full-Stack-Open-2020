
const reducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD':
    return action.data;
  case 'CLEAR':
    return null;
  default:
    return state;
  }
};
export const clearMessage = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAR'
    });
  };
};
export const newMessage = (message, time = 5) => {
  return async dispatch => {
    dispatch({
      type: 'ADD',
      data: message
    });
    setTimeout(() => dispatch(clearMessage()), time * 1000);
  };
};
export default reducer;