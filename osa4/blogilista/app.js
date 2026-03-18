const express = require('express')
const Blog = require('./models/blog') // tuodaan malli

const app = express()

// middleware
app.use(express.json())

// GET kaikki blogit
app.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

// POST uusi blogi
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

module.exports = app