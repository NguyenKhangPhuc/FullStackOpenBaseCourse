import { useDispatch, useSelector } from "react-redux"
import { useNote } from "../reducers/NotificationReducer"
const Notification = () => {
  const message = useNote()
  console.log(message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    message == '' ? <div></div> : <div style={style}>{message}</div>
  )
}

export default Notification