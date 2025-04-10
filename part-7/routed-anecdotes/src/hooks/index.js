import { useState } from "react";

export const useField = (type, name) => {
    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        value,
        name,
        type,
        onChange,
        reset,
    }
}