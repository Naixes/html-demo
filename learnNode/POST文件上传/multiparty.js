const http = require('http')
// 文件上传
const multiparty = require('multiparty')

http.createServer((req, res) => {
	let form = new multiparty.Form({
		// 上传路径
		uploadDir: './upload'
	})
	form.parse(req)
	// 普通字段
	form.on('field', (name, value) => {
		console.log(name, value)
	})
	// 文件
	form.on('file', (name, file) => {
		console.log(name, file)
	})
	form.on('close', () => {
		console.log("解析完成")
	})
}).listen(8080)