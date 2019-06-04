const http = require('http')
const url = require('url')
const querystring = require('querystring')
const zlib = require('zlib')
const fs = require('fs')
const { Form } = require('multiparty')
const router = require('./router')
const {HTTP_PORT, HTTP_ROOT, HTTP_UPLOAD} = require('../config')

http.createServer((req, res) => {
	let {pathname, query} = url.parse(req.url, true)

	res.writeJson = function (json) {
		res.setHeader('content-type', 'application/json')
		res.write(JSON.stringify(json))
	}

	if(req.method == 'POST') {
		if(req.headers['content-type'].startsWith('application/x-www-form-urlencoded')) {
			let arr = []
			// 普通的post
			req.on('data', buffer => {
				arr.push(buffer)
			})
			req.on('end', () => {
				let post = querystring.parse(Buffer.concat(arr).toString())

				// 路由
				handle(req.method, pathname, query, post, {})
			})
		}else {
			let form = new Form({
				uploadDir: HTTP_UPLOAD
			})
			form.parse(req)
			let post = {}
			let files = {}
			form.on('field', (name, value) => {
				post[name] = value
			})
			form.on('file', (name, files) => {
				files[name] = value
			})
			form.on('error', err => {
				console.log(err)
			})
			form.on('close', () => {
				// 路由
				handle(req.methodm, pathname, query, post, files)
			})
		}
	}else {
		// 路由
		handle(req.method, pathname, query, {}, {})
	}

	async function handle(method, url, get, post, files){
		let fn = router.findRouter(method, url)
		console.log(method, url)

		if(!fn) {
			// 文件
			let filepath = HTTP_ROOT + pathname
			fs.stat(filepath, (err, stat) => {
				if(err) {
					res.writeHeader(404)
					res.write('Not Found')
					// res.write(err.toString())
					res.end()
				}else {
					let rs = fs.createReadStream(filepath)
					let gz = zlib.createGzip()

					rs.on('error', () => {})

					res.setHeader('content-encoding', 'gzip')
					// pipe中封装处理各种事件
					rs.pipe(gz).pipe(res)
				}
			})
		}else {
			// 接口
			try {
				await fn(res, get, post, files)
			} catch (error) {
				res.writeHeader(500)
				res.write('Internal Server error')
				res.write(error.toString())
				res.end()
			}
		}

	}

}).listen(HTTP_PORT, () => {
	console.log(`server started at ${HTTP_PORT}`)
})

