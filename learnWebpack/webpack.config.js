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