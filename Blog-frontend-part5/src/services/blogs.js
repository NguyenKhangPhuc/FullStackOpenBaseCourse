import axios from 'axios'
export const baseUrl = '/api/blogs'
let token = ''

const setToken = (receivedToken) => {
  token = `Bearer ${receivedToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (newBlog, id) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  const response = await axios.put(baseUrl + `/${id}`, newBlog, config)
  return response.data
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(response)
  return response.data
}

export default { getAll, setToken, createBlog, update, removeBlog }