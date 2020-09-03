const express = require('express');
const shortid = require('shortid');
const server = express()
let users = []

const PORT = 5000;

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).send('Hello World')
})

server.post('/api/users', (req, res) => {
  let newUser = req.body;
  if (newUser.name && newUser.bio) {
    try {
      newUser.id = shortid.generate()
      users.push(newUser)
      res.status(201).json(newUser)
    }
    catch (err) {
      res.status('500').json({ errorMessage: 'There was an error while saving the user to the database' })
    }
  }
  else {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }
})

server.get('/api/users', (req, res) => {
  try {
    res.status('200').json(users)
  }
  catch (err) {
    res.status('500').json({ errorMessage: 'There was an error while saving the user to the database' })
  }
})

server.get('/api/users/:id', (req, res) => {
  try {
    const { id } = req.params
    const found = users.find(user => user.id === id)

    if (found) {
      res.status(200).json(found)

    }
    else {
      res.status(404).json({ message: 'The user with the specified ID does not exist' })
    }
  }
  catch (err) {
    res.status(500).json({ errorMessage: 'The user information could not be retrieved.' })
  }

})

server.delete('/api/users/:id', (req, res) => {
  try {
    const { id } = req.params
    const found = users.find(user => user.id === id)

    if (found) {
      users = users.filter(user => user.id !== id)
      res.status('204').json(found)
    }
    else {
      res.status('404').json({ message: "The user with the specified ID does not exist." })
    }
  }
  catch (err) {
    res.status('500').json({ errorMessage: 'The user could not be removed' })
  }
})

server.put('/api/users/:id', (req, res) => {
  try {
    const { id } = req.params
    const found = users.find(user => user.id === id)
    const modifiedUser = req.body

    if (found) {
      if (modifiedUser.name && modifiedUser.bio) {
        modifiedUser.id = id
        users = users.map(user => user.id === id ? modifiedUser : user)
        res.status(200).json(modifiedUser)
      } else {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user' })
      }
    } else {
      res.status(404).json({ message: 'The user with the specified ID does not exist.' })
    }
  }
  catch (err) {
    res.status('500').json({ errorMessage: 'The user information could not be modified' })
  }
})

server.listen(PORT)