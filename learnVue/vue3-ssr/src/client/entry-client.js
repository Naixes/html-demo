import createApp from './app'

const {app, store} = createApp()

// 脱水
if (window.__INITIAL_STATE__) {
    console.log("客户端获取到的值", window.__INITIAL_STATE__);
    store.replaceState(window.__INITIAL_STATE__);
}

// 客户端激活：所谓客户端激活，指的是 Vue 在浏览器端接管由服务端发送的静态 HTML，使其变为由 Vue 管理的动态 DOM 的过程。
app.mount('#app', true)