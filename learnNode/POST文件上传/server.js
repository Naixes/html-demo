const http = require('http')

http.createServer((req, res)=>{
	console.log(req.headers)

	let arr = [] // 实际情况下不应该所有的都放在这里
	req.on('data', buffer=>{
		arr.push(buffer)
	})
	req.on('end', ()=>{
		let buffer = Buffer.concat(arr)
		console.log(buffer.toString())
		// ------WebKitFormBoundaryWZBe3Az77qpZZ48e
		// Content-Disposition: form-data; name="username"

		// naixes 
		// ------WebKitFormBoundaryWZBe3Az77qpZZ48e
		// Content-Disposition: form-data; name="file"; filename="test.txt" // 原始文件名
		// Content-Type: text/plain

		// test
		// 000000
		// ------WebKitFormBoundaryWZBe3Az77qpZZ48e--

		// 对二进制数据进行处理
		// todo
		// 保存文件
	})
}).listen(8080)