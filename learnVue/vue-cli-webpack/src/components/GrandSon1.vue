<template>
    <div>
        <h5>组件通信--子级的子级1</h5>
        <button @click="$parent.$emit('update:value', 1000)">$parent:{{value}}</button>
        <!-- 触发所有父级的handle事件 -->
        <button @click="$dispatch('handle', 1000)">$dispatch:log1000</button>
    </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number
    }
  },
  methods: {
  }
}
</script>
