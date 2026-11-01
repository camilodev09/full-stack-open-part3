const express = require('express')
const cors = require('cors') 
const morgan = require('morgan')
const app = express()

// Middleware crucial para parsear JSON entrante en peticiones POST
app.use(cors())
app.use(express.json())

// Middleware morgan
morgan.token('body', (req)=>{
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

//Configure morgan with custom logging string pattern
app.use(morgan(' :method :url :status :res[content-lenght] - :response-time ms :body'))


// Base de datos en memoria (In-Memory Data Store) works as a heap
let persons = [
  { 
    id: "1", 
    name: "Arto Hellas", 
    number: "040-123456" 
  },
  { 
    id: "2", 
    name: "Ada Lovelace", 
    number: "39-44-5128523" 
  },
  { 
    id: "3", 
    name: "Dan Abramov", 
    number: "12-43-234345" 
  },
  { 
    id: "4", 
    name: "Mary Poppendieck", 
    number: "39-23-6423222" 
  }
]

// 1. Root Endpoint  
app.get('/', (req, res) => {
  res.send('<h1>Phonebook Backend API</h1>')
})

// 2. Exercise 3.1 & 3.3: Get all persons resource (/api/persons)[cite: 19]
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// 3. Exercise 3.2: Info endpoint (Cantidad de registros + timestamp actual)[cite: 20]
app.get('/info', (req, res) => {
  const count = persons.length
  const currentDate = new Date()
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${currentDate}</p>
  `)
})

// 4. Exercise 3.3: Get single resource by ID (/api/persons/:id)[cite: 14, 20]
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end() // Not found error handling[cite: 15]
  }
})

// 5. Exercise 3.4: Delete resource by ID (/api/persons/:id)[cite: 16, 20]
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)

  // Responde con 204 No Content si se elimina exitosamente
  res.status(204).end()
})

// Función auxiliar para generar un ID aleatorio robusto
const generateId = () => {
  return String(Math.floor(Math.random() * 1000000))
}

// 6. Exercise 3.5 & 3.6: POST new person with validation guards (/api/persons)[cite: 18, 20]
app.post('/api/persons', (req, res) => {
  const body = req.body

  // Guarda de validación (Exercise 3.6): Validar campos faltantes[cite: 18, 20]
  if (!body.name || !body.number) {
    return res.status(400).json({  
      error: 'name or number missing' 
    })
  }

  // Guarda de validación: Evitar nombres duplicados en la agenda
  const nameExists = persons.some(p => p.name.toLowerCase() === body.name.toLowerCase())
  if (nameExists) {
    return res.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)
  res.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})