import { constRoutes, asyncRoutes } from "@/router"

export default {
    namespaced: true,
    state: {
        // 可访问的完整路由
        routes: [],
        // 可访问的权限路由
        addRoutes: []
    },
    mutations: {
        SET_ROUTES: (state, routes) => {
            state.addRoutes = routes
            state.routes = constRoutes.concat(routes)
        }
    },
    actions: {
        generateRoutes({commit}, roles) {
            return new Promise(resolve => {
                let accessRoutes
                if (roles.includes('admin')) {
                    accessRoutes = asyncRoutes || []
                }else {
                    accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
                }
                commit("SET_ROUTES", accessRoutes)
                resolve(accessRoutes)
            })
        }
    }
}

function hasPermission(roles, route) {
    if(route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    }else {
        // 没有roles无需判定
        return true
    }
}

export function filterAsyncRoutes(routes, roles) {
    const res = []
    routes.forEach(route => {
        const tmp = {...route}
        if(hasPermission(roles, tmp)) {
            if(tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    });
    return res
}