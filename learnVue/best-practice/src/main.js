import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vPermission from "@/directives/permission";

// 引入icons
import './icons'
// 引入element插件
import './plugins/element.js'
// 路由守卫
import "./permission.js";

Vue.directive("permission", vPermission);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
