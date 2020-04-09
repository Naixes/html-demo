// 在页面上创建一个实例
import Vue from 'vue';

export default function (component, props) {
  const vm = new Vue({
    render(h) {
      // h就是createElement，它返回VNode
      return h(component, { props });
    },
    // vm.$mount()之后才会有$el
  }).$mount(); // $mount里面会调render生成VNode，生成的VNode会执行update函数生成DOM

  // 手动挂载：生成DOM结构存储在vm.$el把它追加到body即可
  document.body.appendChild(vm.$el);
  console.log('vm.$el', vm.$el);
  console.log('vm.$children[0]', vm.$children[0]);

  // 从vm.$children中拿出comp
  const comp = vm.$children[0];

  // 销毁
  comp.remove = function remove() {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };

  return comp;
}
