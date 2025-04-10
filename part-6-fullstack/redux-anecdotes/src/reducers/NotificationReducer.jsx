// import { createSlice } from "@reduxjs/toolkit";

import { createContext, useContext, useReducer } from "react"


// const notifySlice = createSlice({
//     name: 'notify',
//     initialState: '',
//     reducers: {
//         setNotify(state, action) {
//             return action.payload
//         },
//     }
// })

// export const setNotifyAction = (content, time) => {
//     return async dispatch => {
//         dispatch(setNotify(content))
//         setTimeout(() => {
//             dispatch(setNotify(''))
//         }, time * 1000);
//     }
// }

// export const { setNotify } = notifySlice.actions
// export default notifySlice.reducer

const noteReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTE':
            return action.payload
        default:
            return state
    }
}

export const setNotify = (content) => {
    return { type: 'SET_NOTE', payload: content }
}

export const NoteContext = createContext()

export const NoteContextProvide = (props) => {
    const [note, noteDispatch] = useReducer(noteReducer, '')
    return (
        <NoteContext.Provider value={[note, noteDispatch]}>
            {props.children}
        </NoteContext.Provider>
    )
}



export const useNote = () => {
    const noteAndDispatch = useContext(NoteContext)
    return noteAndDispatch[0]
}

export const useNoteDispatch = () => {
    const noteAndDispatch = useContext(NoteContext)
    return noteAndDispatch[1]
}