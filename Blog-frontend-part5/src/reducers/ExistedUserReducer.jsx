import { createSlice } from "@reduxjs/toolkit";


const existedUsersSlice = createSlice({
    name: 'existed user',
    initialState: [],
    reducers: {
        setExistedUser(state, action) {
            return action.payload
        },
        updateRemoveBlog(state, action) {
            return state.map(u => {
                if (u.username == action.payload.username) {
                    return { ...u, blogs: u.blogs.filter(b => b.id != action.payload.receivedBlog.id) }
                }
                return u
            })
        },
        updateCreateBlog(state, action) {
            return state.map(u => {
                if (u.username == action.payload.username) {
                    return { ...u, blogs: u.blogs.concat(action.payload.newBlog) }
                }
                return u
            })
        }
    }
})

export const { setExistedUser, updateRemoveBlog, updateCreateBlog } = existedUsersSlice.actions
export default existedUsersSlice.reducer