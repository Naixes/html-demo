const db = require('./libs/database')
const http = require('./libs/http')
const routers = require('./routers')

// 测试
// ;(async () => {
// 	let data = await db.query("SELECT * FROM item_table")

// 	console.log(data)
// })()

// 数据库回滚
// db.query('start transaction'; SELECT....; 'commit()')

