const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the phonebook server!</h1>')
})

app.get('/info', (req, res) => {
    const phonebookSizeInfo = ("Phonebook has info for " + persons.length + " people<br><br>")
    const date = new Date()
    res.send((phonebookSizeInfo + date))
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    person.id = Math.floor(Math.random() * 100)

    persons = persons.concat(person)
  
    response.json(person)
  })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})