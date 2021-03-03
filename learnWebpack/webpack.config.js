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
// 清除插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// todo：可以引入外部打包生成的name.dll.js资源，安装报错
// const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

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
	// 源码映射，不单独生成文件，忽略列，能定位到具体的vue文件
	// 开发环境：'cheap-module-eval-source-map'
	// 生产环境：'cheap-module-source-map'
	// devtool: 'cheap-module-eval-source-map',
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
		},
		// 热更新
		hot: true
	},
	// 实时打包
	watch: true,
	watchOptions: {
		poll: 1000, // 每秒询问1000次
		aggregateTimeout: 500, // 防抖 500毫秒
		ignored: /node_modules/
	},
	optimization: {
		// 压缩css和js
		minimizer: [ 
			new TerserJSPlugin({
				// terserOptions: {
				//   output: {
				// 	// 去除注释
				// 	comments: false,
				//   },
				// },
			}),
			new OptimizeCss({}) ],
		// 开启scopeHoisting
		// 开发环境起作用，生产环境默认会直接注入并进行简单优化计算
		concatenateModules: true,
		// 分离共同引入的代码
		splitChunks: {
			cacheGroups: {
				// 对css也起作用
				common: {
					chunks: 'initial',
					// 允许入口并行加载的最大请求数
					maxInitialRequests: 3,
					minSize: 0,
					minChunks: 1
				},
				vendors: {
					test: /node_modules/,
					chunks: 'initial',
					// 允许入口并行加载的最大请求数
					maxInitialRequests: 2,
					// 默认是-10
					priority: 1
				}
			}
		}
	},
	// 4.配置忽略引入的jquery
	externals: {
		// jquery: '$'
	},
	plugins: [
		// 热更新
		new webpack.NamedModulesPlugin(), // 打印更新的模块
		new webpack.HotModuleReplacementPlugin(), // 热更新插件 
		// 动态链接库
		// new webpack.DllReferencePlugin({
		// 	// 需要先打包 webpack.config.react.js配置
		// 	// manifest 就是 webpack.config.react.js 配置打包出来的 json 文件
		// 	// 会先去查找清单如果没有才进行打包
		// 	manifest: path.resolve(__dirname, 'dll' , 'react-manifest.json')
		// }),
		// 配置忽略第三方库中一些不需要的文件，减少打包体积
		new webpack.IgnorePlugin(/\.\/locale/, /moment/),
		// 定义环境变量，内置插件
		new webpack.DefinePlugin({
			// 在这里'dev'指的是变量需要转化成字符串
			DEV: JSON.stringify('dev')
		}),
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
		// 清除之前的打包文件
		new CleanWebpackPlugin(),
		// 把项目目录中docs中的内容拷贝到打包后的根目录中
		new copyWebpackPlugin([{from: './docs', to: './'}]),
		// 版权说明插件，webpack内置
		// 打包后的文件最前面加上版权说明：'sin make in 2019'
		// new webpack.BannerPlugin('sin make in 2019')
	],
	module: { // 用来配置第三方loader模块的
		// 配置不需要寻找依赖的第三方库提高打包速度，比如jquery
		noParse: /jquery/,
		rules: [
			// 处理图片
			{
				test: /\.(png|gif|jpg|jpeg|bmp)$/,
				use: {
					// url-loader中包含file-loader
					loader: 'url-loader',
					options: {
						// 会在打包目录新建这个目录
						outputPath: './images/',
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
			// {
			// 	test: /\.js$/,
			// 	use: {
			// 		loader: 'eslint-loader',
			// 		options: {
			// 			// 强制在普通loader之前执行
			// 			enforce: 'pre'
			// 		}
			// 	}
			// },
			// 配置babel，添加.babelrc配置文件，有不支持的语法时会报错提示，按照提示去babel官网寻找配置，比如装饰器@xxx
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							// 注意：以全局变量的方式注入，污染全局变量，推荐使用@babel/plugin-transform-runtime，以闭包方式注入
							// 可以按需自动引入用到的polyfills
							// 必须同时设置corejs:3 默认使用corejs:2
							// 需安装core-js@3
							// {"useBuiltIns": "usage", corejs: 3},
							'@babel/preset-react'
						],
						// 也可以在.babelrc中配置
						plugins: [
							// "loose": true：使用赋值表达式而不是Object.defineProperty。
							['@babel/plugin-proposal-class-properties', { loose: true }],
							// @babel/plugin-transform-runtime需要配合@babel/runtime-corejs3
							[
								'@babel/plugin-transform-runtime', 
								{
									corejs: 3
								}
							],
							// 懒加载，不加也没报错？？？
							// ['@babel/plugin-syntax-dynamic-import']
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
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							/* 解决css单独打包时url路径会出现问题，打包后路径相对于css而不是dist */
							publicPath: '../'
						}
					},
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
	// production，development
	mode: 'development',
	// 入口：默认就是这个
	entry: './src/index.js',
	output: {
		// 默认是main.js，hash：每次修改都产生新的文件
		filename: 'bundle.[hash:8].js',
		// 必须是一个绝对路径
		path: path.resolve(__dirname, 'dist'),
		// 公共路径：会在每个html引用的资源前添加，资源不在本地时使用
		// 如果不是所有的都需要可以单独配置
		// publicPath: 'http://www.sinnote.cn'
	}
}
