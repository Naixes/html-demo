// webpack是基于node的
const path = require('path')

const webpack = require('webpack')

// 导入自动生成HTMl文件并引入的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 导出抽取css的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css，生产环境下起作用
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
// 压缩js，生产环境下起作用
const TerserJSPlugin = require('terser-webpack-plugin')
module.exports = {
	// 开发服务器配置，webpack-dev-server
	devServer: {
		port: 3000,
		// 显示进度条
		progress: true,
		// 从dist目录开始执行
		contentBase: './dist'
		// 压缩
		// compress: true
	},
	optimization: {
		// 压缩css和js
	  	minimizer: [ new TerserJSPlugin({}), new OptimizeCss({}) ]
	},
	// 4.配置忽略引入的jquery
	externals: {
		jquery: '$'
	},
	plugins: [
		new HtmlWebpackPlugin({
			// 指定模板
			template: './src/index.html',
			// 打包后的名字
			filename: 'index.html',
			// 压缩html
			minify: {
				// 删除双引号
				removeAttributeQuotes: true,
				// 折叠空行
				collapseWhitespace: true
			},
			// 增加hash戳
			hash: true
		}),
		new MiniCssExtractPlugin({
			// 打包后的名字
			filename: 'main.css'
		}),
		// 3.给每个模块注入$
		// new webpack.ProvidePlugin({
		// 	$: 'jquery'
		// })
	],
	module: { // 用来配置第三方loader模块的
		rules: [

			// 处理图片
			{
				test: /\.(png|gif|jpg|jpeg|bmp)$/,
				use: {
					// url-loader中包含file-loader
					loader: 'url-loader',
					options: {
						// 会在打包目录新建这个目录
						outputPath: 'images/',
						// 小于这个大小会进行base64编码直接写到css文件，否则使用file-loader产生真实文件
						limit: 100*1024
					}
				}
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-withimg-loader'
				}
			},
			// 2.配置全局jquery
			// {
			// 	test: require.resolve('jquery'),
			// 	use: 'expose-loader?$',
			// },

			// 一个loader写成字符串，处理顺序：从右向左，从下到上
			// eslint
			{
				test: /\.js$/,
				use: {
					loader: 'eslint-loader',
					options: {
						// 强制在普通loader之前执行
						enforce: 'pre'
					}
				}
			},
			// 配置babel，添加.babelrc配置文件，有不支持的语法时会报错提示，按照提示去babel官网寻找配置，比如装饰器@xxx
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							// "loose": true：使用赋值表达式而不是Object.defineProperty。
						   [ '@babel/plugin-proposal-class-properties', { loose: true }],
						   ['@babel/plugin-transform-runtime']
						]
					}
				},
				// 包含
				include: path.resolve(__dirname, 'src'),
				// 排除
				exclude: /node_modules/
			},
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
	// production(默认) development
	// production：测试压缩
	// mode: 'production',
	mode: 'development',
	// 入口：默认就是这个
	entry: './src/index.js',
	output: {
		// 默认是main.js，hash：每次修改都产生新的文件
		filename: 'bundle.[hash:8].js',
		// 必须是一个绝对路径
		path: path.resolve(__dirname, 'dist')
	}
}
