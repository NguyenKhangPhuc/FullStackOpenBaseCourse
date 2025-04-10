import React from "react"
import PropTypes from "prop-types"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../reducers/UserReducer"
import blogService from '../services/blogs'
import loginService from '../services/login'
const LoginForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({ username, password })

            dispatch(setUser(user))
            blogService.setToken(user.token)
            window.localStorage.setItem('blogUser', JSON.stringify(user))
        } catch (exception) {
            console.log(exception)
            dispatch(setNote({ content: 'Wrong credential', checkError: true }))
        }
    }
    return (
        <>
            <h1>Login to the application</h1>
            <form onSubmit={handleSubmit}>
                <div><div>username</div> <input type='text' data-testid='username' value={username} onChange={(e) => setUsername(e.target.value)} /></div>
                <div><div>password</div> <input type='password' data-testid='password' value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                <button type='submit'>Login</button>
            </form>
        </>
    )
}

export default LoginForm