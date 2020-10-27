import React from 'react'
import personService from '../services/persons'

const Person = ({ person, persons, setPersons, setMessage }) => {

  const deletePerson = () => {

    if (window.confirm(`Delete ${person.name} ?`)) {
      const copy = [...persons]
      copy.splice(persons.indexOf(person), 1)
      personService.erase(person.id)
      setPersons(copy)
      setMessage(
        `Deleted ${person.name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

    return (
      <>
      </>
    )

  }
  return (
    <p className='person'>
      {person.name} {person.number} <button onClick={deletePerson}>delete</button>
    </p>
  )
}

export default Person