import Vue from 'vue'
import App from './App.vue'

import router from './srouter'
import store from './sstore'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
