import React from 'react'
import {
  Link
} from 'react-router-dom'

const Blog = ({ blog }) => {
  /*  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes) */
  //const dispatch = useDispatch()
  if (blog === undefined) return null
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  /* const updateLikes = async (blog) => {
    blog.likes = blog.likes + 1
    dispatch(likeBlog(blog))
    setLikes(blog.likes)
  }
  const showRemove = () => {
    if (blog.user.name === user.username) {
      return <button onClick={() => removeBlog(blog)}>delete</button>

    }
  }
  const toggleShow = () => setShowAll(!showAll)
  if (showAll) {
    return (
      <div className='blog' style={blogStyle}>
        <button onClick={toggleShow}>show less</button>
        <div>
          <p>{blog.title}</p>
        </div>
        <div>
          <p>{blog.author}</p>
        </div>
        <div className='more'>
          <p>{blog.url}</p>
        </div>
        <div style={{ display: 'flex' }} className='more'>
          <p data-testid='likes'>{likes}</p>
          <button onClick={() => updateLikes(blog)} className='like-update'>like</button>
        </div>
        {showRemove()}
      </div>)
  }
 */
  return (
    <div className='blog' style={blogStyle}>
      <p><Link to={`/blogs/${blog.id}`}>{`${blog.title} ${blog.author}`}</Link></p>
    </div>)
}

export default Blog
//      <button onClick={toggleShow}>show more</button>