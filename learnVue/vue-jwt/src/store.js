import Vue from 'vue';
import Vuex from 'vuex';

import { login, checkLogin, getNewRoutes } from './api/index';

// 加载所有路由
import { authRoutes } from './router';

Vue.use(Vuex);

// 将扁平化的数据渲染成树状
const getTreeList = (list) => {
  const menu = [];
  const map = {};
  const authors = [];
  list.forEach((item) => {
    authors.push(item.auth);
    // id: item
    map[item.id] = item;
    // eslint-disable-next-line
    item.children = [];
    // 根节点
    if (item.pid === -1) {
      menu.push(item);
    } else if (map[item.pid]) {
      map[item.pid].children.push(item);
    }
  });
  return { menu, authors };
};

// 过滤出通过校验的路由
// eslint-disable-next-line
const formatRoutes = (routes, auths) => {
  return routes.filter((route) => {
    if (auths.includes(route.name)) {
      if (route.children) {
        // eslint-disable-next-line
        route.children = formatRoutes(route.children, auths);
      }
      console.log('includes');
      return true;
    }
    return false;
  });
};

export default new Vuex.Store({
  state: {
    username: '',
    hasPermission: false,
    menuList: [],
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setMenuList(state, menu) {
      state.menuList = menu;
    },
    setPermission(state) {
      state.hasPermission = true;
    },
  },
  actions: {
    // 权限校验
    async getNewRoutes({ commit, dispatch }) {
      const { menuList } = await getNewRoutes();
      // 将扁平化的数据渲染成树状
      const { menu, authors } = getTreeList(menuList);
      commit('setMenuList', menu);

      // 从所有权限路由中过滤符合权限的路由
      const validRoutes = formatRoutes(authRoutes, authors);
      commit('setPermission');
      console.log('validRoutes', validRoutes);
      return validRoutes;
    },

    // 登录
    async login({ commit }, username) {
      const r = await login(username);
      if (r.code === 1) {
        Promise.reject(r);
      }
      localStorage.setItem('token', r.token);
      commit('setUsername', r.username);
      return r;
    },

    // 登录校验
    async checkLogin({ commit }) {
      const r = await checkLogin();
      if (r.code === 1) {
        return false;
      }
      // 重置token
      localStorage.setItem('token', r.token);
      commit('setUsername', r.username);
      return true;
    },
  },
});
