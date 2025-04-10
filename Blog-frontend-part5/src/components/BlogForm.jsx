import { useState } from "react"
import Togglable from "./Togglable"
import { useDispatch, useSelector } from "react-redux"
import { createBlogAction } from "../reducers/BlogReducer"
import { setUser } from "../reducers/UserReducer"
import Blog from "./Blog"
import { updateCreateBlog } from "../reducers/ExistedUserReducer"
const BlogForm = ({ handleUpdateLike }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blog)
    const handleCreateBlog = async (receivedBlog) => {
        dispatch(createBlogAction(receivedBlog))
        dispatch(updateCreateBlog({ newBlog: receivedBlog, username: user.user }))
    }
    const addBlog = (e) => {
        e.preventDefault()
        handleCreateBlog({ title, author, url })
    }
    return (
        <div>
            <Togglable title={'Create blog'}>
                <form onSubmit={addBlog}>
                    <h2>Create new blog</h2>
                    <div>Title: <input type='text' data-testid='title' placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                    <div>Author: <input type='text' data-testid='author' placeholder="author" value={author} onChange={(e) => setAuthor(e.target.value)} /></div>
                    <div>url: <input type='text' data-testid='url' placeholder="url" value={url} onChange={(e) => setUrl(e.target.value)} /></div>
                    <button type='submit'>Create</button>
                </form>
            </Togglable>
            {blogs.map(b => {
                return (
                    <Blog blog={b} user={user} handleUpdateLike={handleUpdateLike} />
                )
            })}
        </div>
    )
}
export default BlogForm