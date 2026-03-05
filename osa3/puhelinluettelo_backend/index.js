const express = require('express')
const morgan = require('morgan')
const app = express()

let persons = [
  { id: '1', name: 'Arto Hellas', number: '044-123456' },
  { id: '2', name: 'Ada Lovelace', number: '044-1977654' },
  { id: '3', name: 'Dan Abramov', number: '009-7899764' },
  { id: '4', name: 'Mary Poppendieck', number: '98-67-087643' },
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)
app.use(morgan('tiny')) //3.7. morganin lisääminen
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
//3.1 taulukko puhelinnumerotiedoista
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
//3.3. yksittäisen puhelinnumeron näyttäminen
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// 3.2: info-sivu
app.get('/info', (request, response) => {
  const maara = persons.length
  const nyt = new Date()

  response.send(`
    <div>
      <p>Phonebook has info for ${maara} people</p>
      <p>${nyt}</p>
    </div>
  `)
})

const generateId = () => {
  const maxId = 1000000
  return Math.floor(Math.random() * maxId) + 1
}
//3.5. + 3.6. tietojen lisäys
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name missing' })
  }
  if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  }

// 3.6: nimen pitää olla uniikki 
  const sameName = persons.some(p => p.name === body.name)
  if (sameName) {
    return response.status(400).json({ error: 'name must be unique' })
  }

// 3.5: id Math.randomilla
  let id = generateId()
// varmistetaan ettei osu olemassaolevaan (varmuuden vuoksi)
  while (persons.some(p => p.id === id)) {
    id = generateId()
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)
  response.status(201).json(person)
})

//3.4. tiedon poistaminen HTTP DELETE pyynnöllä
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})