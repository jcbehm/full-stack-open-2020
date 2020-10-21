import React from 'react'
import personService from '../services/persons'

const PersonForm = (props) => {
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: props.newName,
      number: props.newNumber
    }

    let includes = false
    props.persons.forEach(person => {
      if (person.name === props.newName) {
        includes = true
      }
    })

    if (includes) {
      window.alert(`${props.newName} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          props.setPersons(props.persons.concat(returnedPerson))
        })
    }

    props.setNewName('')
    props.setNewNumber('')
  }

  const handleNameChange = (event) => {
    props.setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    props.setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name:
            <input
          value={props.newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number:
              <input
          value={props.newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm