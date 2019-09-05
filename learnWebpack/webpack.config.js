// webpack是基于node的
let path = require('path')
module.exports = {
	// production(默认) development
	mode: 'development',
	// 入口：默认就是这个
	entry: './src/index.js',
	output: {
		// 默认是main.js
		filename: 'bundle.js',
		// 必须是一个绝对路径
		path: path.resolve(__dirname, 'dist')
	}
}