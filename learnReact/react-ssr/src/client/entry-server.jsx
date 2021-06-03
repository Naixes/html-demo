import React from 'react'
import {StaticRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import {routes, Routes} from './router'
import {createServerStore} from './store'

// 返回能匹配到路由返回相应组件的方法
export default (ctx) => {
    return new Promise(resolve => {
        const promise = []
        const store = createServerStore()
        routes.some((route) => {
            if(route.path === ctx.request.path && route.loadData) {
                promise.push(route.loadData())
            }
        })
        Promise.all(promise).then((data) => {
            ctx.window = data[0].data.data
            resolve(
                <Provider store={store}>
                    <StaticRouter location={ctx.request.url}>{Routes()}</StaticRouter>
                </Provider>
            )
        })
    })
}