import Vue from 'vue'
import Home from './views/Home.vue'
import About from './views/About.vue'

class VueRouter {
    constructor(options) {
        this.$options = options
        // 保存路由的对应关系
        this.routeMap = {}
        // 实现路由响应式
        this.app = new Vue({
            data: {
                current: '/'
            }
        })
    }

    init() {
        // 监听urls变化
        this.bindEvents()
        // 解析路由配置
        this.createRouteMap(this.$options)
        // 实现router-link和router-view两个组件
        this.initComponents()
    }

    bindEvents() {
        window.addEventListener('load', this.onHashChange.bind(this))
        window.addEventListener('hashchange', this.onHashChange.bind(this))
    }
    onHashChange() {
        this.app.current = window.location.hash.slice(1) || '/'
        console.log(this.app.current)
    }
    createRouteMap(options) {
        options.routes.forEach(opt => {
            this.routeMap[opt.path] = opt.component
        });
    }
    initComponents() {
        // <router-link to="">xxx</router-link>
        Vue.component("router-link", {
            props: {to: String},
            render(h) {
                console.log(this)
                // h(tag, data, children)
                return h("a", { attrs: {href: "#" + this.to} }, [ this.$slots.default ])
            }
        })
        // <router-view></router-view>
        Vue.component("router-view", {
            // 注意这里要使用箭头函数否则会绑定到router-view组件，找不到app和routeMap
            render: (h) => {
                console.log(this.app)
                console.log(this.routeMap)
                return h(this.routeMap[this.app.current])
            }
        })
    }
}

// use时调用
VueRouter.install = function() {
    // mixin混入
    Vue.mixin({
        beforeCreate() {
            // this是Vue实例，$options是配置项
            // 仅在根组件执行一次
            if(this.$options.router) {
                Vue.prototype.$router = this.$options.router
                this.$options.router.init()
            }
        }
    })
}

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/about',
            component: About
        }
    ]
})
