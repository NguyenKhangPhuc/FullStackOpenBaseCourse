import { useDispatch } from "react-redux"
import { creatingAnecdote } from "../reducers/AnecdoteReducer"
import { useMutation } from "@tanstack/react-query"
import services from '../services/Anecdotes'
import { setNotify, useNoteDispatch } from "../reducers/NotificationReducer"
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const noteDispatch = useNoteDispatch()
    const anecdoteMutation = useMutation({
        mutationFn: services.addAnecdote,
        onSuccess: (result) => {
            dispatch(creatingAnecdote(result))
        },
    })
    const submitAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value;
        e.target.anecdote.value = '';
        if (content.length < 5) {
            noteDispatch(setNotify('Content length cannot < 5'))
            setTimeout(() => {
                noteDispatch(setNotify(''))
            }, 5000)
        } else {
            anecdoteMutation.mutate({
                content,
                votes: 0
            })
        }


    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={submitAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}
export default AnecdoteForm