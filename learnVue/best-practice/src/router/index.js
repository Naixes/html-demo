import Vue from 'vue'
import VueRouter from 'vue-router'
// 布局页
import Layout from '@/layout'

Vue.use(VueRouter)

// 通用路由：无权限控制
export const constRoutes = [
  {
    path: '/login',
    component: () => import("@/views/Login.vue"),
    // 不显示在导航栏
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: {name: 'Home'},
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      }
    ]
  }
]

// 权限路由：动态添加
export const asyncRoutes = [
 {
   path: '/finance',
   component: Layout,
   redirect: {name: 'FinanceList'},
   children: [
     {
      path: 'list',
      name: 'FinanceList',
      component: () => import('@/views/finance/List.vue'),
      meta: {
        title: '财务列表',
        icon: 'close',
        roles: ['admin']
      }
     }
   ]
 }
]

const router = new VueRouter({
  mode: 'history',
  // 路由上下文
  base: process.env.BASE_URL,
  routes: constRoutes
})

export default router
