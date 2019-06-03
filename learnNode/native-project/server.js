const db = require('./libs/database')
const http = require('./libs/http')
const {addRouter} = require('./libs/router')

// 测试
// ;(async () => {
// 	let data = await db.query("SELECT * FROM item_table")

// 	console.log(data)
// })()

addRouter('get', '/list', async (res, get, post, files) => {
	let data = db.query('SELECT * FROM item_table')
	try {
		res.writeJson({
			state: 0,
			data
		})
	} catch (error) {
		res.writeJson({
			state: 1,
			msg: 'database error'
		})
	}
	res.end()
})
addRouter('post', '/add', async (res, get, post, files) => {
	res.write('bbb')
	res.end()
})
addRouter('get', '/del', async (res, get, post, files) => {
	res.write('bbb')
	res.end()
})
