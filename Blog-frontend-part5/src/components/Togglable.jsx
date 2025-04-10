import PropTypes from "prop-types"
import { useState } from "react"

const Togglable = (props) => {
    const [visibility, setVisibility] = useState(false)
    Togglable.propTypes = {
        title: PropTypes.string.isRequired
    }
    return (
        <div>
            {visibility ?
                <div>
                    {props.children}
                    <button onClick={() => setVisibility(!visibility)}>Cancle</button>
                </div> :
                <div>
                    <button onClick={() => setVisibility(!visibility)}>{props.title}</button>
                </div>
            }
        </div>
    )
}

export default Togglable