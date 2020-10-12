import React, { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName
    }

    let includes = false
    persons.forEach(person => {
      if (person.name === newName) {
        includes = true
      }
    })

    if (includes) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(noteObject))
    }

    setNewName('')
  }

  const handleFormChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleFormChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => 
          <Name key={person.name} name={person.name} />
        )}
      </div>
    </>
  )

}

export default App