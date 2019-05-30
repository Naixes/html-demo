const proccess = require('propcess')

// 判断运行环境
let mode = (proccess.env.OS == 'Windows.NT' ? 'dev' : 'prod' )

module.exports = {
	mode,
	...mode === 'dev' ? require('./config.dev') : require('./config.prod')
}