import { createSlice } from "@reduxjs/toolkit";
import blogServices from '../services/blogs'
import { setNote } from "./NoteReducer";

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        createBlog(state, action) {
            return [...state, action.payload]
        },
        updateBlog(state, action) {
            return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
        },
        removeBlog(state, action) {

            return state.filter(blog => blog.id != action.payload)
        }
    }
})

export const getAction = () => {
    return async dispatch => {
        try {
            const blogs = await blogServices.getAll()
            dispatch(setBlogs(blogs))

        } catch (exception) {
            console.log(exception)
        }
    }
}

export const createBlogAction = (blog) => {
    return async dispatch => {
        try {
            const newBlog = await blogServices.createBlog(blog)
            dispatch(createBlog(newBlog))
            dispatch(setNote({ content: `Create blog ${blog.title} successfully`, checkError: false }))
        } catch (exception) {
            console.log(exception)
            const mssg = exception.response.data.error
            if (mssg == 'token expired') {
                alert('Login session ended, login again please')
                window.localStorage.removeItem('blogUser')
                window.location.reload()
                dispatch(setNote({ content: exception.response.data.error, checkError: true }))
            }
            dispatch(setNote({ content: exception.response.data.mssg, checkError: true }))
            setTimeout(() => {
                dispatch(setNote({ content: '', checkError: false }))
            }, 3000)
        }

    }
}

export const updateBlogAction = (blog, id) => {
    return async dispatch => {
        try {
            const newBlog = await blogServices.update(blog, id)
            dispatch(updateBlog(newBlog))
            dispatch(setNote({ content: `Update blog ${blog.title} successfully`, checkError: false }))
        } catch (exception) {
            console.log(exception)
            alert('Login session ended, login again please')
            window.localStorage.removeItem('blogUser')
            window.location.reload()
            dispatch(setNote({ content: exception.response.data.error, checkError: true }))
            setTimeout(() => {
                dispatch(setNote({ content: '', checkError: false }))
            }, 3000)
        }

    }
}

export const removeAction = (id) => {
    return async dispatch => {
        try {
            await blogServices.removeBlog(id)
            dispatch(removeBlog(id))
            dispatch(setNote({ content: 'Delete blog successfully', checkError: false }))
        } catch (exception) {
            console.log(exception)
            const mssg = exception.response.data.error
            if (mssg == 'token expired') {
                alert('Login session ended, login again please')
                window.localStorage.removeItem('blogUser')
                window.location.reload()
            } else if (mssg == 'You are not the one who created the blog') {
                dispatch(setNote({ content: exception.response.data.error, checkError: true }))
            } else {
                dispatch(setNote({ content: 'This blog has been deleted', checkError: true }))
            }
            setTimeout(() => {
                dispatch(setNote({ content: '', checkError: false }))
            }, 3000)
        }

    }
}


export const { createBlog, updateBlog, removeBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer