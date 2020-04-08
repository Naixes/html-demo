<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
  provide() {
    return {
      // 将实例提供给子组件
      form: this,
    };
  },
  props: {
    // 校验内容  表单项：值
    model: {
      type: Object,
      required: true,
    },
    // 校验规则  表单项：[规则]
    rules: {
      type: Object,
    },
  },
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
    validate(cb) {
      // 获取所有校验结果的promise
      const tasts = this.$children.filter(item => item.prop).map(item => item.validate());
      // 所有校验通过才算通过
      Promise.all(tasts).then(() => { cb(true); }).catch(() => { cb(false); });
    },
  },
};
</script>
