import React, { useState, useEffect } from "react";
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import service from './services/service'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')


  useEffect(() => {
    service.getAll()
      .then(request => {
        setPersons(request);
      })
      .catch(e => e);
  }, []);
  const handleChange = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }
  const handleNum = (e) => {
    e.preventDefault()
    setNewNumber(e.target.value)
  }
  const changeSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const addName = (e) => {
    e.preventDefault()
    const p = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(per => per.name === p.name)) {
      const id = persons.find(pr => pr.name === p.name).id
      if (window.confirm(`${p.name} is already added to phonebook. Do you want to replace the old number with a new one?`)) {
        service.update(id, p)
          .then(request => {
            setPersons(persons.map(p => p.id === id ? request : p))
            setNewNumber('')
            setNewName('')
          })
          .catch(() => {
            setMessage(`Information of ${p.name} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
        setMessage(`${p.name}'s number is updated to ${p.number}`)
        setTimeout(() => { setMessage(null) }, 5000)


      }
      return;
    }
    service.create(p)
      .then(request => {
        setPersons(persons.concat(request))
      })
    setMessage(`${p.name} is added to the phonebook`)
    setTimeout(() => { setMessage(null) }, 5000)
    setNewNumber('')
    setNewName('')
  }
  const handleRemove = (e) => {
    let obj = persons[e.target.id];
    if (window.confirm(`Do you really want to delete ${obj.name}?`)) {
      service.remove(obj.id)
    }
    else {
      return false;
    }
  }

  const view = !search ?
    persons : persons.filter(p => p.name.toLowerCase().startsWith(search))
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter
        persons={persons}
        changeSearch={changeSearch} />
      <h2>Add a new</h2>
      <PersonForm addName={addName}
        newName={newName}
        handleChange={handleChange}
        newNumber={newNumber}
        handleNum={handleNum} />
      <h2>Numbers</h2>
      <Persons view={view}
        handleRemove={handleRemove}
      />
    </div>
  )
}
export default App
