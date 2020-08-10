import React, { useState, useEffect } from "react";
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import service from './services/service';
import Notification from './components/Notification';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');


  useEffect(() => {
    service.getAll()
      .then(request =>
        setPersons(request)
      )
      .catch(e => console.log(e.response));
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  }
  const handleNum = (e) => {
    e.preventDefault();
    setNewNumber(e.target.value);
  }
  const changeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const addName = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(per => per.name === newPerson.name)) {
      const id = persons.find(pr => pr.name === newPerson.name).id;
      if (window.confirm(`${newPerson.name} is already added to phonebook. Do you want to replace the old number with a new one?`)) {
        service.update(id, newPerson)
          .then(request => {
            setPersons(persons.map(person => person.id === id ? request : person));
            setNewNumber('');
            setNewName('');
            setMessage(`${newPerson.name}'s number is updated to ${newPerson.number}`);
            setTimeout(() => { setMessage(null) }, 5000);
          })
          .catch(() => {
            setMessage(`Information of ${newPerson.name} has already been removed from server`);
            setTimeout(() => {
              setMessage(null)
            }, 5000);
          })
      }
      return;
    }
    service.create(newPerson)
      .then(request => {
        setPersons(persons.concat(request));
        setMessage(`${newPerson.name} is added to the phonebook`);
        setTimeout(() => { setMessage(null) }, 5000);
        setNewNumber('');
        setNewName('');
      })
      .catch(error => {
        console.log(JSON.stringify(error.response.data),'error')
        const message = JSON.stringify(error.response.data);
        setMessage(`${message}`);
        setTimeout(() => { setMessage(null) }, 5000);
      })
  }

  const handleRemove = (e) => {
    const personRemove = persons.find(person=>person.id===e.target.id);
    if (window.confirm(`Do you really want to delete ${personRemove.name}?`)) {
      service.remove(personRemove.id)
      .then(()=>
        setPersons(persons.filter(person=>person.id!==personRemove.id)));
    }
    return;
  }

  const view = !search ?
                persons: 
                persons.filter(person => person.name.toLowerCase().startsWith(search));
 
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
export default App;
