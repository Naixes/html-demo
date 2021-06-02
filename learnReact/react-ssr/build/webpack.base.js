const {resolve} = require('path')
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
    output: {
        path: resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.js(x)$/,
                use: ['babel-loader'],
                exclude: /node_module/
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js']
    }
}