import {createApp, createSSRApp} from 'vue'
import App from './App.vue'

import createRouter from './router';
import createStore from './store'

// 避免状态单例
export default function() {
    // 判断是否服务端
    const isSSR = typeof window === 'undefined'
    const app = (isSSR ? createSSRApp : createApp)(App)
    const router = createRouter()
    const store = createStore()
    app.use(router).use(store)
    // vue3，2是 new Vue()
    return {
        app,
        router,
        store
    }
}