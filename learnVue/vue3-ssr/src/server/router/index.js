const Router = require('@koa/router');
const router = new Router();
const fs = require('fs');
const {
    renderToString
} = require('@vue/server-renderer');
const serverBundle = require('../../../dist/server-bundle.js').default;
const {
    resolve
} = require('path');
const template = fs.readFileSync(resolve(__dirname, "../../../dist/index.html"), "utf-8");
const renderState = (state, windowKey) => {
    return `<script>window.${windowKey}=${JSON.stringify(state)}</script>`
}
module.exports = (app) => {
    router.get(["/", "/about"], async (ctx, next) => {
        const {
            app: appComp,
            router: r,
            store
        } = serverBundle();
        r.push(ctx.req.url);
        await r.isReady();
        let appContent = await renderToString(appComp);
        appContent = `<div id="app">${renderState(store.state,"__INITIAL_STATE__")}${appContent}</div>`;
        let html = template.replace('<div id="app"></div>', appContent);

        ctx.body = html
    })
    app.use(router.routes()).use(router.allowedMethods());
} 