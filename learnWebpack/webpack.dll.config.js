const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: {
        // 想要统一打包的库
        react: ['react', 'react-dom']
    },
    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, 'dll'),
        library: '[name]-[hash]', // 打包后的变量名称
        // libraryTarget: 'var', // 导出方式，默认就是变量var，commonjs，umd，this
    },
    plugins: [
        new webpack.DllPlugin({
            // name 必须和 output.library 一致
            name: '[name]-[hash]',
            // 在一个单独的目录产生的一个清单，里面有对应的路径
            path: path.join(__dirname, 'dll', '[name]-manifest.json')
        })
    ]
}