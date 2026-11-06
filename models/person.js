const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

console.log('Connecting to MongoDB Atlas...')
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    minlength: 8
  }
})

// Sanitize MongoDB internal fields for the frontend consumption
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)