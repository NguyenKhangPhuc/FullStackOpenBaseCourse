import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import userService from './services/user'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs, updateBlog, updateBlogAction } from './reducers/BlogReducer'
import { useQuery } from '@tanstack/react-query'
import Note from './components/Note'
import { setUser } from './reducers/UserReducer'
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import { setExistedUser } from './reducers/ExistedUserReducer'
import axios from 'axios'


const BlogDetail = ({ blog, handleUpdateLikes, handleComment }) => {
  return (
    <div>
      <h1>Blog</h1>
      <h1>{blog?.title}</h1>
      <a href={`${blog?.url}`}>{blog?.url}</a>
      <div>Likes: {blog?.likes} <button onClick={() => handleUpdateLikes(blog)}>likes</button></div>
      <em>Added by {blog?.user.username}</em>
      <br />
      <h2>Comments</h2>
      <form onSubmit={(e) => handleComment(e, blog)}>
        <input placeholder='Write you comments' name='comment' />
        <button>comment</button>
      </form>
      {blog?.comments.map(cmt => {
        return (
          <li>{cmt}</li>
        )
      })}
    </div>
  )
}

const UserDetail = ({ user }) => {
  const navigate = useNavigate()
  const blogStyle = {
    textDecoration: 'underline',
    cursor: 'pointer'
  }
  return (
    <div>
      <h1>Blogs</h1>
      <h2>{user?.name} ***</h2>
      <h3>Added blogs</h3>
      {user?.blogs.map(b => {
        return (
          <li onClick={() => navigate(`/blogs/${b.id}`)} style={blogStyle}>{b.title}</li>
        )
      })}
    </div>
  )
}

const User = () => {
  const navigate = useNavigate()
  const existedUsers = useSelector(state => state.users)
  console.log(existedUsers)
  const userStyle = {
    textDecoration: 'underline',
    cursor: 'pointer'
  }
  return (
    <div>
      <h2>USERS</h2>
      {existedUsers?.map(u => {
        return (
          <div onClick={() => navigate(`/users/${u.id}`)} style={userStyle}>
            user: {u.username} ---- create: {u.blogs.length} blogs
          </div>
        )
      })}
    </div>
  )
}


const App = () => {
  const dispatch = useDispatch()

  const handleUpdateLike = async (blog) => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    dispatch(updateBlogAction(newBlog, blog.id))
  }

  const { isPending, data, isError, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  useEffect(() => {
    userService.getUsers().then(res => dispatch(setExistedUser(res)))
    dispatch(setBlogs(data))

    const loggedInUser = JSON.parse(window.localStorage.getItem('blogUser'))
    if (loggedInUser) {
      dispatch(setUser(loggedInUser))
      blogService.setToken(loggedInUser.token)
    }
  }, [data])

  const blogs = useSelector(state => {
    return state.blog
  })

  const user = useSelector(state => {
    return state.user
  })
  const users = useSelector(state => {

    return state.users
  })
  const handleLogout = () => {
    window.localStorage.removeItem('blogUser')
    dispatch(setUser(null))
    window.location.reload()
  }
  const handleComment = async (e, blog) => {
    e.preventDefault()
    const comment = e.target.comment.value
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      comments: blog.comments.concat(comment),
      user: blog.user.id
    }
    const response = await axios.post(`/api/blogs/${blog.id}/comment`, { comment })
    if (response.data) {
      console.log(response)
      dispatch(updateBlog(response.data))
    }
  }
  const matchUser = useMatch('/users/:userId')
  const matchBlog = useMatch('/blogs/:blogId')
  const foundedUser = matchUser ? users.find(u => u.id == matchUser.params.userId) : null
  const foundedBlog = matchBlog ? blogs.find(u => u.id == matchBlog.params.blogId) : null
  if (!user) {
    return (
      <LoginForm />
    )
  }
  return (

    <>
      <Link to='/'>blogs</Link>
      <Link to='/users'> users</Link>
      {user && <h1>{user?.name} logged in <button onClick={() => handleLogout()}>Logout</button></h1>}
      <Note />
      <Routes>
        <Route path='/users' element={<User />} />
        <Route path='/' element={<BlogForm handleUpdateLike={handleUpdateLike} />} />
        <Route path='/users/:userId' element={<UserDetail user={foundedUser} />} />
        <Route
          path='/blogs/:blogId'
          element={
            <BlogDetail
              blog={foundedBlog} h
              andleUpdateLikes={handleUpdateLike}
              handleComment={handleComment}
            />} />
      </Routes>
    </>


  )
}

export default App