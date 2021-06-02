const {resolve} = require('path')
const {merge} = require('webpack-merge')
// 将资源注入模版
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 提取css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const baseConfig = require('./webpack.base')

const devConfig = {
    mode: 'development',
    entry: resolve(__dirname, "../src/client/entry-client.jsx"),
    output: {
        filename: 'client-bundle.js'
    },
    devServer: {
        // 服务启动地址
        contentBase: resolve(__dirname, "../dist"),
        port: '8081',
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, '../src/client/index.template.html')
        })
    ]
}

module.exports = merge(baseConfig, devConfig)