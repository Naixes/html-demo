import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/release',
      name: 'release',
      component: () => import(/* webpackChunkName: "about" */ '../views/release.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import(/* webpackChunkName: "about" */ '../views/reg.vue')
    },
    {
      path: '/xxx',
      name: 'xxx',
      component: Home
    }
  ]
})
