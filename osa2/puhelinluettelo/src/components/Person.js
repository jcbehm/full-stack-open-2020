import React from 'react'
import personService from '../services/persons'

const Person = ({person, persons, setPersons}) => {

  const deletePerson = () => {
    
    if (window.confirm(`Delete ${person.name} ?`)) {
      const copy = [...persons]
      copy.splice(persons.indexOf(person), 1)

      return (
        <>
          {console.log('will delete')}
          {personService.erase(person.id)}
          {setPersons(copy)}
        </>
      )

    } else {

      return (
        <>
          {console.log('not deleted')}
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