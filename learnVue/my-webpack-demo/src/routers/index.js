import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/index.vue';
import News from '@/news.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/news',
      name: 'news',
      component: News
    }
  ]
})
