const {smart} = require('webpack-merge')
const webpack = require('webpack')

const base = require('./webpack.base')

// 压缩css，生产环境下起作用
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
// 压缩js，生产环境下起作用
const TerserJSPlugin = require('terser-webpack-plugin')
// 导出抽取css的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 包分析工具
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = smart(base, {
    mode: 'production',
	// 源码映射，不单独生成文件，忽略列，能定位到具体的vue文件
	// 开发环境：'cheap-module-eval-source-map'
	// 生产环境：'cheap-module-source-map'
	devtool: 'cheap-module-eval-source-map',
	optimization: {
		// 压缩css和js，默认js会进行压缩，但是由于覆盖了默认的配置所以也要指定js压缩
	  	minimizer: [ new TerserJSPlugin({}), new OptimizeCss({}) ]
	},
	module: { // 用来配置第三方loader模块的
		rules: [
			{
				test: /\.css$/,
				// 将style-loader改为MiniCssExtractPlugin.loader
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader', 'postcss-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader', 'postcss-loader', 'less-loader'
				]
			}
		]
	},
	plugins: [
		// css抽取
		new MiniCssExtractPlugin({
			// 打包后的名字
			filename: 'css/main.css'
		}),
		// 定义环境变量，内置插件
		new webpack.DefinePlugin({
			// 在这里'prod'指的是变量需要转化成字符串
			DEV: JSON.stringify('prod')
		}),
		// 包分析工具
		new WebpackBundleAnalyzer()
	],
    // 其他配置：优化项
    // 执行：npm run build -- --config ./config/webpack.prod.js
})