// vue.config.js 
const path = require('path')
const port = 7070
const title = "vue项目最佳实践"

function resolve(dir) {
    return path.join(__dirname, dir)
}
 
module.exports = {
    publicPath: '/best-practive', // 部署应用包时的基本 URL 
    devServer: {
        port: port,  
    },
    configureWebpack: {
        // 向index.html注入标题
        name: title  
    },
    // 链式操作：修改webpack内部配置
    chainWebpack(config) {
        // 修改svg的loader，让svg-sprite-loader单独处理icons
        // 排除icons
        config.module
            .rule("svg")
            .exclude.add(resolve("src/icons"))
            .end();
        // 单独指定loader
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve("src/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({symbolId: "icon-[name]"})
            .end()
    }
}