// webpack是基于node的
const path = require('path')

const webpack = require('webpack')

// 导入自动生成HTMl文件并引入的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 导出抽取css的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 清除插件：改成cleanWebpackPlugin的小写c会报错？？？
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// 打包非代码的数据信息文件
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	// 解析配置
	resolve: {
		// 配置第三方包的查找路径，默认还会继续往上级查找
		modules: [path.resolve('node_modules')],
		// 配置别名
		alias: {
			// 方法1：默认引入样式文件
			bootstrap: 'bootstrap/dist/css/bootstrap.css'
		},
		// 方法2：先找style，再找main，默认找main
		mainFields: ['style', 'main'],
		// 设置查找的入口文件的名字,默认是index.js
		mainFiles: ['index.js'],
		// 设置可以省略的后缀，从左往右的顺序
		extensions: ['.js', '.vue', '.json']
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
			filename: 'css/main.css'
		}),
		// 3.给每个模块注入$
		// new webpack.ProvidePlugin({
		// 	$: 'jquery'
		// }),
		new CleanWebpackPlugin(),
		// 把项目目录中docs中的内容拷贝到打包后的根目录中
		new copyWebpackPlugin([{from: './docs', to: './'}]),
		// 版权说明插件，webpack内置
		// 打包后的文件最前面加上版权说明：'sin make in 2019'
		new webpack.BannerPlugin('sin make in 2019')
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
						outputPath: '/images/',
						// 单独配置地址
						// publicPath: 'http://www.sinnote.cn',
						// 小于这个大小会进行base64编码直接写到css文件，否则使用file-loader产生真实文件
						limit: 0.1*1024,
						// 指定打包文件名，也可以是一个函数根据环境返回不同的文件名：name(){return xxx}
						name: '[hash:8]-[name].[ext]'
					}
				},
				// 简写
				// use: 'url-loader?limit=43960&[hash:8]-[name].[ext]'
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
	output: {
		// 默认是main.js，hash：每次修改都产生新的文件
		filename: 'bundle.[hash:8].js',
		// 必须是一个绝对路径
		path: path.resolve(__dirname, '../dist'),
		// 公共路径：会在每个html引用的资源前添加，资源不在本地时使用
		// 如果不是所有的都需要可以单独配置
		// publicPath: 'http://www.sinnote.cn'
	}
}
