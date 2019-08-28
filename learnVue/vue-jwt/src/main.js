import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false;

// 校验登录
router.beforeEach(async (to, from, next) => {
  const valid = await store.dispatch('checkLogin');
  console.log(valid);
  if (valid) {
    if (to.name === 'login') {
      console.log('您已登录');
      // 可以传递路由地址，改变跳转地址
      next('/');
    } else {
      next();
    }
  } else if (to.meta.needLogin) {
    console.log('请登录');
    next('/login');
  } else {
    console.log('欢迎');
    next();
  }
});

// 校验权限
router.beforeEach(async (to, from, next) => {
  console.log(to);
  // 如果没有校验
  if (!store.state.hasPermission) {
    // 获取路由
    const newRoutes = await store.dispatch('getNewRoutes');
    // 动态添加路由
    router.addRoutes(newRoutes);
    // 有可能不会马上添加上，所以覆盖路由避免产生过多的历史记录
    next({ ...to, replace: true });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
