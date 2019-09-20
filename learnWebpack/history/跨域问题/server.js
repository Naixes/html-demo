let express = require('express')
let app = express()

// 3.3在服务器启动webpack
let webpack = require('webpack')
let middle = require('webpack-dev-middleware')

let webpackConfig = require('./webpack.config.js')
let compiler = webpack(webpackConfig)
app.use(middle(compiler))

app.get('/api/user', (req, res) => {
    res.json({name: 'sin'})
})

app.listen(8080)