const http = require('http')

http.createServer((req, res) => {
	let allowOrigin = {
		"http://localhost": true
	}
	// SOP:同源策略
	// 设置CROS
	const {origin} = req.headers
	if(allowOrigin[origin]) {
		res.setHeader('access-control-allow-origin', '*')
	}

	res.write('{"a": "12", "name": "j"}')
	res.end()
}).listen(8080)