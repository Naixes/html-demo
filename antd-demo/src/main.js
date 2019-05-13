import Vue from 'vue'
import App from './views/App.vue'

// 引入路由
import Router from 'vue-router'
Vue.use(Router)

import { Button, Layout, Menu, Icon, Table, Popconfirm, Divider, Pagination, LocaleProvider, Form, Input, Modal, Select, Checkbox } from 'ant-design-vue'

Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Table)
Vue.use(Popconfirm)
Vue.use(Divider)
Vue.use(Pagination)
Vue.use(LocaleProvider)
Vue.use(Form)
Vue.use(Input)
Vue.use(Modal)
Vue.use(Select)
Vue.use(Checkbox)

Vue.config.productionTip = false

import router from './router/index.js'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
