import React from 'react'
import { useSelector } from 'react-redux'

const Note = () => {
    const note = useSelector(state => state.note)
    const successStyle = {
        color: 'green',
        height: 'auto',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
    return (
        <>
            {note.content && <div style={note.checkError ? errorStyle : successStyle}>{note.content}</div>}
        </>
    )
}

export default Note