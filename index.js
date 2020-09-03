const express = require('express')

const server = express()

const PORT = 5000;

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).send('Hello World')
})

server.post('/api/users', (req, res) => {

})

server.get('api/users', (req, res) => {

})

server.get('/api/users/:id', (req, res) => {

})

server.delete('/api/users/:id', (req, res) => {

})

server.put('/api/users/:id', (req, res) => {

})

server.listen(PORT)