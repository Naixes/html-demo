import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

// 引入公共样式和静态资源
import './assets/css/core.css';
import './assets/css/icon.css';
import './assets/css/home.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
