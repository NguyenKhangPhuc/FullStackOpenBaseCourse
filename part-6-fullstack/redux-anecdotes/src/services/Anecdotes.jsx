import axios from "axios"
const getAnecdotes = async () => {
    const response = await axios.get('http://localhost:3005/anecdotes')
    return response.data
}
const addAnecdote = async (newAnecdote) => {
    const response = await axios.post('http://localhost:3005/anecdotes', newAnecdote)
    return response.data
}

const updateAnecdote = async (newAnecdote) => {
    console.log(newAnecdote)
    const response = await axios.put(`http://localhost:3005/anecdotes/${newAnecdote.id}`, newAnecdote)
    return response.data
}

export default {
    getAnecdotes,
    addAnecdote,
    updateAnecdote
}