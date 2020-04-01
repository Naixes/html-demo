var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var logger = require('morgan')
var express = require('express')

var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

app.set('port', process.env.PORT || 3000)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

// websocket连接监听
io.on("connection", function (socket) {
	// 
	socket.emit('open')
	console.log(socket.handshake)
	// 接收客户端的消息
	socket.on('message', function (msg) {
		console.log(msg)
		// 向客户端发送消息，频道为test
		socket.emit('test', 'server ready')
		// 广播
		socket.broadcast.emit('test', 'server ready')
	})
	socket.on('disconnect', function () { })
})

app.get('/', function (req, res) {
	res.sendfile('views/index.html')
})

server.listen(app.get('port'), function () {
	console.log('server listening on port' + app.get('port'))
})

// module.exports = app;
