import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'NEW':
      return state.concat(action.data)
    case 'VOTE': {
      const { id } = action.data
      const updated = state.find(s => s.id === id)
      const changed = {
        ...updated,
        votes: updated.votes + 1
      }
      return state.map(s => s.id === id ? changed : s)
    }
    case 'DELETE': {
      const { id } = action.data
      return [...state.filter(s => s.id !== id)]
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
export const voteBlog = (blog) => {
  return async dispatch => {
    const update = await blogService.update(blog)
    dispatch({
      type: 'VOTE',
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