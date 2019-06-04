const process = require('process')

// 判断运行环境
// console.log(process.env.OS)
let mode = (process.env.OS == 'Windows.NT' ? 'dev' : 'prod' )

module.exports = {
	mode,
	...mode === 'dev' ? require('./config.dev') : require('./config.prod')
}