import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
const [persons, setPersons] = useState([])
  /*
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  */
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showingFilter, setShowingFilter] = useState('')
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
      console.log('effect')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promise fulfilled')
          setPersons(response.data)
        })
    }, [])
  
    console.log('render', persons.length, 'persons')



  const handleFilterChange = (event) => {
    setShowingFilter(event.target.value)
    if (event.target.value === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(showingFilter.toLowerCase()))

  return (
    <>
      <h2>Phonebook</h2>
      filter shown with
      <input
        value={showingFilter}
        onChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
      />
    </>
  )

}

export default App