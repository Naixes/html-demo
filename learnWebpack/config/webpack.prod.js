const {smart} = require('webpack-merge')
const webpack = require('webpack')

const base = require('./webpack.base')

// 压缩css，生产环境下起作用
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
// 压缩js，生产环境下起作用
const TerserJSPlugin = require('terser-webpack-plugin')

module.exports = smart(base, {
    mode: 'production',
	// 源码映射，不单独生成文件，忽略列，能定位到具体的vue文件
	// 开发环境：'cheap-module-eval-source-map'
	// 生产环境：'cheap-module-source-map'
	devtool: 'cheap-module-eval-source-map',
	optimization: {
		// 压缩css和js
	  	minimizer: [ new TerserJSPlugin({}), new OptimizeCss({}) ]
	},
	plugins: [
		// 定义环境变量，内置插件
		new webpack.DefinePlugin({
			// 在这里'prod'指的是变量需要转化成字符串
			DEV: JSON.stringify('prod')
		}),
	],
    // 其他配置：优化项
    // 执行：npm run build -- --config ./config/webpack.prod.js
})