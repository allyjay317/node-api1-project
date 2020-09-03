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

server.get('api/users', (req, res) => {
  try {
    res.status('200').json(users)
  }
  catch (err) {
    res.status('500').json({ errorMessage: 'There was an error while saving the user to the database' })
  }
})

server.get('/api/users/:id', (req, res) => {

})

server.delete('/api/users/:id', (req, res) => {

})

server.put('/api/users/:id', (req, res) => {

})

server.listen(PORT)