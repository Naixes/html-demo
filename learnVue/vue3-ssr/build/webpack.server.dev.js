const {resolve} = require('path')
const {merge} = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const baseConfig = require('./webpack.base')

const serverConfig = {
    mode: 'development',
    entry: resolve(__dirname, "../src/client/entry-server.js"),
    output: {
        filename: 'server-bundle.js',
        // 指定编译规则
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    // 不让第三方依赖打包到输出文件
    externals: nodeExternals(),
    module: {
        rules: [
            {
                test: /\.css$/,
                // css客户端已经处理过，忽略css解析
                use: ['ignore-loader']
            }
        ]
    }
}

module.exports = merge(baseConfig, serverConfig)