import { useState } from "react"
import { useDispatch } from "react-redux"
import { removeAction } from "../reducers/BlogReducer"
import { useNavigate } from "react-router-dom"
import { updateRemoveBlog } from "../reducers/ExistedUserReducer"

const Blog = ({ blog, user, handleUpdateLike }) => {
  console.log(blog)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [detailVisibility, setDetailVisibility] = useState(false)
  const toggleDetail = () => {
    setDetailVisibility(true)
  }


  const handleRemoveBlog = async (blog) => {
    if (window.confirm('Delete the blog?')) {
      dispatch(removeAction(blog.id))
      dispatch(updateRemoveBlog({ receivedBlog: blog, username: user.user }))
    }
  }

  const blogStyle = {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div className="blog" style={blogStyle}>
      <div>{blog.title}</div>
      <div>{blog.author}</div>
      <div>
        {detailVisibility ?
          <button onClick={() => setDetailVisibility(false)}>close</button>
          :
          <button onClick={() => toggleDetail()}>view</button>
        }
        <button onClick={() => navigate(`blogs/${blog.id}`)}>Go detail</button>
        {detailVisibility &&
          <div>
            <div >url: {blog.url}</div>
            <div onClick={() => handleUpdateLike(blog)} style={{ display: 'flex' }}>
              <div>likes:</div>
              <div data-testid='likes'>{blog.likes}</div>
              <button>like</button>
            </div>
            <div>user's name: {blog.user ? blog.user.name : 'none'}</div>
          </div>
        }
      </div>
      {user.user == blog.user?.username && <button onClick={() => handleRemoveBlog(blog)}>Delete</button>}
    </div>
  )
}

export default Blog