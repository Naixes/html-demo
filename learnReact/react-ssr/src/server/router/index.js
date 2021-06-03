const Router = require('@koa/router')
const fs = require('fs')
const {renderToString} = require('react-dom/server')
const {resolve} = require('path')

const serverBundle = require('../../../dist/server-bundle').default

const router = new Router()

const fileResolve = file => resolve(__dirname, file)
const template = fs.readFileSync(fileResolve("../../../dist/index.html"), "utf-8")
const templating = template => {
    return (props) => (
        template.replace(
            `<div id="app"></div>`,
            `<div id="app">${props.html}</div>${props.store}`
        )
    )
}

module.exports = (app) => {
    router.get(["/", "/about"], async(ctx, next) => {
        const render = templating(template)
        const jsx = await serverBundle(ctx)
        const html = renderToString(jsx)
        ctx.body = render({html, store: `<script>window.REDUX_STORE=${JSON.stringify(ctx.window)}<script>`})
    })
    router.get('/api/getUserInfo', ctx => {
        ctx.body = {
            code: 0,
            message: '',
            data: {
                name: "sin"
            }
        }
    })
    app.use(router.routes()).use(router.allowedMethods())
}