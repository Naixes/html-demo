import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Profile from './views/Profile.vue';

Vue.use(Router);

// 权限路由
export const authRoutes = [
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart'),
    children: [
      {
        path: 'cart-list',
        name: 'cart-list',
        component: () => import('@/views/CartList'),
        children: [
          {
            path: 'lottery',
            name: 'lottery',
            component: () => import('@/views/Lottery'),
          },
          {
            path: 'product',
            name: 'product',
            component: () => import('@/views/Product'),
          },
        ],
      },
    ],
  },
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { needLogin: true },
    },
  ],
});
