import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
