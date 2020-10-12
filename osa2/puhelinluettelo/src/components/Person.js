import React from 'react'

const Name = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

export default Name