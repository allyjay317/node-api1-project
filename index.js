const express = require('express')

const server = express()

const PORT = 5000;

server.get('/', (req, res) => {
  res.status(200).send('Hello World')
})



server.listen(PORT)