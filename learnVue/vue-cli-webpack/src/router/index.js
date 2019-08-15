import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import Animate from '@/pages/Animate'
import lifecircle from '@/pages/lifecircle'
import lifeComp from '@/pages/lifeComp'

import Comps from '@/pages/CompsCommunication'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/animate',
      name: 'Animate',
      component: Animate
    },
    {
      path: '/lifecircle',
      name: 'lifecircle',
      component: {render: h => h('router-view')},
      children: [
        {
          path: '',
          name: 'lifecircle',
          component: lifecircle
        },
        {
          path: 'comp',
          name: 'lifeComp',
          component: lifeComp
        }
      ]
    },
    {
      path: '/comps',
      name: 'Comps',
      component: Comps
    }
  ]
})
