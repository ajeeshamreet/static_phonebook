const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

let persons = [
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "Z00Hp9lGVOQ"
    },
    {
      "name": "mushroom",
      "number": "010",
      "id": "AihlLW7AWWo"
    },
    {
      "name": "vrad",
      "number": "9139197073",
      "id": "393nmbZVNHU"
    }
]


app.get('/api/contacts', (req, res) => {
  res.json(persons)
})

app.post('/api/contacts', (req, res) => {
    const body = req.body;

    const newPerson = {
      name: body.name,
      number: body.number,
      id: Math.random().toString(36).substring(2, 12)
    }

    persons = persons.concat(newPerson)

    res.json(newPerson)
})

app.delete('/api/contacts/:id', (req, res) => {
  // console.log("ID received:", req.params.id)

  const id = req.params.id;
  const person = persons.find(p => p.id === id)

  if(!person){
    res.status(404).end()
  }
  
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`)
})