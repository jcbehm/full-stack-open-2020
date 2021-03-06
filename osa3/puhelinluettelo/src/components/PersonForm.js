import React from 'react'
import personService from '../services/persons'

const PersonForm = (props) => {
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: props.newName,
      number: props.newNumber
    }

    let replacable = {}
    let includes = false
    props.persons.forEach(person => {
      if (person.name === props.newName) {
        includes = true
        replacable = person
      }
    })

    if (includes) {
      if (window.confirm(
        `${props.newName} is already added to phonebook, replace the old number with a new one?`)) {

        personService
          .update(replacable.id, personObject)
          .then(returnedPerson => {
            props.setPersons(props.persons.map(person => person.name !== personObject.name ? person : returnedPerson))
          })
          .catch(error => {
            props.setMessage(
              `Error: Information of ${personObject.name} has already been removed from server`
            )
            setTimeout(() => {
              props.setMessage(null)
            }, 5000)
            console.log(error)
            props.setPersons(props.persons.filter(n => n.id !== replacable.id))
          })

        props.setMessage(
          `Updated ${personObject.name}`
        )
        setTimeout(() => {
          props.setMessage(null)
        }, 5000)
      }

    } else {
      personService
        .create(personObject)
        .then(createdPerson => {
          props.setPersons(props.persons.concat(createdPerson))
          props.setMessage(
            `Added ${personObject.name}`
          )
          setTimeout(() => {
            props.setMessage(null)
          }, 5000)
        })
        .catch(error => {
          props.setMessage(
            `Error: ${error.response.data.error}`
          )
          setTimeout(() => {
            props.setMessage(null)
          }, 5000)
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