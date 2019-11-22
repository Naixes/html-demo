const db = require('./libs/database')
// 开启服务，处理请求
require('./libs/http')
// 添加路由
require('./routers')

// 测试
// ;(async () => {
// 	let data = await db.query("SELECT * FROM item_table")

// 	console.log(data)
// })()

// 数据库回滚
// db.query('start transaction'; SELECT....; 'commit()')

const process = require('process')
// 可以用来获取 -- 后面的参数，使用不同的配置文件
console.log(process.argv)