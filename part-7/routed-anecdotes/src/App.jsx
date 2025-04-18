import { useState } from 'react'
import { BrowserRouter, Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import { useField } from './hooks'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h1>{anecdote.content}</h1>
      <div>has {anecdote.votes} votes</div>
      <div>For more info see <a href={`${anecdote.info}`}>{anecdote.info}</a></div>
    </div>
  )
}

const Menu = () => {
  const padding = {
    paddingRight: 5,
    textDecoration: `underline`,
    cursor: `pointer`
  }
  const navigate = useNavigate()
  return (
    <div>
      <a onClick={() => navigate('/')} style={padding}>anecdotes</a>
      <a onClick={() => navigate('/create')} style={padding}>create new</a>
      <a onClick={() => navigate('/about')} style={padding}>about</a>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  const padding = {
    paddingRight: 5,
    textDecoration: `underline`,
    cursor: `pointer`
  }
  const navigate = useNavigate()
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li style={padding} key={anecdote.id} onClick={() => navigate(`/anecdotes/${anecdote.id}`)}>{anecdote.content}</li>)}
      </ul>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField('text', 'content')
  const { reset: resetAuthor, ...author } = useField('text', 'author')
  const { reset: resetInfo, ...info } = useField('text', 'info')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input  {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const navigate = useNavigate()
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    setNotification(`A new anecdote "${anecdote.content}" created!`)
    setTimeout(() => {
      setNotification('')
    }, 3000)
  }
  console.log(anecdotes)
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const match = useMatch('/anecdotes/:id')

  const anecdote = match ? anecdoteById(Number(match.params.id)) : null
  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <Menu />
      {notification && <em>{notification}</em>}
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
