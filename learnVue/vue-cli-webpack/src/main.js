// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入vuex
import store from '@/store'

Vue.config.productionTip = false

// 在Vue原型上封装 $dispatch 方法只通知自己的父级们
// 在Vue原型上封装 $broadcast 方法只通知自己的子级们
Vue.prototype.$dispatch = (e) => {
  let vm = this.$parent
  while (vm) {
    this.$parent.$emit(e)
    vm = this.$parent.$parent
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
