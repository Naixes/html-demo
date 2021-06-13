使用 mixin 挂载 store，但是会执行很多遍

```js
Vue.mixin({
  beforeCreate() {
    if (this.$options.store) {
      Vue.prototype.$store = this.$options.store;
    }
  },
});
```
