import { useSelector, useDispatch } from "react-redux"
import services from '../services/Anecdotes'
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { setAnecdotes, voting } from "../reducers/AnecdoteReducer"
import { setNotify, useNoteDispatch } from "../reducers/NotificationReducer"
const AnecdoteList = () => {
    const noteDispatch = useNoteDispatch()
    const voteMutation = useMutation({
        mutationFn: services.updateAnecdote,
        onSuccess: (res) => {
            dispatch(voting(res.id))
            noteDispatch(setNotify(`Vote "${res.content}" successfully`))
            setTimeout(() => {
                noteDispatch(setNotify(``))
            }, 5000)
        }
    })
    const dispatch = useDispatch()
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['anecdotes'],
        queryFn: services.getAnecdotes,
        retry: 1
    })


    useEffect(() => {
        dispatch(setAnecdotes(data))
    }, [data])


    const anecdotes = useSelector(state => {
        let anecdoteOuput;
        anecdoteOuput = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
        anecdoteOuput = [...anecdoteOuput].sort((a, b) => b.votes - a.votes)
        return anecdoteOuput
    })
    const vote = (anecdote) => {
        const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
        voteMutation.mutate(newAnecdote)
    }
    if (isLoading) {
        return <span>Loading</span>
    } else if (isError) {
        return <span>Services not available</span>
    } else {
        return (
            <>
                <h2>Anecdotes</h2>
                {anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
            </>
        )
    }
}

export default AnecdoteList