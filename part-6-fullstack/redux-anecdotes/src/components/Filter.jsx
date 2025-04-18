import { useDispatch } from "react-redux"
import { filterAction } from "../reducers/FilterReducer"
const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch(filterAction(event.target.value))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter