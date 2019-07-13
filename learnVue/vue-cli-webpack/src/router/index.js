import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Animate from '@/components/Animate'
import lifecircle from '@/components/lifecircle'
import lifeComp from '@/components/lifeComp'

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
    }
  ]
})
