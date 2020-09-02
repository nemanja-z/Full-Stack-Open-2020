import blogService from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data;
  case 'NEW':
    return state.concat(action.data);
  case 'LIKE': {
    const { id } = action.data;
    const target = state.find(s => s.id === id);
    const changed = {
      ...target,
      likes: target.likes + 1
    };
    return state.map(s => s.id === id ? changed : s);
  }
  case 'COMMENT': {
    const { id } = action.data;
    return state.map(s => s.id === id ? action.data : s);
  }
  case 'DELETE': {
    return state.filter(blog => blog !== action.data);
  }
  default:
    return state;
  }
};

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT',
      data: blogs
    });
  };
};
export const addBlogs = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: 'NEW',
      data: newBlog
    });
  };
};
export const likeBlog = (blog) => {
  return async dispatch => {
    const update = await blogService.update(blog);
    dispatch({
      type: 'VOTE',
      data: update
    });
  };
};
export const commentBlog = (id, comment) => {
  return async dispatch => {
    const commented = await blogService.postComment(id, { comment });
    dispatch({
      type: 'COMMENT',
      data: commented
    });
  };
};
export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog);
    dispatch({
      type: 'DELETE',
      data: blog
    });

  };
};
export default reducer;