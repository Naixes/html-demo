const http  = require('http')
const io = require('socket.io')

// 建立普通的http
let server = http.createServer((req, res) => {})
server.listen(8080)

// 建立ws
let wsServer = io.listen(server)
// sock建立好的连接
wsServer.on('connection', sock => {
	// sock.emit('name', 数据) // 发送数据
	// sock.on('name', (数据)=>{})
	sock.on('aaa', (a, b) => {
		console.log(a+b)
	})

	setInterval(function() {
		sock.emit('timer', new Date().getTime())
	}, 1000)
})