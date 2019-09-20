const {smart} = require('webpack-merge')
const base = require('./webpack.base')

module.exports = smart(base, {
    mode: 'development',
    // 其他配置
    // 执行：npm run build -- --config webpack.dev.js
})