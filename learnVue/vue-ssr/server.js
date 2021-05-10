const Vue = require('vue')
const server = require('express')()
const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')
const fs = require('fs')

const resolve = fpath => path.resolve(__dirname, fpath)

const templatePath = resolve('./src/index.template.html')

const isProd = process.env.NODE_ENV === 'production'

const createRenderer = (serverBundle, options) => {
  return createBundleRenderer(serverBundle, Object.assign(options, {
    runInNewContext: false, // 推荐
    basedir: resolve('./dist'),
  }))
}

let renderer, readyPromise
// 生产环境
if(Prod) {
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  const template = fs.readFileSync(templatePath, 'utf8')

  renderer = createRenderer(serverBundle, {
    template, // （可选）页面模板
    clientManifest // （可选）客户端构建 manifest
  })
}else {
  // 开发模式
  // 1. server -> bundle
  // 2. client -> manifest
  // 3. 待2个文件编译完成，就可以调用createBundleRenderer -> renderer -> renderToString -> Promise
  // 1,2 -> setupServer -> webpack -> readyPromise -> 调用 createRender ->  创建renderer实例
  readyPromise = require('./config/setup-dev-server')(templatePath, (serverBundle, options) => {
    // 创建renderer实例
    renderer = createBundleRenderer(serverBundle, options)
  })
}

const render = (req, res) => {
  // 传递的数据
  const context = { 
    title: 'hello ssr with webpack',
    meta: `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
    `,
   }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    // 处理异常……
    res.end(html)
  })
}

// 在服务器处理函数中……
server.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

server.listen(8080)