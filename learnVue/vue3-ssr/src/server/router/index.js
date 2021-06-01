const Router = require('@koa/router')
const fs = require('fs')
const {renderToString} = require('@vue/server-renderer')
const {resolve} = require('path')

const serverBundle = require('../../../dist/server-bundle').default

const router = new Router()

const template = fs.readFileSync(resolve(__dirname, '../../../dist/index.html'), 'utf-8')

// 注水
const renderState = (state, windowKey) => {
    return `<script>window.${windowKey}=${JSON.stringify(state)}</script>`
}

module.exports = (app) => {
    router.get(["/", "/about"], async(ctx, next) => {
        const {app: appComp, router: r, store} = serverBundle()
        // 设置服务器端路由位置
        r.push(ctx.req.url)
        // 等router将可能的异步组件和钩子函数解析完
        await r.isReady()
        let appContent = await renderToString(appComp)
        // 拼接html
        appContent = `<div id="app">${renderState(store.state,"__INITIAL_STATE__")}${appContent}</div>`
        let html = template.replace('<div id="app"></div>', appContent)
        ctx.body = html
    })
    app.use(router.routes()).use(router.allowedMethods())
}