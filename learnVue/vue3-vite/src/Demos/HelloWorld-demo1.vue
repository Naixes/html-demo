<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="state.count++">count is: {{ state.count }}</button>
  <p class="text">
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup lang="ts">
import { defineProps, reactive } from 'vue'

const color = 'red'
const font = {
  size: '3em'
}

// 复杂类型的props类型需要使用到 Object as PropType<interface>，此时需要旧的setup写法，否则会报错
defineProps({
  msg: String
})

const state = reactive({ count: 0 })
</script>

<style>
/* css变量 */
/* scoped会不起作用，可以使用postcss */
:root {
  --varColor: yellowgreen;
  /* vite支持不好 */
  /* --initFn: () => {
    console.log('sin')
  } */
}
a {
  color: var(--varColor);
}
.text {
  color: v-bind(color);
  font-size: v-bind("font.size")
}
</style>
