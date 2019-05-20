import Vue from 'vue';
import App from './App.vue';
import router from './routers';

//axios
/*import Axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, Axios);*/

//vue-resouce
/*import VueResource from 'vue-resource';

Vue.use(VueResource);*/



let vm=new Vue({
  el: '#div1',
  data: {},
  components: {App},
  router,
  template: `
    <App/>
  `
})
