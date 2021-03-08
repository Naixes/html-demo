const {smart} = require('webpack-merge')
const webpack = require('webpack')

const base = require('./webpack.base')

module.exports = smart(base, {
    mode: 'development',
	// 源码映射，不单独生成文件，忽略列，能定位到具体的vue文件
	// 开发环境：'cheap-module-eval-source-map'
	// 生产环境：'cheap-module-source-map'
	devtool: 'cheap-module-source-map',
	// 开发服务器配置，webpack-dev-server
	devServer: {
		port: 3000,
		// 显示进度条
		progress: true,
		// 从dist目录开始执行
		contentBase: './dist',
		// 压缩
		// compress: true,
		// 3.2模拟数据
		// before(app) {
		// 	app.get('/api/user', (req, res) => {
		// 		console.log('before')
		// 		res.json({name: 'sin-before'})
		// 	})
		// },
		// 3.1配置跨域代理
		proxy: {
			// '/api': 'http://localhost:8080'
			// 改变路径，后端接口没有api
			// '/api': {
			// 	target: 'http://localhost:8080',
			// 	pathRewrite: {'api': ''}
			// }
		}
	},
	// 实时打包
	watch: true,
	watchOptions: {
		poll: 1000, // 每秒询问1000次
		aggregateTimeout: 500, // 防抖 500毫秒
		ignored: /node_modules/
	},
	plugins: [
		// 定义环境变量，内置插件
		new webpack.DefinePlugin({
			// 在这里'dev'指的是变量需要转化成字符串
			DEV: JSON.stringify('dev')
		}),
		// 热更新
		new webpack.NamedModulesPlugin(), // 打印更新的模块
		new webpack.HotModuleReplacementPlugin(), // 热更新插件 
	],
    // 其他配置
    // 执行：npm run build -- --config ./config/webpack.dev.js
})