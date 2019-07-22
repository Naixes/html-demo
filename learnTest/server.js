const express  = require('express')
const body = require('body-parser')

const server = express()

server.use(body.urlencoded({extended: false}))
server.use(body.json())

server.get('/', (req, res) => {
    res.status(200).json({name: 'sin'})
})

server.post('/post', (req, res) => {
    console.log(req.body.name)
    res.status(200).json(req.body)
})

server.listen(8000)
module.exports = server