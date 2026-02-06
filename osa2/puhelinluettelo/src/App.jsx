import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Persons = ({personsToShow, deleteInfo}) => {
  return (
    <ul>
      {personsToShow.map(person => (
        <li key={person.id}> 
          {person.name} : {person.number} 
          <button onClick = {() => deleteInfo(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  )
}

const Filter = ({searchQuery,handleSearch}) => {
  return (
    <div>
        Filter shown with <input value = {searchQuery} 
        onChange = {handleSearch} />
    </div>
  )
}

const Form = ({addInfo, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit = {addInfo}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>  
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
  </form> 
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('') 
  const [searchQuery,setSearchQuery] = useState('')
  const [notification, setNotification] = useState(null)   
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification(message)
    setNotificationType(type)
    setTimeout(() => setNotification(''), 5000)
  }

  const handleSearch = (event) =>{
    setSearchQuery(event.target.value)
  }

  const addInfo = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if(existingPerson) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    
    if(confirm) {
      const updatedPerson = {
        ...existingPerson,
        number : newNumber
      }
    
      personService
      .update(existingPerson.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(
          persons.map(person =>
            person.id !== existingPerson.id ? person : returnedPerson
          )
        )
        setNewName('')
        setNewNumber('')
        setNotification('')
        showNotification(`Changed ${existingPerson.name} information`, 'success')
          setTimeout(() => {
          setNotification(null)
        }, 5000)
      })

      .catch(() => {
        setNotification(
          `Information of ${updatedPerson.name} has already been removed from server`,
          'error'
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
    }
    return
  }

    const newObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(newObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${returnedPerson.name}`, 'success')
          setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const deleteInfo = (id) => {
    if (window.confirm('do you want to delete this record?')) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
        showNotification('Record deleted', 'error')
            setTimeout(() => {
            setNotification(null)
          }, 5000)
    })
  }
}

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message = {notification} type = {notificationType} />
      <Filter searchQuery = {searchQuery} handleSearch = {handleSearch} />
      
      <h2>add a new</h2>

      <Form addInfo = {addInfo} 
      newName = {newName}
      newNumber = {newNumber}
      handleNameChange = {handleNameChange} 
      handleNumberChange = {handleNumberChange} />

      <h2>Numbers</h2>

      <Persons personsToShow = {personsToShow}  deleteInfo = {deleteInfo} />
    </div>
  )
}

export default App
