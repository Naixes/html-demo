const http = require('http')
const url = require('url')
const querystring = require('querystring')
const zlib = require('zlib')
const fs = require('fs')
// 处理文件上传
const { Form } = require('multiparty')
const router = require('./router')
const {HTTP_PORT, HTTP_ROOT, HTTP_UPLOAD} = require('../config')

http.createServer((req, res) => {
	// pathname：？前面的部分，query：？后面的部分
	let {pathname, query} = url.parse(req.url, true)

	// 在res上注入方法：给所有的返回添加content-type，并且将json转换为string
	res.writeJson = function (json) {
		res.setHeader('content-type', 'application/json')
		res.write(JSON.stringify(json))
	}

	// 处理post
	if(req.method == 'POST') {
		// 普通的post
		if(req.headers['content-type'].startsWith('application/x-www-form-urlencoded')) {
			let arr = []
			req.on('data', buffer => {
				arr.push(buffer)
			})
			req.on('end', () => {
				// querystring.parse()将query字符串解析为json
				// Buffer.concat()返回一个合并了 list 中所有 Buffer 实例的新 Buffer
				let post = querystring.parse(Buffer.concat(arr).toString())

				// 路由
				handle(req.method, pathname, query, post, {})
			})
		}else {
			// 包含文件上传的post
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
				handle(req.method, pathname, query, post, files)
			})
		}
	}else {
		// 路由
		handle(req.method, pathname, query, {}, {})
	}

	async function handle(method, url, get, post, files){
		// 查询路由处理函数
		let fn = router.findRouter(method, url)
		console.log(method, url)

		if(!fn) {
			// 未找到处理函数：获取文件
			let filepath = HTTP_ROOT + pathname
			// fs.stat()获取文件信息，返回stats对象
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
			// 接口：执行处理函数
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

