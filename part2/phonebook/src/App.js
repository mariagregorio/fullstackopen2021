import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import AddNew from './components/AddNew'
import PersonsList from './components/PersonsList'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState([])
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    personsService
      .getAllPersons()
      .then(personsRes => {
        setPersons(personsRes)
        setFilteredPersons(personsRes)
      })
  }, [])

  useEffect(() => {
    setTimeout(() => setNotification(null), 4000)
  }, [notification])

  const filterPersonsBy = (value, list) => {
    return list.filter(person => {
      const personName = person.name.toUpperCase()
      return personName.indexOf(value.toUpperCase()) !== -1
    })
  }

  const addPerson = (e) => {
    e.preventDefault()
    const personToUpdate = persons.find(person => person.name === newName.trim())
    if (!personToUpdate) {
      const newPerson = { 
        name: newName.trim(), 
        number: newNumber
      }
      personsService
        .createPerson(newPerson)
        .then(personRes => {
          setPersons(persons.concat(personRes))
          setNewName('')
          setNewNumber('')
          // in case the filter is applied, re-filter list with including the new person added
          if (filterValue !== '') {
            setFilteredPersons(filterPersonsBy(filterValue, [...persons, personRes]))
          }
          setNotification({type: 'success', message: `Added ${personRes.name}`})
        })
        .catch(() => {
          setNotification({type: 'error', message: `Could not add ${newName}`})
        })
      
    } else {
      const confirmChangeNumber = window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)
      if(confirmChangeNumber) {
        const updatedPerson = {...personToUpdate, number: newNumber}
        personsService
          .updatePerson(updatedPerson.id, updatedPerson)
          .then(personRes => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? personRes : person))
            setNewName('')
            setNewNumber('')
            setNotification({type: 'success', message: `Updated ${updatedPerson.name}'s number`})
          })
          .catch(() => {
            setNotification({type: 'error', message: `Could not update ${updatedPerson.name}'s number`})
          })
      }
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value)
    setFilteredPersons(filterPersonsBy(e.target.value, persons))
  }

  const handleDeletePerson = (id) => {
    const personTodelete = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`Are you sure you want to delete ${personTodelete.name}?`)
    if(confirmDelete) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification({type: 'success', message: `Deleted ${personTodelete.name}`})
        })
        .catch(() => {
          setNotification({type: 'error', message: `Could not delete ${personTodelete.name}`})
        })
    }
  }

  const personsToShow = filterValue === '' 
    ? persons
    : filteredPersons


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <AddNew addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonsList personsToShow={personsToShow} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App