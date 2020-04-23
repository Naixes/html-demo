import router from "./router";
import store from "@/store";
import { Message } from 'element-ui'
import { getToken } from "@/utils/auth"

// 白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    const hasToken = getToken()

    // 是否有token
    if(hasToken) {
        // 有token去登录页：跳转到首页
        if(to.path === "/login") {
            next({path: "/"})
        } else {
            try {
                // roles是否存在，若存在即动态路由已添加
                const hasRoles = store.getters.roles && store.getters.roles.length > 0
                // roles存在：继续
                if(hasRoles) {
                    next()
                }else {
                    // 获取用户角色
                    const { roles } = await store.dispatch('user/getInfo')
                    // 获取路由
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
                    // 添加路由
                    router.addRoutes(accessRoutes)
                    next({...to, replace: true})
                }
            } catch(err) {
                // 重置token重新登陆
                await store.dispatch('user/resetToken')
                Message.error(err || 'Has Error')
                next(`/login?redirect=${to.path}`)
            }
        }
    }else {
        // 无token
        if(whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            // 重定向至首页
            next(`/login?redirect=${to.path}`)
        }
    }
})