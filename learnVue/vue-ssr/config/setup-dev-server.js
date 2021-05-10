// 开发模式
// 1. server -> bundle
// 2. client -> manifest
// 3. 待2个文件编译完成，就可以调用createBundleRenderer -> renderer -> renderToString -> Promise
// 1,2 -> setupServer -> webpack -> readyPromise -> 调用 createRender ->  创建renderer实例
const chokidar = require('chokidar')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const path = require('path')
const memoryfs = require('memory-fs')

const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const readFile = (fs, file) => {
    try {
        return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf8')
    } catch (error) {
        
    }
}

const setupServer = (templatePath, cb) => {
    let serverBundle
    let clientManifest
    let template
    let ready

    template = fs.readFileSync(templatePath, 'utf8')

    const readyPromise = new Promise(r => ready = r)
    const update = () => {
        if(servrBundle && clientManifest) {
            // 通知 server 进行渲染
            ready()
            // 执行创建实例
            cb(serverBundle, {
                template,
                clientManifest
            })
        }
    }
    
    // webpack -> entry-server -> bundle
    // memory-fs 将文件放在内存中
    const mfs = new memoryfs()
    const serverCompiler = webpack(serverConfig)
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        if (stats.errors.length) return
        serverBundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
        update()
    })

    // webpack -> entry-client -> clientManifest
    // 参考hot-middleware文档
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin)
    clientConfig.entry.app = [
        'webpack-hot-middleware/client',
        clientConfig.entry.app
    ]
    const clientCompiler = webpack(clientConfig)
    app.use(devMiddleware(clientCompiler, {
        noInfo: true,
        publicPath: clientConfig.output.publicPath
    }))
    app.use(hotMiddleware(clientCompiler))

    clientCompiler.hooks.done.tap('clientsBuild', stats => {
        // 读取输出
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        if (stats.errors.length) return
        clientManifest = JSON.parse(readFile(devMiddleware.fileSystem), 'vue-ssr-client-manifest.json')
        update()
    })

    // 监控文件
    chokidar.watch(templatePath).on('change', () => {
        template = fs.readFileSync(templatePath, 'utf8')
        update()
    })

    return readyPromise
}

module.exports = setupServer