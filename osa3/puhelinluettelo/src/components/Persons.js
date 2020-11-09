import React from 'react'
import Person from './Person'



const Persons = ({personsToShow, persons, setPersons, setMessage}) => {

    return (
        <>
            {personsToShow.map((person) =>
                <div key={person.name}>
                    <Person
                    key={person.name}
                    person={person}
                    persons={persons}
                    setPersons={setPersons}
                    setMessage={setMessage} />
                </div>
            )}
        </>
    )
}

export default Persons