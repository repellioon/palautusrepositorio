require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const Person = require('./models/person')

const app = express()

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

//3.13.
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

//3.3., 3.13. yksittäisen puhelinnumeron näyttäminen
app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
    response.json(person)
  })
})

// 3.2: info-sivu
app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    const maara = persons.length
    const nyt = new Date()

    response.send(`
      <div>
        <p>Phonebook has info for ${maara} people</p>
        <p>${nyt}</p>
      </div>
    `)
  })
})

//3.5. + 3.6. + 3.13.-.14 tietojen lisäys
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name missing' })
  }
  if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
      response.json(savedPerson)
    })

// 3.6: nimen pitää olla uniikki 
  /*const sameName = persons.some(p => p.name === body.name)
  if (sameName) {
    return response.status(400).json({ error: 'name must be unique' })
  }*/

  //persons = persons.concat(person)
  //response.status(201).json(person)
})

//3.4. tiedon poistaminen HTTP DELETE pyynnöllä
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})