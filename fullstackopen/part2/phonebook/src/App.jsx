import { useEffect, useState } from 'react'
import person from './services/person'
const Filter = ({ onChange }) => {
  return (
    <div>Filter shown with name <input onChange={(e) => onChange(e.target.value)} /></div>
  )
}

const PersonForm = ({ onSubmit, onChange, newName, setNewName, newNumber, setNewNumber }) => {
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div>
        name: <input value={newName} onChange={(e) => onChange(e, setNewName)} />
      </div>

      <div>
        number: <input value={newNumber} onChange={(e) => onChange(e, setNewNumber)} />
      </div>

      <div>
        <button type="submit" >add</button>
      </div>

    </form>
  )
}

const Persons = ({ persons, onClick }) => {
  return (
    <>
      {persons?.map((person, index) => {
        return (
          <div key={`${person.name} ${index}`}>
            {person.name} {person.number}
            <button onClick={() => onClick(person._id, person.name)}>Delete</button>
          </div>
        )
      })}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [copyPersons, setCopyPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('')
  const [checkError, setCheckError] = useState(false)

  useEffect(() => {
    console.log('effect')
    handleGet()
  }, [])

  let timeoutId
  const messageTimeout = () => {
    timeoutId = setTimeout(() => {
      setMessage('')
      console.log('Time out:', message)
    }, 5000)
  }

  const handleGet = () => {
    person.getAll()
      .then(startingPersons => {
        setPersons(startingPersons)
        setCopyPersons(startingPersons)
      })
      .catch(err => console.log(err))
  }

  const handleOnChange = (e, setValue) => {
    console.log(e.target.value)
    setValue(e.target.value)
  }

  const handleError = () => {
    clearTimeout(timeoutId)
    setCheckError(true)
    setMessage(`The person ${newName} was already deleted from server`)
    messageTimeout()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(
        `${newName} is already added to the phonebook, 
        replace the old number with the new one?`
      )) {
        const pers = persons.find(p => p.name === newName)
        const changedPerson = { ...pers, number: newNumber }
        let i = pers._id
        person.update(i, changedPerson)
          .then(response => {
            console.log(response)
            let newPersons = [...persons]
            let index = newPersons.indexOf(pers)
            newPersons[index] = response
            console.log(newPersons)
            setPersons(newPersons)
            setCopyPersons(newPersons)
            clearTimeout(timeoutId)
            setCheckError(false)
            setMessage(`Update ${newName} 's number successfully`)
            messageTimeout()
          })
          .catch(err => {
            console.log(err)
            clearTimeout(timeoutId)
            setCheckError(true)
            setMessage(err.response.data.error)
            messageTimeout()
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      person.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setCopyPersons(persons.concat(response))
          clearTimeout(timeoutId)
          setCheckError(false)
          setMessage(`Add person ${newName} successfully`)
          messageTimeout()
        })
        .catch(err => {
          console.log(err)
          clearTimeout(timeoutId)
          setCheckError(true)
          setMessage(err.response.data.error)
          messageTimeout()
        })
    }
  }

  const handleFilter = (value) => {
    const newPersons = copyPersons.filter((person) => {
      return person.name.toLowerCase().includes(value.toLowerCase())
    })
    console.log(newPersons, 'and', copyPersons)
    setPersons(newPersons)
  }


  const handleDelete = (i, name) => {
    if (window.confirm(`Delete ${name}?`))
      person.deletingPerson(i)
        .then(response => {
          console.log(response)
          handleGet()
          clearTimeout(timeoutId)
          setCheckError(false)
          setMessage(`Delete ${name} successfully`)
          messageTimeout()
        })
        .catch(err => {
          console.log(err)
          handleError()
        })
  }
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
    <div>
      {message !== '' && <div style={checkError ? errorStyle : successStyle}>{message}</div>}
      <h2>Phonebook</h2>
      <Filter onChange={handleFilter} />
      <h2>Add new</h2>
      <PersonForm onSubmit={handleSubmit} onChange={handleOnChange} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} onClick={handleDelete} />
    </div>
  )
}

export default App