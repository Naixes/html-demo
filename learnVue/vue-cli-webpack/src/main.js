// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入vuex
import store from '@/store'

Vue.config.productionTip = false

// $dispatch 方法：向上派发通知自己的父级们
Vue.prototype.$dispatch = function (fnName, params) {
  let parent = this.$parent
  while (parent) {
    parent.$emit(fnName, params)
    parent = parent.$parent
  }
}

// $broadcast 方法：向下广播通知自己的子级们
// 注意绑定this
Vue.prototype.$broadcast = function (fnName, params) {
  let broadcast = function () {
    this.$children.forEach(child => {
      child.$emit(fnName, params)
      if (child.$children) {
        broadcast.call(child)
      }
    })
  }
  broadcast.call(this)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
