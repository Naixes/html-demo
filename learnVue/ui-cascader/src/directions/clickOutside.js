// 指令是方法有自己的生命周期
// bind, inserted, update, componentUpdated, unbind
export const clickOutside = {
  // 判断有没有点击到元素之外
  // 获取当前元素
  // 指令的参数：el，bindings（绑定的内容，包括修饰符），vnode
  inserted(el, bindings) {
    // 将函数保存到el方便解除绑定
    el.handler = function (e) {
      if (e.target === el || el.contains(e.target)) {
        return;
      }
      bindings.value();
    };
    document.addEventListener('click', el.handler);
  },
  unbind(el) {
    document.removeEventListener('click', el.handler);
  },
};

export default {};
