export const allow = {
  inserted(el, bindings, vnode) {
    const flag = vnode.context.$store.state.btnPermission[(bindings.value)];
    if (!flag) {
      el.parentNode.removeChild(el);
    }
  },
};

export default {};
