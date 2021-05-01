$(function () {
	var i = 0
	var socket = io.connect('http://localhost:3000')
	socket.on('open', function () {
		console.log('已连接')
		socket.send('连接成功')
	})
	// 接收服务端发送到test的消息
	socket.on('test', function (msg) {
		console.log('test', msg)
	})
	socket.on('system', function () { })

	// 简单聊天室：点击发送input中的消息
	$('#btn').on('click', () => {
		const value = $('#msg').val()
		socket.emit('chatEvent', value)
		$('#msg').val('')
	})
	socket.on('ServerMsg', function (msg) {
		console.log('msg', msg);
	})
})