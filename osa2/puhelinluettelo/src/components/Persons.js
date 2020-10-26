import React from 'react'
import Person from './Person'



const Persons = ({personsToShow, persons, setPersons}) => {

    return (
        <>
            {personsToShow.map((person) =>
                <div key={person.name}>
                    <Person
                    key={person.name}
                    person={person}
                    persons={persons}
                    setPersons={setPersons} />
                </div>
            )}
        </>
    )
}

export default Persons