import React from 'react'

const PersonsList = ({ personsToShow, handleDeletePerson }) => {
  return (
    <div>
      {personsToShow.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => handleDeletePerson(person.id)}>delete</button></p>)}
    </div>
  )
}

export default PersonsList