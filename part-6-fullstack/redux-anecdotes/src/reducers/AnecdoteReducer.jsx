import { createSlice } from "@reduxjs/toolkit"
import services from '../services/Anecdotes'
import { useNoteDispatch, setNotify } from "./NotificationReducer"
// import { setNotifyAction } from "./NotificationReducer"



const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voting(state, action) {
      return state?.map(anecdote =>
        action.payload == anecdote.id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote)
    },
    creatingAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

// export const initializeAnecdotes = () => {
//   return async dispatch => {
//     try {
//       const initialState = await services.getAnecdotes()
//       console.log(initialState)
//       dispatch(setAnecdotes(initialState))
//     } catch (exception) {
//       console.log(exception)
//     }
//   }
// }

// export const addAction = (content) => {
//   return async dispatch => {
//     try {
//       const newAnecdote = await services.addAnecdote({ content, votes: 0 })
//       if (newAnecdote) {
//         dispatch(creatingAnecdote(newAnecdote))
//       }
//     } catch (exception) {
//       console.log(exception)
//     }
//   }
// }

// export const voteAction = (newAnecdote, id) => {

//   return async dispatch => {
//     try {
//       const response = await services.updateAnecdote(newAnecdote, id)
//       dispatch(voting(id))
//     } catch (exception) {
//       console.log(exception)
//     }

//   }
// }

export const { voting, creatingAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;