// import {getToken, setToken, removeToken} from '@/utils/auth'
import {getToken, setToken, removeToken} from '@/utils/auth'

export default {
    namespaced: true,
    state: {
        token: getToken(),
        roles: [],
        // 其他用户信息
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },
    actions: {
        // 登录，保存用户信息
        login({commit}, userInfo) {
            const {username} = userInfo
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if(username === 'admin' || username === 'editor') {
                        // 存储token到state
                        commit("SET_TOKEN", username)
                        // 同步cookie的token
                        setToken(username);
                        resolve()
                    }else {
                        reject("用户名或密码错误")
                    }
                }, 1000)
            })
        },
        // 获取保存用户角色
        getInfo({commit, state}) {
            return new Promise(resolve=> {
                setTimeout(() => {
                    const roles = state.token === 'admin' ? ['admin'] : ['editor']
                    commit("SET_ROLES", roles)
                    resolve({roles})
                }, 1000)
            })
        },
        // 重置token
        resetToken({commit}) {
            return new Promise(resolve => {
                commit("SET_TOKEN", "")
                commit("SET_ROLES", [])
                removeToken()
                resolve()
            })
        }
    },
}