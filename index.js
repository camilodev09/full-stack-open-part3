require('dotenv').config() // Must be loaded first
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const personsRouter = require('./routes/persons')

const app = express()

// Global Middlewares
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

// Custom Morgan token for logging POST request bodies
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Root Endpoint
app.get('/', (req, res) => {
  res.send('<h1>Phonebook Backend API</h1>')
})

// Info Endpoint
app.info = app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(count => {
      const currentDate = new Date()
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${currentDate}</p>
      `)
    })
    .catch(error => next(error))
})

// Mount Modular Router Gateway
app.use('/api/persons', personsRouter)

// Centralized Error Handler Middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})