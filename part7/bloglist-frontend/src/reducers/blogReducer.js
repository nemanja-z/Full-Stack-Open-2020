import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'NEW':
      return state.concat(action.data)
    case 'LIKE': {
      const { id } = action.data
      const updated = state.find(s => s.id === id)
      const changed = {
        ...updated,
        likes: updated.likes + 1
      }
      return state.map(s => s.id === id ? changed : s)
    }
    case 'COMMENT': {
      const { id } = action.data
      const updated = state.find(s => s.id === id)
      const changed = {
        ...updated,
        comment: action.comment
      }
      return state.map(s => s.id === id ? changed : s)
    }
    case 'DELETE': {
      const { id } = action.data
      return state.filter(s => s.id !== id)
    }
    default:
      return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}
export const addBlogs = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW',
      data: newBlog
    })
  }
}
export const likeBlog = (blog) => {
  return async dispatch => {
    const update = await blogService.update(blog)
    dispatch({
      type: 'VOTE',
      data: update
    })
  }
}
export const commentBlog = (id, comment) => {
  return async dispatch => {
    const update = await blogService.comment(id, comment)
    dispatch({
      type: 'COMMENT',
      data: update
    })
  }
}
export const deleteBlog = (blog) => {
  return async dispatch => {
    const remove = await blogService.remove(blog)
    dispatch({
      type: 'DELETE',
      data: remove
    })

  }
}
export default reducer