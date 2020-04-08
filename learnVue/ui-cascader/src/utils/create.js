// 在页面上创建一个实例
import Vue from 'vue';

export default function (component, props) {
  const vm = new Vue({
    render(h) {
      // h就是createElement，它返回VNode
      return h(component, { props });
    },
    // vm.$mount()之后才会有$el
  }).$mount();

  document.body.appendChild(vm.$el);
  console.log(vm.$el);
}
