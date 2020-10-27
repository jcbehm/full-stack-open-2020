import React from 'react'
import personService from '../services/persons'

const Person = ({person, persons, setPersons}) => {

  const deletePerson = () => {
    
    if (window.confirm(`Delete ${person.name} ?`)) {
      const copy = [...persons]
      copy.splice(persons.indexOf(person), 1)

      return (
        <>
          {personService.erase(person.id)}
          {setPersons(copy)}
        </>
      )

    } else {

      return (
        <>
        </>
      )

    }
    /* 

*/

  }
  return (
    <p>
      {person.name} {person.number} <button onClick={deletePerson}>delete</button>
    </p>
  )
}

export default Person