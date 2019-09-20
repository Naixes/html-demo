const {smart} = require('webpack-merge')
const base = require('./webpack.base')

module.exports = smart(base, {
    mode: 'production',
    // 其他配置：优化项
    // 执行：npm run build -- --config webpack.prod.js
})