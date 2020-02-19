const express = require('express')
const multer = require('multer')
const body = require('body-parser')

let server = express()
server.listen(8080)

let obj = multer({dest: './static/upload'})
server.use(obj.any())

server.use(body.urlencoded({
    extended:false
}))

server.post('/reg', (req, res) => {
    console.log(req.body)
    console.log(req.files)
    res.send('success')
})

server.use(express.static('./static/'))
