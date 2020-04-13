<template>
    <div>
      <!-- 实现数据绑定 -->
      <!-- $attrs：包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。 -->
      <input :value="value" @input="onInput" type="text" v-bind="$attrs">
    </div>
</template>

<script>
export default {
  // 继承属性
  // 默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上（即这里的div）。通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。而通过实例属性 $attrs 可以让这些特性生效，且可以通过 v-bind 显性的绑定到非根元素上。
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
      // 通知父组件做校验
      this.$parent.$emit('validate');
    },
  },
};
</script>
