const http = require('http')
const zlib = require('zlib')
const url = require('url')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
	let {pathname} = url.parse(req.url, true)
	let gz = zlib.createGzip()
	let filepath = path.join(__dirname, pathname)
	// console.log(filepath)

	let rs = fs.createReadStream(path.join(__dirname, pathname))

	fs.stat(filepath, (err, stat) => {
		if(err) {
			// deflat指普通文件的返回Buffer，默认是字符串
			// res.setHeader('content-encoding', 'deflat')
			res.setHeader(404)
			res.write('not found')
			res.end()
		}else {
			// 防止服务器出错结束
			rs.on('error', err => {})
			res.setHeader('content-encoding', 'gzip')
			rs.pipe(gz).pipe(res)
		}
	})


}).listen(8080)