const fs = require('fs')
const zlib = require('zlib')

let rs = fs.createReadStream('logo.jpg')
let gz = zlib.createGzip()

// let ws = fs.createWriteStream('logo-copy.jpg')
// rs.pipe(ws)

let ws = fs.createWriteStream('logo-copy.jpg.gz')
rs.pipe(gz).pipe(ws)

rs.on('error', err => {
	console.log(err)
})

ws.on('finish', () => {
	console.log('完成')
})