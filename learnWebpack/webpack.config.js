// webpack是基于node的
const path = require('path')

// 导入自动生成HTMl文件的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	// 开发服务器配置，webpack-dev-server
	devServer: {
		port: 3000,
		// 显示进度条
		progress: true,
		// 从dist目录开始执行
		contentBase: "./dist"
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
		})
	],
	module: { // 用来配置第三方loader模块的
		rules: [
			// 文件的匹配规则，从右到左依次处理
			// loader功能单一，可以叠加使用
			// css-loader： 加载css文件，成为js的一部分（读取成字符串），可以解析@import这种语法，解析路径
			// style-loader： 使css有作用，让样式字符串变成style标签输出到页面
			// 一个loader写成字符串，顺序：从右向左，从下到上
			// { test: /\.css$/, use: ['style-loader', 'css-loader'] } //处理css文件的规则
			// 对象形式：可以传多个参数
			{
				test: /\.css$/, use: [{
					loader: 'style-loader',
					options: {
						// 让样式字符串变成style标签输出到页面，header标签的顶部，不会覆盖自定义样式
						insertAt: 'top'
					}
				}, 'css-loader']
			},
			{
				test: /\.less$/, use: [{
					loader: 'style-loader',
					options: {
						insertAt: 'top'
					}
				}, 'css-loader', 'less-loader']
			}
		]
	},
	// production(默认) development
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